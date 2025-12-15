import { useTranslation } from 'react-i18next';
import StatCard from './StatCard';
import style from './Stats.module.css';


interface StatsData {
    totalWorkouts: number;
    caloriesBurned: number;
    daysActive: string;
}

interface StatsProps {
    data: StatsData;
}

const Stats = ({ data }: StatsProps) => {
    const { t } = useTranslation();
    const workoutIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
            <path fill="currentColor" d="M16 6l2.29 2.29l-4.88 4.88l-4-4L2 16.59L3.41 18l6-6l4 4l6.3-6.29L22 12V6z" />
        </svg>
    );

    const caloriesIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
        </svg>
    );

    const daysActiveIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
        </svg>
    );

    return (
        <div className={style.statsContainer}>
            <StatCard
                icon={workoutIcon}
                value={data.totalWorkouts}
                label={t('workoutStats.totalWorkouts')}
                colorClass="workoutsCard"
            />
            <StatCard
                icon={caloriesIcon}
                value={data.caloriesBurned.toLocaleString()}
                label={t('workoutStats.totalCalories')}
                colorClass="caloriesCard"
            />
            <StatCard
                icon={daysActiveIcon}
                value={data.daysActive}
                label={t('workoutStats.thisWeek')}
                colorClass="daysActiveCard"
            />
        </div>
    );
};

export default Stats;