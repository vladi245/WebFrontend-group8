import styles from './DailyGlasses.module.css';
import { useTranslation } from 'react-i18next';

interface DailyGlassesProps {
  current: number;
  total: number;
  glassMl: number;
}

//glass shape based on lucide glass water icon
const GlassIcon = ({ fillPercent, index }: { fillPercent: number; index: number }) => {
  const p = Math.max(0, Math.min(1, fillPercent));
  //glass interior dimensions for fill calculation
  const glassTop = 4;
  const glassBottom = 20;
  const glassHeight = glassBottom - glassTop;
  const fillHeight = glassHeight * p;
  const fillY = glassBottom - fillHeight;

  const isFull = p >= 0.999;
  const hasAnyFill = p > 0.01;

  //unique IDs for each glass
  const gradientId = `glassFill-${index}`;
  const clipId = `glassClip-${index}`;

  return (
    <svg
      viewBox="0 0 24 24"
      className={styles.glassSvg}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1BB4FF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0096FF" stopOpacity="0.9" />
        </linearGradient>
        {/*clip path matching the glass interior*/}
        <clipPath id={clipId}>
          <path d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 19.21a2 2 0 0 1-1.99 1.79H8.8a2 2 0 0 1-1.99-1.79L5.116 4.104Z" />
        </clipPath>
      </defs>

      {/*water fill - animated rect inside clip*/}
      {hasAnyFill && (
        <g clipPath={`url(#${clipId})`}>
          <rect
            x="5"
            y={fillY}
            width="14"
            height={fillHeight + 1}
            fill={`url(#${gradientId})`}
            className={styles.waterFill}
          />
        </g>
      )}

      {/*glass outline matches lucide glass water path */}
      <path
        d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 19.21a2 2 0 0 1-1.99 1.79H8.8a2 2 0 0 1-1.99-1.79L5.116 4.104Z"
        fill="none"
        stroke={hasAnyFill ? "#0096FF" : "#555"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.glassOutline}
      />

      {/*green check for full glass*/}
      {isFull && (
        <g className={styles.checkWrap}>
          <circle cx="12" cy="12" r="5" fill="#00C851" />
          <path
            d="M9 12 L11 14 L15 10"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      )}
    </svg>
  );
};

const DailyGlasses = ({ current, total, glassMl }: DailyGlassesProps) => {
  const { t } = useTranslation();
  //per-glass fill percent
  const glasses = Array.from({ length: total }, (_, i) => {
    const start = i * glassMl;
    const amountInGlass = Math.max(0, Math.min(glassMl, current - start));
    const percent = glassMl > 0 ? amountInGlass / glassMl : 0;
    return percent;
  });

  const completedCount = glasses.filter(p => p >= 0.999).length;
  const perGlassRounded = Math.round(glassMl);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t('dailyGlasses.dailyGlasses')}</h3>
        <span className={styles.progress}>
          {completedCount}/{total} {t('dailyGlasses.completed')} ({perGlassRounded} ml {t('dailyGlasses.each')})
        </span>
      </div>

      <div className={styles.glassesGrid}>
        {glasses.map((p, idx) => (
          <div key={idx} className={styles.glassWrap}>
            <GlassIcon fillPercent={p} index={idx} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyGlasses;
