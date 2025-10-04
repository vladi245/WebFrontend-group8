import style from './MainPanel.module.css';

const MainPanel = () => {
    return (
        <div className={style.mainpanel}>
            <div className={style.content}>
                <h1 className={style.title}>
                    Are You Ready To <span className={style.highlight}> <br />Get Standing?</span>
                </h1>

                <p className={style.description}>
                    Join The GetStanding Community And Take Charge Of Your Health. With Guided
                    Movement Breaks, Smart Reminders, And Science-Backed Tips, We Make It Easier Than
                    Ever To Sit Less And Live More. Ready To Stand Up For Your Wellbeing?
                </p>

                <div className={style.buttonContainer}>
                    <button className={style.primaryButton}>
                        Start Your Journey
                    </button>
                    <button className={style.secondaryButton}>
                        Explore Programs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainPanel;
