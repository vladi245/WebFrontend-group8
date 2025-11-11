import { useState, useEffect } from 'react';
import Logo from '../../components/Logo/Logo';
import style from './Workout.module.css';
import Stats from '../../components/Stats/Stats';
import Performance from '../../components/Performance/Performance';
import Exercises from '../../components/Exercises/Exercises';
import MuscleGroup from '../../components/MuscleGroup/MuscleGroup';
import Navbar from '../../components/NavbarVertical/Navbar';

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
        // here we will fetch data from api (?)
        const fetchWorkoutData = async () => {
            try {
                // const statsResponse = await fetch('/api/stats');
                // const statsData = await statsResponse.json();
                // const performanceResponse = await fetch('/api/performance');
                // const performanceData = await performanceResponse.json();

                // mock data for now
                const mockStatsData: StatsData = {
                    totalWorkouts: 15,
                    caloriesBurned: 3520,
                    daysActive: '7 days active'
                };

                const mockPerformanceData: PerformanceData[] = [
                    { day: 'Mon', calories: 420 },
                    { day: 'Tue', calories: 280 },
                    { day: 'Wed', calories: 520 },
                    { day: 'Thu', calories: 680 },
                    { day: 'Fri', calories: 920 },
                    { day: 'Sat', calories: 450 },
                    { day: 'Sun', calories: 1250 },
                ];

                setStatsData(mockStatsData);
                setPerformanceData(mockPerformanceData);
                setLoading(false);
                //error handling
            } catch (error) {
                console.error('Failed to fetch workout data:', error);
                setLoading(false);
            }
        };

        fetchWorkoutData();
    }, []);

    return (
        <>
        <Navbar />
        <div className={style.container}>
            <div style={{background: 'transparent', height: '40px'}}>

            </div>
            {!loading && <Stats data={statsData} />}
            {!loading && <Performance data={performanceData} />}
            <Exercises />
            <MuscleGroup />
        </div>
        </>
    );
}