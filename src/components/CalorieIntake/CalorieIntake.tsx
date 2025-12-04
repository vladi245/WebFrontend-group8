import styles from './CalorieIntake.module.css';
import { Zap, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CalorieCardProps {
  current: number;
  goal: number;
}

const CalorieIntake = ({ current, goal }: CalorieCardProps) => {
  const { t } = useTranslation();
  const percentage = Math.min(Math.round((current / goal) * 100), 100);
  const userJson = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  let user: any = null;
  try { user = userJson ? JSON.parse(userJson) : null; } catch (e) { user = null; }
  const isStandard = !user || user.type === 'standard';

  return (
    <div className={styles.card}>
      <div className={`${styles.cardInner} ${isStandard ? styles.blurred : ''}`}>
        <div className={styles.header}>
          <Zap className={styles.icon} />
          <span className={styles.title}>{t('calorieIntake')}</span>
        </div>

        <div className={styles.content}>
          <div className={styles.percent}>{percentage}%</div>

          <div className={styles.progressContainer}>
            <svg className={styles.progressRing} viewBox="0 0 36 36">
              <path
                className={styles.bgPath}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={styles.progressPath}
                strokeDasharray={`${percentage}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className={styles.calories}>
              <div className={styles.current}>{current}</div>
              <div className={styles.goal}>/{goal}</div>
            </div>
          </div>
        </div>
      </div>
      {isStandard && (
        <div className={styles.lockOverlay} role="presentation">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Lock className={styles.lockIcon} />
            <div className={styles.lockCaption}>Premium feature</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieIntake;
