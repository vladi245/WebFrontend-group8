import Navbar from '../../components/Navbar/Navbar'
import styles from './AboutUs.module.css'

export default function AboutUs() {
    return (
        <div className={styles['about-us-container']}>
            <Navbar/>
            <div className={styles['about-us-page']}>
                <h1 className={styles['about-title']}>About Us</h1>
                <div className={styles['about-body']}>
                    <p> As a group of Software engineering students we realised an issue with how much of our day we spend sitting. This is not good for our health, and we wanted to figure out a way to fix this.</p> 
                    <p> That's how the idea of Get Standing came to us. Its the perfect way to look out for our own wellbeing. We made a way that tracking your calorie intake, workouts and the amount of time you spend sitting more fun.</p> 
                    <p> It is also much easier for the user to track, with our visualisers in place. We also think that a little bit of competition between friends is always good, so make sure you invite your friends to see how they are doing. </p> 
                    <p> Being part of our movement also puts the user on a leaderboard where placing higher up will get you coins that you can later exchange into different rewards.</p> 
                </div>
            </div> 
        </div>
    );
}