import React from 'react';
import styles from '../styles/ClosingSlide.module.css';

const slideContent = {
    title_01: '本日の企業説明セッションは',
    title_02: 'すべて終了いたしました。',
    appreciate: 'ご参加いただき、誠にありがとうございました。',
    body_01: 'もう一度話を聞きたい企業ブースがあれば、',
    body_02: '遠慮なくご自由に入室して追加の質問をしてください。',
    survey_title_ja: 'アンケートにご協力ください',
    survey_title_en: 'Please complete the survey',
    survey_body: '今後のイベント改善のため、皆様のご意見をお聞かせください。'
};

const ClosingSlide: React.FC = () => {
    return (
        <div className={styles.slideContainer}>
            <div className={styles.mainContent}>
                <h1 className={styles.title}>{slideContent.title_01}<br />{slideContent.title_02}</h1>
                <p className={styles.appreciate}>{slideContent.appreciate}</p>
                <p className={styles.bodyText}>{slideContent.body_01}<br />{slideContent.body_02}</p>
            </div>

            <div className={styles.qrCodeSection}>
                <p className={styles.surveyTitle}>{slideContent.survey_title_ja}</p>
                <p className={styles.surveyTitleEn}>{slideContent.survey_title_en}</p>
                <div className={styles.qrCodePlaceholder}>
                    <img src="/img/qr-finish.png" alt="Survey QR Code" style={{ width: '100%', height: '100%' }} />
                </div>
                <p className={styles.surveyBody}>{slideContent.survey_body}</p>
            </div>
        </div>
    );
};

export default ClosingSlide;
