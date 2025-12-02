import { useState, useEffect } from 'react';
import Logo from '../../components/Logo/Logo';
import style from './Workout.module.css';
import Stats from '../../components/Stats/Stats';
import Performance from '../../components/Performance/Performance';
import Exercises from '../../components/Exercises/Exercises';
import MuscleGroup from '../../components/MuscleGroup/MuscleGroup';
import Navbar from '../../components/NavbarVertical/Navbar';
import { apiFetch } from '../../services/api';

interface StatsData {
    totalWorkouts: number;
    caloriesBurned: number;
    daysActive: string;
}

interface PerformanceData {
    day: string;
    calories: number;
}

export default function Workout() {
    const [statsData, setStatsData] = useState<StatsData>({
        totalWorkouts: 0,
        caloriesBurned: 0,
        daysActive: '0 days active'
    });
    const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkoutData = async () => {
            try {
                const stats = await apiFetch('/api/workouts/stats');
                const records = await apiFetch('/api/workouts');
                // Map stats to StatsData
                const daysActiveCount = (stats.daily || []).filter((d: any) => Number(d.calories ?? d.calories_burned ?? 0) > 0).length;
                const statsDataMapped: StatsData = {
                    totalWorkouts: stats.total_workouts,
                    caloriesBurned: stats.total_calories,
                    daysActive: `${daysActiveCount} days active`
                };

                // Map daily to PerformanceData with short day labels (be permissive about field names)
                const perfData: PerformanceData[] = (stats.daily || []).map((d: any) => {
                    const dateStr = d.date || d.day || d[0] || '';
                    const date = dateStr ? new Date(dateStr) : new Date();
                    const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
                    const calories = Number(d.calories ?? d.calories_burned ?? d.value ?? 0) || 0;
                    return { day: dayName, calories };
                });

                // initial stats and mapped perfData
                setStatsData(statsDataMapped);
                setPerformanceData(perfData);
                // Store only today's completed records (so list resets each day)
                const todayStr = (new Date()).toISOString().slice(0, 10);
                const todays = (records || []).filter((r: any) => {
                    const ts = r.timestamp || r.time || r.date;
                    if (!ts) return false;
                    return new Date(ts).toISOString().slice(0, 10) === todayStr;
                });
                setCompletedRecords(todays);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch workout data:', error);
                setLoading(false);
            }
        };

        fetchWorkoutData();
    }, []);

    // Refresh data at next local midnight so "Exercises Done" clears for the new day
    useEffect(() => {
        const now = new Date();
        const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const msUntil = nextMidnight.getTime() - now.getTime();
        const t = setTimeout(() => {
            // fetch fresh data (stats + today's records)
            (async () => {
                try {
                    const stats = await apiFetch('/api/workouts/stats');
                    const records = await apiFetch('/api/workouts');
                    const daysActiveCount = (stats.daily || []).filter((d: any) => Number(d.calories ?? d.calories_burned ?? 0) > 0).length;
                    setStatsData({
                        totalWorkouts: stats.total_workouts,
                        caloriesBurned: stats.total_calories,
                        daysActive: `${daysActiveCount} days active`
                    });
                    const perfData: PerformanceData[] = (stats.daily || []).map((d: any) => {
                        const dateStr = d.date || d.day || d[0] || '';
                        const date = dateStr ? new Date(dateStr) : new Date();
                        const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
                        const calories = Number(d.calories ?? d.calories_burned ?? d.value ?? 0) || 0;
                        return { day: dayName, calories };
                    });
                    setPerformanceData(perfData);
                    const todayStr2 = (new Date()).toISOString().slice(0, 10);
                    const todays = (records || []).filter((r: any) => {
                        const ts = r.timestamp || r.time || r.date;
                        if (!ts) return false;
                        return new Date(ts).toISOString().slice(0, 10) === todayStr2;
                    });
                    setCompletedRecords(todays);
                } catch (e) {
                    console.error('Error refreshing at midnight', e);
                }
            })();
        }, msUntil + 1000);
        return () => clearTimeout(t);
    }, []);

    // completed records from backend
    const [completedRecords, setCompletedRecords] = useState<any[]>([]);

    const handleAddCompleted = async (workout_id: number) => {
        try {
            const res = await apiFetch('/api/workouts', {
                method: 'POST',
                body: JSON.stringify({ workout_id })
            });
            // res contains { record, stats }
            // POST response stats
            setCompletedRecords(prev => [res.record, ...prev]);

            const daysActiveCount = (res.stats.daily || []).filter((d: any) => Number(d.calories ?? d.calories_burned ?? 0) > 0).length;
            setStatsData({
                totalWorkouts: res.stats.total_workouts,
                caloriesBurned: res.stats.total_calories,
                daysActive: `${daysActiveCount} days active`
            });
            const perfData: PerformanceData[] = (res.stats.daily || []).map((d: any) => {
                const dateStr = d.date || d.day || d[0] || '';
                const date = dateStr ? new Date(dateStr) : new Date();
                const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
                const calories = Number(d.calories ?? d.calories_burned ?? d.value ?? 0) || 0;
                return { day: dayName, calories };
            });
            // mapped perfData after add
            setPerformanceData(perfData);
        } catch (err) {
            console.error('Error adding completed workout:', err);
        }
    };

    const handleRemoveCompleted = async (record_id: number) => {
        try {
            const res = await apiFetch(`/api/workouts/${record_id}`, { method: 'DELETE' });
            // update local lists
            setCompletedRecords(prev => prev.filter(r => r.record_id !== record_id));

            const daysActiveCount = res.stats.daily.filter((d: any) => d.calories > 0).length;
            setStatsData({
                totalWorkouts: res.stats.total_workouts,
                caloriesBurned: res.stats.total_calories,
                daysActive: `${daysActiveCount} days active`
            });

            const perfData: PerformanceData[] = res.stats.daily.map((d: any) => {
                const date = new Date(d.day || d.date);
                const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
                return { day: dayName, calories: d.calories };
            });
            setPerformanceData(perfData);
        } catch (err) {
            console.error('Error deleting completed workout:', err);
        }
    };

    return (
        <div className={style.zoomContainer}>

            <Navbar />
            <div className={style.container}>
                <div style={{ background: 'transparent', height: '40px' }}>

                </div>
                {!loading && <Stats data={statsData} />}
                {!loading && <Performance data={performanceData} />}
                <Exercises onAdd={handleAddCompleted} onRemove={handleRemoveCompleted} initialCompleted={completedRecords} />
                <MuscleGroup completedExercises={completedRecords} />
            </div>
        </div>
    );
}