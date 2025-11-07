import React from 'react';
import styles from '../styles/ImageSlide.module.css';

interface ImageSlideProps {
    src: string; // 表示する画像のパス
}

const ImageSlide: React.FC<ImageSlideProps> = ({ src }) => {
    return (
        <div className={styles.slideContainer}>
            <div className={styles.slideImg}>
                <img
                    src={src}
                    alt="Informational Slide"
                    className={styles.image}
                />
            </div>
        </div>
    );
};

export default ImageSlide;