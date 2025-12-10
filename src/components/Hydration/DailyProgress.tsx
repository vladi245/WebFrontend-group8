import styles from './DailyProgress.module.css';
import { useTranslation } from 'react-i18next';

interface DailyProgressProps {
  current: number;
  goal: number;
}

const DailyProgress = ({ current, goal }: DailyProgressProps) => {
  const { t } = useTranslation();
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t('hydrationDailyProgress.dailyProgress')}</h3>
        <span className={styles.progress}>{current}ml / {goal}ml</span>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className={styles.percentage}>
        {Math.round(percentage)}% {t('hydrationDailyProgress.complete')}
      </div>
    </div>
  );
};

export default DailyProgress;
