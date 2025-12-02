import Navbar from '../../components/Navbar/Navbar'
import styles from './AboutUs.module.css'
import aboutImage from '../../assets/about-team.jpg'
import { useTranslation } from 'react-i18next'

export default function AboutUs() {
    const { t } = useTranslation();
    return (
        <div className={styles['about-us-container']}>
            <Navbar />
            <div className={styles['about-us-page']}>
                <div className={styles['content-wrapper']}>
                    <div className={styles['text-content']}>
                        <h1 className={styles['about-title']}>{t('about.title')}</h1>
                        <div className={styles['about-body']}>
                            {((t('about.paragraphs', { returnObjects: true }) as string[]) || []).map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </div>
                    </div>
                    <div className={styles['image-content']}>
                        <img src={aboutImage} alt="Get Standing Team" className={styles['about-image']} />
                    </div>
                </div>
            </div>

            <div className={styles['contact-section']}>
                <h2 className={styles['contact-title']}>
                    {t('contact.title1')} <span className={styles['highlight']}>{t('contact.title2')}</span>
                </h2>
                <p className={styles['contact-description']}>
                    {t('contact.description')}
                </p>
                <div className={styles['contact-info']}>
                    <div className={styles['contact-item']}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={styles['contact-icon']}>
                            <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z" />
                        </svg>
                        <a href={`mailto:${t('contact.email')}`} className={styles['contact-link']}>
                            {t('contact.email')}
                        </a>
                    </div>
                    <div className={styles['contact-item']}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={styles['contact-icon']}>
                            <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5" />
                        </svg>
                        <span className={styles['contact-text']}>
                            {t('contact.location')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}