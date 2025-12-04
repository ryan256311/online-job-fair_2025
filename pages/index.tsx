import React, { useState, useEffect, useCallback } from 'react';
import WaitingSlide from '../components/WaitingSlide';
import CompanySlide from '../components/CompanySlide';
import ImageSlide from '../components/ImageSlide';
import TimetableSlide from '../components/TimetableSlide';

import ClosingSlide from '../components/ClosingSlide';

// --- (A) これから作成する「空の」コンポーネント（エラー防止用） ---
const placeholderStyle: React.CSSProperties = {
    width: 1920, height: 1080, display: 'flex',
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#f0f0f0', border: '10px solid #ccc',
    fontSize: '40px', boxSizing: 'border-box'
};
// --- (A) ここまで ---


// --- (1) 企業PR画像パスの定義（ここをご提供データに合わせて修正してください） ---
const companyImagePaths = [
    '/img/company_pr/company-01.png',
    '/img/company_pr/company-02.png',
    '/img/company_pr/company-03.png',
    '/img/company_pr/company-04.png',
    '/img/company_pr/company-05.png',
    '/img/company_pr/company-06.png',
    '/img/company_pr/company-07.png',
    '/img/company_pr/company-08.png',
    '/img/company_pr/company-09.png',
    '/img/company_pr/company-10.png',
    '/img/company_pr/company-11.png',
    '/img/company_pr/company-13.png',
    '/img/company_pr/company-14.png',
    '/img/company_pr/company-15.png',
    '/img/company_pr/company-16.png',
    '/img/company_pr/company-17.png',
    '/img/company_pr/company-18.png',
    '/img/company_pr/company-19.png',
    '/img/company_pr/company-20.png',
    '/img/company_pr/company-21.png',
    '/img/company_pr/company-22.png',
    '/img/company_pr/company-23.png',
];
// --------------------------------------------------------------------------

// --- (2) 全スライドの定義 ---
const slides = [
    // ① 待機画面
    { type: 'waiting' },

    // ★ 新しく挿入
    { type: 'timetable', duration: 14000 }, 

    // ② 企業PRスライド (画像パスから動的生成)
    ...companyImagePaths.map(path => ({
        type: 'company',
        src: path
    })),

    // ③ & ④ ループ再生エリア
    { type: 'timetable', loop: 'start', duration: 14000 }, // 14秒表示
    { type: 'image', src: '/img/instructions-ja.jpg', loop: true, duration: 7000 }, // 7秒表示
    { type: 'image', src: '/img/instructions-en.jpg', loop: 'end', duration: 7000 }, // 7秒表示でループの始点へ

    // ⑤ 終了案内
    { type: 'closing' },
];

// --- メインコンポーネント ---
const SlideShow: React.FC = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const currentSlide = slides[currentSlideIndex];

    // --- (3) スライド遷移ロジック ---
    const nextSlide = useCallback(() => {
        const current = slides[currentSlideIndex];
        // ループの最後のスライドなら、ループの最初のスライドに戻る
        if ('loop' in current && current.loop === 'end') {
            const loopStartIndex = slides.findIndex(s => 'loop' in s && s.loop === 'start');
            setCurrentSlideIndex(loopStartIndex >= 0 ? loopStartIndex : 0);
        } else {
            setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
        }
    }, [currentSlideIndex]);

    const prevSlide = useCallback(() => {
        setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    // --- (4) 手動遷移（キーボード・マウス） ---
    useEffect(() => {
        const handleTransition = (e: MouseEvent | KeyboardEvent) => {
            const current = slides[currentSlideIndex];
            const isRightClick = 'clientX' in e && e.clientX > window.innerWidth / 2;
            const isRightArrow = 'key' in e && e.key === 'ArrowRight';

            if (isRightClick || isRightArrow) {
                // ループ中に右クリック/右矢印が押されたら、終了スライドにジャンプ
                if ('loop' in current && current.loop) {
                    const closingIndex = slides.findIndex(s => s.type === 'closing');
                    setCurrentSlideIndex(closingIndex >= 0 ? closingIndex : slides.length - 1);
                } else {
                    nextSlide();
                }
            } else {
                // 左クリック/左矢印
                prevSlide();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => handleTransition(e);
        const handleClick = (e: MouseEvent) => handleTransition(e);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleClick);
        };
    }, [currentSlideIndex, nextSlide, prevSlide]);


    // --- (5) 自動遷移 --- 
    useEffect(() => {
        const current = slides[currentSlideIndex];
        const shouldAutoSwitch = 'loop' in current && current.loop;

        if (shouldAutoSwitch) {
            const duration = ('duration' in current && current.duration) || 7000;
            const timer = setInterval(nextSlide, duration);
            return () => clearInterval(timer);
        }
    }, [currentSlideIndex, currentSlide, nextSlide]);


    // --- (6) 表示するスライドの切り替え ---
    const renderSlide = () => {
        switch (currentSlide.type) {
            case 'waiting':
                return <WaitingSlide />;
            case 'company': {
                // 企業PRスライドの開始インデックスを取得
                const companySlideStartIndex = slides.findIndex(s => s.type === 'company');
                // 企業PRスライド内での現在の番号を計算 (1始まり)
                const slideNumberInCompanySession = currentSlideIndex - companySlideStartIndex + 1;
                
                return <CompanySlide 
                            src={(currentSlide as { src: string }).src} 
                            slideNumber={slideNumberInCompanySession} 
                            totalSlides={companyImagePaths.length} 
                        />;
            }
            case 'timetable':
                return <TimetableSlide />;
            case 'image':
                // @ts-ignore
                return <ImageSlide src={currentSlide.src} />;
            case 'closing':
                return <ClosingSlide />;
            default:
                return <div>Error: Unknown slide type</div>;
        }
    };

    return (
        <main>
            {/* 画面全体をクリック領域にするため */}
            <div style={{ width: '100vw', height: '100vh', cursor: 'pointer' }}>
                {renderSlide()}
            </div>
        </main>
    );
};

export default SlideShow;