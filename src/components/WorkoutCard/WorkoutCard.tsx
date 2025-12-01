import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import styles from './WorkoutCard.module.css';
import { Clock4, CircleFadingPlus } from 'lucide-react';

interface WorkoutCardProps {
  data: { day: string; minutes: number }[];
}

const WorkoutCard = ({ data }: WorkoutCardProps) => {
  const averageRaw = data.length ? data.reduce((sum, d) => sum + d.minutes, 0) / data.length : 0;
  const average = Number(averageRaw.toFixed(2));


  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Clock4 className={styles.icon} />
          <span className={styles.title}>Workout Duration</span>
        </div>
      </div>


      <div className={styles.content}>
        <div className={styles.subtitle}>Your average workout time is <div className={styles.amount}>{average} min</div></div>


        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
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
              <Line
                type="monotone"
                dataKey="minutes"
                stroke="#0096FF"
                strokeWidth={3}
                dot={{ r: 5, fill: '#0096FF' }}
                activeDot={{ r: 7, fill: '#888' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
