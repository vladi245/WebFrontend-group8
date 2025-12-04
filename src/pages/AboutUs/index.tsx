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
                        <h1 className={styles['about-title']}>About Us</h1>
                        <div className={styles['about-body']}>
                            <p> As a group of Software engineering students we realised an issue with how much of our day we spend sitting. This is not good for our health, and we wanted to figure out a way to fix this.</p>
                            <p> That's how the idea of Get Standing came to us. Its the perfect way to look out for our own wellbeing. We made a way that tracking your calorie intake, workouts and the amount of time you spend sitting more fun.</p>
                            <p> It is also much easier for the user to track, with our visualisers in place. We also think that a little bit of competition between friends is always good, so make sure you invite your friends to see how they are doing. </p>
                            <p> Being part of our movement also puts the user on a leaderboard where placing higher up will get you coins that you can later exchange into different rewards.</p>
                        </div>
                    </div>
                    <div className={styles['image-content']}>
                        <img src={aboutImage} alt="Get Standing Team" className={styles['about-image']} />
                    </div>
                </div>
            </div>

            <div className={styles['contact-section']}>
                <h2 className={styles['contact-title']}>
                    Get In <span className={styles['highlight']}>Touch</span>
                </h2>
                <p className={styles['contact-description']}>
                    Have questions or want to learn more about Get Standing? We'd love to hear from you!
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