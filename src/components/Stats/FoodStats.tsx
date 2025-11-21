import StatCard from './StatCard';
import style from './Stats.module.css';
import { ClipboardList , Hamburger , ChartGantt } from 'lucide-react';

interface FoodStatsData {
    totalMeals: number;
    caloriesEaten: number;
    averageIntake: number;
}

interface FoodStatsProps {
    data: FoodStatsData;
}

const FoodStats = ({ data }: FoodStatsProps) => {
    const mealsIcon = <ClipboardList size={40} color="currentColor" />;

    const foodcaloriesIcon = <Hamburger size={40} color="currentColor" />;

    const avgIcon = <ChartGantt size={40} color="currentColor" />;
    
    return (
        <div className={style.statsContainer}>
            <StatCard
                icon={mealsIcon}
                value={data.totalMeals}
                label="Meals Logged"
                colorClass="mealsCard"
            />
            <StatCard
                icon={foodcaloriesIcon}
                value={data.caloriesEaten.toLocaleString()}
                label="Calories Consumed"
                colorClass="foodcaloriesCard"
            />
            <StatCard
                icon={avgIcon}
                value={data.averageIntake}
                label="This Week’s Average Intake"
                colorClass="averageintakeCard"
            />
        </div>
    );
};

export default FoodStats;