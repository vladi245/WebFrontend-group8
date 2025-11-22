import styles from './WaterCard.module.css';
import { GlassWater } from 'lucide-react';

interface WaterCardProps {
  current: number;
  goal: number;
}

const WaterCard = ({ current, goal }: WaterCardProps) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className={styles.card}>
      <div className={`${styles.cardInner} ${styles.blurred}`}>
        <div className={styles.header}>
          <GlassWater className={styles.icon} />
          <span className={styles.title}>Water</span>
        </div>

        <div className={styles.amount}>
          {current.toLocaleString('en-FR', { maximumFractionDigits: 1 })}l
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.overlay} role="presentation">
        <div className={styles.overlayBox}>
          <div className={styles.overlayText}>Coming soon</div>
        </div>
      </div>
    </div>
  );
};

export default WaterCard;
