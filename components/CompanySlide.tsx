import React from 'react';
import Image from 'next/image';
import styles from '../styles/CompanySlide.module.css';

interface CompanySlideProps {
    src: string; // 表示する企業PR画像のパス
    slideNumber: number; // 現在のスライド番号
    totalSlides: number; // 全体のスライド数
}

const CompanySlide: React.FC<CompanySlideProps> = ({ src, slideNumber, totalSlides }) => {
    return (
        <div style={{ position: 'relative', width: 1920, height: '100%', margin: '0 auto' }}>
            <div className={styles.companyImg}>
                {/* 画像をcompanyImgの枠内に表示 */}
                <img
                    src={src}
                    alt="Company Presentation Slide"
                    // imgタグは親要素のcompanyImgに対して100%のサイズを使う
                    style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%'
                    }}
                />
            </div>
            {/* スライド番号を表示する要素 */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '24px',
                fontWeight: 'bold',
            }}>
                {slideNumber} / {totalSlides}
            </div>
        </div>
    );
};

export default CompanySlide;