import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import styles from './StandingStatsCard.module.css';
import { LampDesk } from 'lucide-react';

interface StandingStatsProps {
  data: { day: string; minutes: number }[];
}

const StandingStats = ({ data }: StandingStatsProps) => {

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <LampDesk className={styles.icon} />
          <span className={styles.title}>Standing stats</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid stroke="var(--graph-grid-color)" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="var(--graph-axis-color)" />
              <YAxis stroke="var(--graph-axis-color)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--graph-tooltip-background)',
                  border: '1px solid var(--graph-tooltip-border)',
                  borderRadius: '8px',
                  color: 'var(--graph-tooltip-text)',
                }}
              />
              <Bar
                dataKey="minutes"
                fill="#0096FF"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StandingStats;
