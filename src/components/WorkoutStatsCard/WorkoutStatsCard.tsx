import styles from './WorkoutStatsCard.module.css';
import { Dumbbell } from 'lucide-react';

interface WorkoutCardProps {
  calories: number;
}

const WorkoutStatsCard = ({ calories }: WorkoutCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Dumbbell className={styles.icon} />
        <span className={styles.title}>Workout</span>
      </div>
      <div className={styles.amount}>
        {calories.toLocaleString('en-FR', { maximumFractionDigits: 0 })}<span className={styles.unit}>kcal</span>
      </div>
      <div className={styles.status}>burned</div>
    </div>
  );
};

export default WorkoutStatsCard;
