import styles from './HydrationWaterDisplay.module.css';

interface HydrationWaterDisplayProps {
  current: number;
  goal: number;
}

const HydrationWaterDisplay = ({ current, goal }: HydrationWaterDisplayProps) => {
  const percentage = Math.min((current / goal) * 100, 100);
  const waterHeight = 320 * (percentage / 100);
  const waterY = 340 - waterHeight;

  return (
    <div className={styles.container}>
      <svg className={styles.glass} viewBox="0 0 160 370" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="glassClip">
            <path d="M 20 25 Q 12 25 12 35 L 26 310 Q 30 340 55 342 L 105 342 Q 130 340 134 310 L 148 35 Q 148 25 140 25 Z" />
          </clipPath>

          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#1BB4FF" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#0075CC" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        <g clipPath="url(#glassClip)">
          {/*main water body*/}
          <rect
            x="12"
            y={waterY}
            width="136"
            height={waterHeight}
            fill="url(#waterGradient)"
            className={styles.waterFill}
          />
          
        </g>

        {/*glass outline */}
        <path
          d="M 20 25 Q 12 25 12 35 L 26 310 Q 30 340 55 342 L 105 342 Q 130 340 134 310 L 148 35 Q 148 25 140 25 Z"
          fill="none"
          stroke="#666"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          pointerEvents="none"
        />
      </svg>

      <div className={styles.info}>
        <div className={styles.currentAmount}>{current} ml</div>
      </div>
    </div>
  );
};

export default HydrationWaterDisplay;
