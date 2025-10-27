import style from './Performance.module.css'

const Performance = () => {
    return (
        <div className={style.performanceContainer}>
            <div className={style.header}>
                <h2 className={style.title}>Performance Overview</h2>
                <p className={style.subtitle}>Track your workouts and calories burned</p>
            </div>
            <div className={style.graphPlaceholder}>
                {/* graph will be added here w plotly or smth */}
            </div>
            <div className={style.legend}>
                <div className={style.legendItem}>
                    <div className={style.legendDot}></div>
                    <span className={style.legendText}>Calories Burned</span>
                </div>
            </div>
        </div>
    );
};

export default Performance;