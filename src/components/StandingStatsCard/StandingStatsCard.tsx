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
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid stroke="#222" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111',
                  border: '1px solid #0096FF',
                  color: 'white',
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
