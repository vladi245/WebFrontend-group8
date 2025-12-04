import style from './Performance.module.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

interface PerformanceData {
    day: string;
    calories: number;
}

interface PerformanceProps {
    data: PerformanceData[];
}

const Performance = ({ data }: PerformanceProps) => {
    const { t } = useTranslation();

    return (
        <div className={style.performanceContainer}>
            <div className={style.header}>
                <h2 className={style.title}>{t('workoutPerformance.performanceOverview')}</h2>
                <p className={style.subtitle}>{t('workoutPerformance.trackWorkouts')}</p>
            </div>
            <div className={style.graph}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--graph-grid-color)" />
                        <XAxis
                            dataKey="day"
                            stroke="var(--graph-axis-color)"
                            style={{ fontSize: '14px' }}
                        />
                        <YAxis
                            stroke="var(--graph-axis-color)"
                            style={{ fontSize: '14px' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--graph-tooltip-background)',
                                border: '1px solid var(--graph-tooltip-border)',
                                borderRadius: '8px',
                                color: 'var(--graph-tooltip-text)'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="calories"
                            stroke="#FF6E6E"
                            strokeWidth={3}
                            dot={{ fill: '#FF6E6E', r: 5 }}
                            activeDot={{ r: 7, fill: '#888' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className={style.legend}>
                <div className={style.legendItem}>
                    <div className={style.legendDot}></div>
                    <span className={style.legendText}>{t('workoutPerformance.caloriesBurned')}</span>
                </div>
            </div>
        </div>
    );
};

export default Performance;