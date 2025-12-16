import { useState } from "react";
import Navbar from '../../components/Navbar/Navbar'
import styles from './AboutUs.module.css'
import aboutImage from '../../assets/about-team.jpg'
import { apiFetch } from '../../services/api';
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            const res = await apiFetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to send");

            setStatus("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            setStatus("Error sending message. Try again later.");
        }
    };

    return (
        <div className={styles['about-us-container']}>
            <Navbar />
            <div className={styles['about-us-page']}>
                <div className={styles['content-wrapper']}>
                    <div className={styles['text-content']}>
                        <h1 className={styles['about-title']}>{t('about.title')}</h1>
                        <div className={styles['about-body']}>
                            <p> {t('about.paragraphs.0')}</p>
                            <p> {t('about.paragraphs.1')}</p>
                            <p> {t('about.paragraphs.2')} </p>
                            <p> {t('about.paragraphs.3')}</p>
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


                <form className={styles['contact-form']} onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder={t('contact.yourName')}
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder={t('contact.yourEmail')}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder={t('contact.yourMessage')}
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                    ></textarea>

                    <button type="submit" className={styles['submit-btn']}>
                        {t('contact.sendMessage')}
                    </button>

                    {status && <p className={styles['status-message']}>{status}</p>}
                </form>
            </div>
        </div>

    );
}