import Navbar from '../../components/NavbarVertical/Navbar';
import Greeting from '../../components/ui/Greeting/Greetings';
import Seperator from '../../components/ui/Seperator/Seperator';

import CalorieIntake from '../../components/CalorieIntake/CalorieIntake';
import WaterCard from '../../components/WaterCard/WaterCard';
import WorkoutCard from '../../components/WorkoutCard/WorkoutCard';
import ConnectionStatus from "../../components/ConnectionStatus/ConnectionStatus";

import StandingStats from '../../components/StandingStatsCard/StandingStatsCard';
import FriendsActivity from '../../components/FriendsActivity/FriendsActivity';
import WorkoutStatsCard from '../../components/WorkoutStatsCard/WorkoutStatsCard';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../services/api';

export default function Home() {
    const [calorieCurrent, setCalorieCurrent] = useState<number>(1331);
    const [calorieGoal, setCalorieGoal] = useState<number>(2500);
    const [caloriesBurned, setCaloriesBurned] = useState<number>(1560);

    useEffect(() => {
        let mounted = true;
        const fetchStats = async () => {
            try {
                let mealStats: any = null;
                let workoutStats: any = null;

                try {
                    mealStats = await apiFetch('/api/meals/stats');
                } catch (err) {
                    try {
                        const userJson = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
                        const user = userJson ? JSON.parse(userJson) : null;
                        if (user && user.id) {
                            mealStats = await apiFetch(`/api/meals/stats?userId=${user.id}`);
                        }
                    } catch (e) {
                    }
                }

                try {
                    workoutStats = await apiFetch('/api/workouts/stats');
                } catch (err) {
                    workoutStats = null;
                    console.warn('Could not fetch workout stats (auth may be required)');
                }

                if (!mounted) return;

                console.debug('Dashboard: mealStats:', mealStats, 'workoutStats:', workoutStats);
                if (mealStats) {
                    if (typeof mealStats.caloriesEaten !== 'undefined') setCalorieCurrent(Number(mealStats.caloriesEaten || 0));
                    if (typeof mealStats.averageIntake !== 'undefined') setCalorieGoal(prev => Math.round(Number(mealStats.averageIntake || prev)));
                }

                if ((!mealStats || typeof mealStats.caloriesEaten === 'undefined')) {
                    try {
                        let entries: any = null;
                        try {
                            entries = await apiFetch('/api/meals/entries');
                        } catch (e) {
                            const userJson = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
                            const user = userJson ? JSON.parse(userJson) : null;
                            if (user && user.id) {
                                entries = await apiFetch(`/api/meals/entries?userId=${user.id}`);
                            }
                        }
                        console.debug('Dashboard: entries fallback:', entries);
                        if (Array.isArray(entries)) {
                            const total = entries.reduce((sum: number, it: any) => sum + Number(it.calories || it.calories_intake || 0), 0);
                            setCalorieCurrent(total);
                        } else {
                            setCalorieCurrent(0);
                        }
                    } catch (e) {
                        console.warn('Failed to derive calories from entries', e);
                    }
                }

                if (workoutStats && (typeof workoutStats.total_calories !== 'undefined' || typeof workoutStats.totalCalories !== 'undefined')) {
                    setCaloriesBurned(Number(workoutStats.total_calories ?? workoutStats.totalCalories ?? 0));
                }
            } catch (err) {
                console.warn('Failed to fetch dashboard stats', err);
            }
        };
        fetchStats();
        return () => { mounted = false };
    }, []);
    return (
        <>
            <Navbar />
            <div style={{ marginLeft: '350px', padding: '20px', overflowY: 'hidden' }}>
                <Greeting name='Washington ' />
                <div style={{ width: '50%' }}>
                    <Seperator variant="accent" />
                </div>
                <h2 style={{ color: 'white', marginTop: '20px' }}>Today's stats</h2>
                <div style={{ display: 'flex', columnGap: '20px', marginBottom: '20px', width: '80%' }}>
                    <ConnectionStatus />
                </div>

                <div style={{ display: 'flex', columnGap: '20px', marginBottom: '20px', width: '80%' }}>
                    <CalorieIntake current={calorieCurrent} goal={calorieGoal} />
                    <WaterCard current={1.5} goal={3} />
                    <WorkoutStatsCard calories={caloriesBurned} />

                </div>
                <div style={{ display: 'flex', columnGap: '20px', marginBottom: '20px', width: '80%' }}>

                    <WorkoutCard data={[
                        { day: 'Mon', minutes: 30 },
                        { day: 'Tue', minutes: 45 },
                        { day: 'Wed', minutes: 20 },
                        { day: 'Thu', minutes: 60 },
                        { day: 'Fri', minutes: 50 },
                        { day: 'Sat', minutes: 40 },
                        { day: 'Sun', minutes: 70 },
                    ]} />
                    {/*
                    <FriendsActivity activities={[
                        {
                        id: 1,
                        username: 'washington',
                        action: 'added a new activity',
                        timeAgo: '10m ago',
                        },
                        {
                        id: 2,
                        username: 'gmail',
                        action: 'reached the goal',
                        timeAgo: '17m ago',
                        },

                    ]}/>
                    */}

                    <StandingStats data={[
                        { day: 'Mon', minutes: 0 },
                        { day: 'Tue', minutes: 0 },
                        { day: 'Wed', minutes: 0 },
                        { day: 'Thu', minutes: 0 },
                        { day: 'Fri', minutes: 0 },
                        { day: 'Sat', minutes: 0 },
                        { day: 'Sun', minutes: 0 },
                    ]} />
                </div>



            </div>
        </>
    );
};
