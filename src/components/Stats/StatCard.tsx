import style from './Stats.module.css';

interface StatCardProps {
    icon: React.ReactNode;
    value: number | string;
    label: string;
    colorClass: 'workoutsCard' | 'caloriesCard' | 'daysActiveCard' | 'mealsCard' | 'foodcaloriesCard' | 'averageintakeCard';
}

const StatCard = ({ icon, value, label, colorClass }: StatCardProps) => {
    return (
        <div className={`${style.statCard} ${style[colorClass]}`}>
            <div className={style.statContent}>
                <div className={style.statInfo}>
                    <p className={style.statLabel}>{label}</p>
                    <p className={style.statValue}>{value}</p>
                </div>
                <div className={style.statIcon}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
