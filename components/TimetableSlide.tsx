import React, { useState, useEffect } from 'react';
import styles from '../styles/TimetableSlide.module.css';

// 右側で切り替える画像のパス
const rightImages = [
    '/img/timetable-ja.jpg',
    '/img/timetable-en.jpg',
];

const TimetableSlide: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // 7秒ごとに画像を切り替えるタイマー
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % rightImages.length);
        }, 7000);

        return () => clearInterval(timer); // コンポーネントのクリーンアップ
    }, []);

    return (
        <div className={styles.slideContainer}>
            <div className={styles.mainContentArea}>
                {/* 左側パネル */}
                <div className={styles.leftPanel}>
                    <img src="/img/job-fair_details.jpg" alt="Job Fair Details" className={styles.image} />
                </div>

                {/* 右側パネル */}
                <div className={styles.rightPanel}>
                    <img src={rightImages[currentImageIndex]} alt="Timetable" className={styles.image} />
                </div>
            </div>
        </div>
    );
};

export default TimetableSlide;
