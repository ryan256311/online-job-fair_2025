import React, { useState, useEffect } from 'react';
import { getImageUrl } from './ImageUtils';
import styles from '../styles/WaitingSlide.module.css';

// イベント開始時刻を設定（仕様書に基づき 11月8日 13:00）
const EVENT_START_TIME = new Date('2025-11-11T16:02:21');

// 左側の静的画像ファイルのパス（仮）
// ユーザーから提供される静止画のファイルパスに置き換えてください。
const STATIC_LEFT_IMAGE_PATH = '/img/job-fair_details.jpg';

// 多言語コンテンツ
const messages = {
    ja: {
        waitMessage: '開始までもうしばらくお待ちください。',
        startTime: '本イベントは13:00に開始いたします。',
        studentNote_wait: '現在「待機室」にてお待ちいただいております。',
        studentNote_enter: '13:00になりましたら自動的にメインセッションに入室いただけます。',
        countdownLabel: '開始まで',
        startingSoon: '間もなく開始いたします。',
    },
    en: {
        waitMessage: 'Please wait for the event to start.',
        startTime: 'This event will start at 13:00 JST.',
        studentNote_wait: 'You are currently in the "Waiting Room".',
        studentNote_enter: 'You will be automatically admitted to the main session at 13:00.',
        countdownLabel: 'Countdown',
        startingSoon: 'Starting soon.',
    },
};

const WaitingSlide: React.FC = () => {
    const [currentLang, setCurrentLang] = useState<'ja' | 'en'>('ja');
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [isEventStarted, setIsEventStarted] = useState(false);

    // 1. 多言語切り替えロジック (7秒ごと)
    useEffect(() => {
        const langTimer = setInterval(() => {
            setCurrentLang((prevLang) => (prevLang === 'ja' ? 'en' : 'ja'));
        }, 7000); // 7秒ごとに切り替え

        return () => clearInterval(langTimer);
    }, []);

    // 2. カウントダウンタイマーロジック (1秒ごと)
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = EVENT_START_TIME.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    hours: Math.floor(difference / (1000 * 60 * 60)),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
                setIsEventStarted(false);
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                setIsEventStarted(true);
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // 初回実行

        return () => clearInterval(timer);
    }, []);

    const currentMessages = messages[currentLang];

    return (
        <div className={styles.slideContainer}>

            {/* 画面全体を左右に分割するコンテナ */}
            <div className={styles.mainContentArea}>

                {/* -------------------- 画面左側: 静的画像エリア -------------------- */}
                <div className={styles.leftPanel}>
                    {/* 左側デザイン全体を集約した画像を配置 */}
                    <img
                        src={STATIC_LEFT_IMAGE_PATH}
                        alt="Event Title and Static Information"
                        className={styles.staticImage}
                    />
                </div>

                {/* -------------------- 画面右側: テキスト・情報エリア (多言語/動的要素) -------------------- */}
                <div className={styles.rightPanel}>

                    {/* --- 多言語切り替えエリア --- */}
                    <h2 className={styles.startTime}>{currentMessages.startTime}</h2>
                    <p className={styles.waitMessage}>{currentMessages.waitMessage}</p>

                    {/* --- カウントダウン表示エリア --- */}
                    <div className={`${styles.countdown} ${isEventStarted ? styles.countdownFinished : ''}`}>
                        {!isEventStarted ? (
                            <>
                                <h3 className={styles.countdownLabel}>{currentMessages.countdownLabel}</h3>
                                <span className={styles.countdownTime}>
                                    {String(timeLeft.hours).padStart(2, '0')}:
                                    {String(timeLeft.minutes).padStart(2, '0')}:
                                    {String(timeLeft.seconds).padStart(2, '0')}
                                </span>
                            </>
                        ) : (
                            // 13:00以降のメッセージ
                            <h2 className={styles.startingSoon}>
                                {currentMessages.startingSoon}
                            </h2>
                        )}
                    </div>

                    {/* --- 学生向け案内 (多言語切り替え) --- */}
                    <p className={styles.studentNote}>{currentMessages.studentNote_wait}<br />{currentMessages.studentNote_enter}</p>


                    {/* --- 静的表示エリア (日本語のみ & QRコード) --- */}
                    <div className={styles.staticInfo}>
                        <p className={styles.companyNote}>
                            企業のご担当者様は優先的に入室許可を行っております。<br/>Zoomアカウント名の命名ルールをご確認の上、ブレイクアウトルームへご入室ください。
                        </p>

                        {/* QRコードはここに配置します (URLは仮置き) */}
                        <div className={styles.qrCodeSection}>
                            <p>【タイムテーブル・操作説明 (PDF)】</p>
                            <div className={styles.qrCodePlaceholder}>
                                {<img src={getImageUrl("/img/qr-instruction.png")} alt="QR Code" />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaitingSlide;