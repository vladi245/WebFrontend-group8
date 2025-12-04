import { useState } from "react";
import Navbar from '../../components/Navbar/Navbar'
import styles from './AboutUs.module.css'
import aboutImage from '../../assets/about-team.jpg'
import { apiFetch } from '../../services/api';

export default function AboutUs() {

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


                <form className={styles['contact-form']} onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                    ></textarea>

                    <button type="submit" className={styles['submit-btn']}>
                        Send Message
                    </button>

                    {status && <p className={styles['status-message']}>{status}</p>}
                </form>
            </div>
        </div>

    );
}