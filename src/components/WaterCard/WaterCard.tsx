import styles from './WaterCard.module.css';
import { GlassWater } from 'lucide-react';

interface WaterCardProps {
  current: number;
  goal: number;
}

const WaterCard = ({ current, goal }: WaterCardProps) => {
  const percentage = Math.min((current / goal) * 100, 100);
  // Props are in liters, convert to ml for display
  const currentMl = Math.round(current * 1000);
  const goalMl = Math.round(goal * 1000);

  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.header}>
          <GlassWater className={styles.icon} />
          <span className={styles.title}>Water</span>
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
    </div>
  );
};

export default WaterCard;
