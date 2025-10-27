import style from './Stats.module.css'

const Stats = () => {
    return (
        <div className={style.statsContainer}>
            <div className={`${style.statCard} ${style.workoutsCard}`}>
                <div className={style.statContent}>
                    <div className={style.statInfo}>
                        <p className={style.statLabel}>Total Workouts</p>
                        <p className={`${style.statValue} ${style.workoutsValue}`}>15</p>
                    </div>
                    <div className={`${style.statIcon} ${style.workoutsIcon}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M16 6l2.29 2.29l-4.88 4.88l-4-4L2 16.59L3.41 18l6-6l4 4l6.3-6.29L22 12V6z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className={`${style.statCard} ${style.caloriesCard}`}>
                <div className={style.statContent}>
                    <div className={style.statInfo}>
                        <p className={style.statLabel}>Calories Burned</p>
                        <p className={`${style.statValue} ${style.caloriesValue}`}>3,520</p>
                    </div>
                    <div className={`${style.statIcon} ${style.caloriesIcon}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M13 6v5h5v2h-5v5h-2v-5H6v-2h5V6z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className={`${style.statCard} ${style.daysActiveCard}`}>
                <div className={style.statContent}>
                    <div className={style.statInfo}>
                        <p className={style.statLabel}>This Week</p>
                        <p className={`${style.statValue} ${style.daysActiveValue}`}>7 days active</p>
                    </div>
                    <div className={`${style.statIcon} ${style.daysActiveIcon}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;