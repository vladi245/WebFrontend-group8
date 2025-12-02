import styles from './DailyProgress.module.css';

interface DailyProgressProps {
  current: number; // in ml
  goal: number; // in ml
}

const DailyProgress = ({ current, goal }: DailyProgressProps) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Daily Progress</h3>
        <span className={styles.progress}>{current}ml / {goal}ml</span>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className={styles.percentage}>
        {Math.round(percentage)}% Complete
      </div>
    </div>
  );
};

export default DailyProgress;
