import { useTranslation } from 'react-i18next';
import StatCard from './StatCard';
import style from './Stats.module.css';
import { ClipboardList, Hamburger, ChartGantt } from 'lucide-react';

interface FoodStatsData {
    totalMeals: number;
    caloriesEaten: number;
    averageIntake: number;
}

interface FoodStatsProps {
    data: FoodStatsData;
}

const FoodStats = ({ data }: FoodStatsProps) => {
    const { t } = useTranslation();
    const mealsIcon = <ClipboardList size={40} color="currentColor" />;

    const foodcaloriesIcon = <Hamburger size={40} color="currentColor" />;

    const avgIcon = <ChartGantt size={40} color="currentColor" />;

    return (
        <div className={style.statsContainer}>
            <StatCard
                icon={mealsIcon}
                value={data.totalMeals}
                label={t('foodStats.mealslogged')}
                colorClass="mealsCard"
            />
            <StatCard
                icon={foodcaloriesIcon}
                value={data.caloriesEaten.toLocaleString()}
                label={t('foodStats.caloriesConsumed')}
                colorClass="foodcaloriesCard"
            />
            <StatCard
                icon={avgIcon}
                value={data.averageIntake}
                label={t('foodStats.avgIntake')}
                colorClass="averageintakeCard"
            />
        </div>
    );
};

export default FoodStats;