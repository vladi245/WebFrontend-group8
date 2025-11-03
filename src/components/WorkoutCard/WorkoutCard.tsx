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
  const average = data.reduce((sum, d) => sum + d.minutes, 0) / data.length;


  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Clock4 className={styles.icon} />
          <span className={styles.title}>Workout Duration</span>
        </div>
        <button className={styles.addButton}>
          <CircleFadingPlus className={styles.addIcon} />
          <span>Add Workout</span>
        </button>
      </div>


      <div className={styles.content}>
        <div className={styles.subtitle}>Your average workout time is <div className={styles.amount}>{average} min</div></div>


        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
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
              <Line
                type="monotone"
                dataKey="minutes"
                stroke="#0096FF"
                strokeWidth={3}
                dot={{ r: 5, fill: '#0096FF' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
