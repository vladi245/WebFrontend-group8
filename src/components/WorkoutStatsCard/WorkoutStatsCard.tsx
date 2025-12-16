import styles from './WorkoutStatsCard.module.css';
import { Dumbbell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WorkoutCardProps {
  calories: number;
}

const WorkoutStatsCard = ({ calories }: WorkoutCardProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Dumbbell className={styles.icon} />
        <span className={styles.title}>{t('navbar.workout')}</span>
      </div>
      <div className={styles.amount}>
        {calories.toLocaleString('en-FR', { maximumFractionDigits: 0 })}<span className={styles.unit}>kcal</span>
      </div>
      <div className={styles.status}>{t('workoutstatscard.burned')}</div>
    </div>
  );
};

export default WorkoutStatsCard;
