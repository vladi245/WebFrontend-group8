import styles from './WaterCard.module.css';
import { GlassWater, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WaterCardProps {
  current: number;
  goal: number;
}

const WaterCard = ({ current, goal }: WaterCardProps) => {
  const { t } = useTranslation();
  const percentage = Math.min((current / goal) * 100, 100);
  // Props are in liters, convert to ml for display
  const currentMl = Math.round(current * 1000);
  const goalMl = Math.round(goal * 1000);
  const userJson = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  let user: any = null;
  try { user = userJson ? JSON.parse(userJson) : null; } catch (e) { user = null; }
  const isStandard = !user || user.type === 'standard';

  return (
    <div className={styles.card}>
      <div className={`${styles.cardInner} ${isStandard ? styles.blurred : ''}`}>
        <div className={styles.header}>
          <GlassWater className={styles.icon} />
          <span className={styles.title}>{t('waterCard.Water')}</span>
        </div>

        <div className={styles.amount}>
          {currentMl}/{goalMl} ml
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      {isStandard && (
        <div className={styles.lockOverlay} role="presentation">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Lock className={styles.lockIcon} />
            <div className={styles.lockCaption}>{t('waterCard.premiumFeature')}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterCard;
