import style from './Performance.module.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceData {
    day: string;
    calories: number;
}

interface PerformanceProps {
    data: PerformanceData[];
}

const Performance = ({ data }: PerformanceProps) => {
    return (
        <div className={style.performanceContainer}>
            <div className={style.header}>
                <h2 className={style.title}>Performance Overview</h2>
                <p className={style.subtitle}>Track your workouts and calories burned</p>
            </div>
            <div className={style.graph}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis
                            dataKey="day"
                            stroke="rgba(255, 255, 255, 0.6)"
                            style={{ fontSize: '14px' }}
                        />
                        <YAxis
                            stroke="rgba(255, 255, 255, 0.6)"
                            style={{ fontSize: '14px' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1a1a1a',
                                border: '1px solid #0096FF',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="calories"
                            stroke="#FF6E6E"
                            strokeWidth={3}
                            dot={{ fill: '#FF6E6E', r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className={style.legend}>
                <div className={style.legendItem}>
                    <div className={style.legendDot}></div>
                    <span className={style.legendText}>Calories Burned</span>
                </div>
            </div>
        </div>
    );
};

export default Performance;