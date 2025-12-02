import styles from './DailyGlasses.module.css';

interface DailyGlassesProps {
  current: number; // ml
  total: number; // should be 8
  glassMl: number; // ml per glass (float)
}

// Glass shape based on lucide glass-water icon (without wave)
// The lucide icon uses a trapezoid glass shape
const GlassIcon = ({ fillPercent, index }: { fillPercent: number; index: number }) => {
  const p = Math.max(0, Math.min(1, fillPercent));
  
  // Glass interior dimensions for fill calculation
  const glassTop = 4;
  const glassBottom = 20;
  const glassHeight = glassBottom - glassTop;
  const fillHeight = glassHeight * p;
  const fillY = glassBottom - fillHeight;

  const isFull = p >= 0.999;
  const hasAnyFill = p > 0.01;

  // Unique IDs for each glass
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
        {/* Clip path matching the glass interior */}
        <clipPath id={clipId}>
          <path d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 19.21a2 2 0 0 1-1.99 1.79H8.8a2 2 0 0 1-1.99-1.79L5.116 4.104Z" />
        </clipPath>
      </defs>

      {/* Water fill - animated rect inside clip */}
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

      {/* Glass outline - matches lucide glass-water path */}
      <path
        d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 19.21a2 2 0 0 1-1.99 1.79H8.8a2 2 0 0 1-1.99-1.79L5.116 4.104Z"
        fill="none"
        stroke={hasAnyFill ? "#0096FF" : "#555"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.glassOutline}
      />

      {/* Green check for full glass */}
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
  // compute per-glass fill percent
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
        <h3 className={styles.title}>Daily Glasses</h3>
        <span className={styles.progress}>
          {completedCount}/{total} completed ({perGlassRounded} ml each)
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
