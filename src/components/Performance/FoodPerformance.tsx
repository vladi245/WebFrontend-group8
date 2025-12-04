import style from './Performance.module.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface FoodPerformanceData {
    day: string;
    caloriesEaten: number;
}

interface FoodPerformanceProps {
    data: FoodPerformanceData[];
}


//helper to get the date for each day label in the current week
function getDateForDay(dayLabel: string): Date {
    const dayMap = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
    const today = new Date();
    const jsDay = today.getDay(); // 0=sun 1=mon, 
    //find monday of this week
    const daysSinceMonday = jsDay === 0 ? 6 : jsDay - 1;
    const monday = new Date(today);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(today.getDate() - daysSinceMonday);
    const idx = dayMap[dayLabel];
    const d = new Date(monday);
    d.setDate(monday.getDate() + idx);
    return d;
}

function getFullDayName(date: Date) {
    //always use English
    return date.toLocaleDateString('en-US', { weekday: 'long' });
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const dateObj = getDateForDay(label);
        const fullDay = getFullDayName(dateObj);
        const dateStr = dateObj.toLocaleDateString();
        return (
            <div style={{ 
                background: 'var(--graph-tooltip-background)', 
                border: '1px solid var(--graph-tooltip-border)', 
                borderRadius: 8, 
                color: 'var(--graph-tooltip-text)', 
                padding: 12 
            }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{fullDay}</div>
                <div style={{ fontSize: 12, color: 'var(--graph-tooltip-text-secondary)' }}>{dateStr}</div>
                <div style={{ marginTop: 8 }}>Calories: <b>{payload[0].value}</b></div>
            </div>
        );
    }
    return null;
};

const FoodPerformance = ({ data }: FoodPerformanceProps) => {
    const { t } = useTranslation();
    const today = new Date();
    const jsDay = today.getDay();
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const todayLabel = dayLabels[jsDay === 0 ? 6 : jsDay - 1];


    const renderDot = (props: any) => {
        const { cx, cy, payload } = props;
        if (payload.day === todayLabel) {
            return <circle cx={cx} cy={cy} r={8} fill="#0096FF" stroke="#fff" strokeWidth={2} />;
        }
        return <circle cx={cx} cy={cy} r={5} fill="#7ED957" />;
    };

    return (
        <div className={style.performanceContainer}>
            <div className={style.header}>
                <h2 className={style.title}>{t('foodPerformance.nutritionOverview')}</h2>
                <p className={style.subtitle}>{t('foodPerformance.trackMeals')}</p>
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
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="caloriesEaten"
                            stroke="#7ED957"
                            strokeWidth={3}
                            dot={renderDot}
                            activeDot={{ r: 10, fill: '#888', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className={style.legend}>
                <div className={style.legendItem}>
                    <div className={`${style.legendDot} ${style.legendDotGreen}`}></div>
                    <span className={style.legendText}>{t('foodPerformance.caloriesConsumed')}</span>
                </div>
            </div>
        </div>
    );
};

export default FoodPerformance;