import { useState, useEffect } from 'react';
import Navbar from '../../components/NavbarVertical/Navbar';
import HydrationStats from '../../components/Stats/HydrationStats';
import DailyGlasses from '../../components/Hydration/DailyGlasses';
import DailyProgress from '../../components/Hydration/DailyProgress';
import HydrationWaterDisplay from '../../components/Hydration/HydrationWaterDisplay';
import HydrationQuickAdd from '../../components/Hydration/HydrationQuickAdd';
import { apiFetch } from '../../services/api';
import style from './Hydration.module.css';

interface HydrationData {
  waterGoal: number;
  currentIntake: number;
}

export default function Hydration() {
  //get user ID from localStorage (same pattern as dashboard)
  const getUserId = (): number | null => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user?.id || null;
  };
  const [hydrationData, setHydrationData] = useState<HydrationData>({
    waterGoal: 2000,
    currentIntake: 0,
  });
  const [loading, setLoading] = useState(true);

  const totalGlasses = 8;
  const glassSize = hydrationData.waterGoal / totalGlasses;

  //fetch today hydration data
  useEffect(() => {
    const fetchHydration = async () => {
      const userId = getUserId();
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiFetch(`/api/hydration?userId=${userId}`);
        const data = await res.json();
        setHydrationData({
          waterGoal: data.goal_ml || data.goalMl || 2000,
          currentIntake: data.current_ml || data.currentMl || 0
        });
      } catch (error) {
        console.error('Failed to fetch hydration data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHydration();
  }, []);

  const handleAdd = async (amount: number) => {
    const userId = getUserId();
    if (!userId) return;

    const previousIntake = hydrationData.currentIntake;


    setHydrationData(prev => ({
      ...prev,
      currentIntake: prev.currentIntake + amount,
    }));

    try {
      const res = await apiFetch('/api/hydration/add', {
        method: 'POST',
        body: JSON.stringify({ amount, userId })
      });
      const data = await res.json();

      const newIntake = data.currentMl ?? data.current_ml;
      if (typeof newIntake === 'number') {
        setHydrationData(prev => ({
          ...prev,
          currentIntake: newIntake
        }));
      }
    } catch (error) {
      console.error('Failed to add water:', error);

      setHydrationData(prev => ({
        ...prev,
        currentIntake: previousIntake,
      }));
    }
  };

  const handleRemove = async (amount: number) => {
    const userId = getUserId();
    if (!userId) return;

    const previousIntake = hydrationData.currentIntake;
    const newAmount = Math.max(0, previousIntake - amount);


    setHydrationData(prev => ({
      ...prev,
      currentIntake: newAmount,
    }));

    try {
      const res = await apiFetch('/api/hydration/remove', {
        method: 'POST',
        body: JSON.stringify({ amount, userId })
      });
      const data = await res.json();

      setHydrationData(prev => ({
        ...prev,
        currentIntake: data.current_ml ?? data.currentMl ?? prev.currentIntake
      }));
    } catch (error) {
      console.error('Failed to remove water:', error);
    }
  };

  const handleReset = async () => {
    const userId = getUserId();
    if (!userId) return;

    const previousIntake = hydrationData.currentIntake;


    setHydrationData(prev => ({
      ...prev,
      currentIntake: 0,
    }));

    try {
      await apiFetch('/api/hydration/reset', {
        method: 'POST',
        body: JSON.stringify({ userId })
      });
    } catch (error) {
      console.error('Failed to reset hydration:', error);

      setHydrationData(prev => ({
        ...prev,
        currentIntake: previousIntake,
      }));
    }
  };

  const handleGoalChange = async (newGoal: number) => {
    const userId = getUserId();
    if (!userId) return;

    const previousGoal = hydrationData.waterGoal;


    setHydrationData(prev => ({
      ...prev,
      waterGoal: newGoal
    }));

    try {
      await apiFetch('/api/hydration/goal', {
        method: 'PUT',
        body: JSON.stringify({ goal: newGoal, userId })
      });
    } catch (error) {
      console.error('Failed to update goal:', error);

      setHydrationData(prev => ({
        ...prev,
        waterGoal: previousGoal
      }));
    }
  };

  if (loading) {
    return (
      <div className={style.container}>
        <Navbar />
        <div className={style.contentWrapper}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  //fish count based on progress 
  const progressPercent = Math.min((hydrationData.currentIntake / hydrationData.waterGoal) * 100, 100);
  const fishCount = Math.floor(progressPercent / 5);
  const bubbleCount = Math.floor(progressPercent / 3);

  //pseudo-random function based on index for consistent but mixed results
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
  };


  const fishEmojis = ['🐟', '🐠', '🐡'];
  const fish = Array.from({ length: fishCount }, (_, i) => ({
    id: i,
    emoji: fishEmojis[Math.floor(pseudoRandom(i + 1) * fishEmojis.length)],
    top: 10 + pseudoRandom(i + 10) * 75,
    delay: pseudoRandom(i + 20) * 8,
    duration: 10 + pseudoRandom(i + 30) * 12,
    size: 1.2 + pseudoRandom(i + 40) * 2,
    direction: pseudoRandom(i + 50) > 0.5 ? 'left' : 'right',
  }));


  const bubbles = Array.from({ length: bubbleCount }, (_, i) => ({
    id: i,
    left: 10 + pseudoRandom(i + 100) * 80,
    delay: pseudoRandom(i + 110) * 5,
    duration: 5 + pseudoRandom(i + 120) * 4,
    size: 0.2 + pseudoRandom(i + 130) * 0.6,
  }));

  return (
    <div className={style.container} style={{ zoom: 0.85 }}>
      <Navbar />


      <div className={style.fishContainer}>
        {fish.map((f) => (
          <span
            key={f.id}
            className={f.direction === 'left' ? style.fishLeft : style.fishRight}
            style={{
              top: `${f.top}%`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
              fontSize: `${f.size}rem`,
            }}
          >
            {f.emoji}
          </span>
        ))}

        {bubbles.map((b) => (
          <span
            key={`bubble-${b.id}`}
            className={style.bubble}
            style={{
              left: `${b.left}%`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              fontSize: `${b.size}rem`,
            }}
          >
            ○
          </span>
        ))}
      </div>

      <div className={style.contentWrapper}>
        <div className={style.topRow}>
          <HydrationStats
            data={hydrationData}
            onChangeGoal={handleGoalChange}
          />
          <DailyGlasses
            current={hydrationData.currentIntake}
            total={totalGlasses}
            glassMl={glassSize}
          />
        </div>

        <div className={style.mainContent}>
          <div className={style.leftColumn}>
            <HydrationWaterDisplay
              current={hydrationData.currentIntake}
              goal={hydrationData.waterGoal}
            />
          </div>

          <div className={style.rightColumn}>
            <DailyProgress
              current={hydrationData.currentIntake}
              goal={hydrationData.waterGoal}
            />

            <HydrationQuickAdd
              onAdd={handleAdd}
              onRemove={handleRemove}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

