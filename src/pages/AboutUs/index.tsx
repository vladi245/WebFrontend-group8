import Navbar from '../../components/Navbar/Navbar'
import styles from './AboutUs.module.css'
import aboutImage from '../../assets/about-team.jpg'

export default function AboutUs() {
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
                <div className={styles['contact-info']}>
                    <div className={styles['contact-item']}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={styles['contact-icon']}>
                            <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z" />
                        </svg>
                        <a href="mailto:contact@getstanding.com" className={styles['contact-link']}>
                            vibar24@student.sdu.dk
                        </a>
                    </div>
                    <div className={styles['contact-item']}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={styles['contact-icon']}>
                            <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5" />
                        </svg>
                        <span className={styles['contact-text']}>
                            SDU Sønderborg
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}