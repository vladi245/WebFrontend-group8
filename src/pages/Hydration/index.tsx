import { useState, useEffect } from "react";
import Navbar from "../../components/NavbarVertical/Navbar";
import HydrationStats from "../../components/Stats/HydrationStats";
import DailyGlasses from "../../components/Hydration/DailyGlasses";
import DailyProgress from "../../components/Hydration/DailyProgress";
import HydrationWaterDisplay from "../../components/Hydration/HydrationWaterDisplay";
import HydrationQuickAdd from "../../components/Hydration/HydrationQuickAdd";
import { apiFetch } from "../../services/api";
import style from "./Hydration.module.css";

interface HydrationData {
  waterGoal: number;
  currentIntake: number;
}

// Helper to get userId from localStorage
function getUserId(): number | null {
  try {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user?.id || null;
  } catch {
    return null;
  }
}

export default function Hydration() {
  const [hydrationData, setHydrationData] = useState<HydrationData>({
    waterGoal: 2000,
    currentIntake: 0,
  });
  const [loading, setLoading] = useState(true);

  const totalGlasses = 8;
  const glassSize = hydrationData.waterGoal / totalGlasses;

  // Fetch today's hydration data on mount
  useEffect(() => {
    const fetchHydration = async () => {
      const userId = getUserId();
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const data = await apiFetch(`/api/hydration?userId=${userId}`);
        setHydrationData({
          waterGoal: data.goalMl || 2000,
          currentIntake: data.currentMl || 0
        });
      } catch (err) {
        console.error("Error fetching hydration:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHydration();
  }, []);

  const handleAdd = async (amount: number) => {
    const userId = getUserId();
    if (!userId) {
      console.error("No user ID found - please log in");
      return;
    }

    const previousIntake = hydrationData.currentIntake;

    // Optimistic update
    setHydrationData(prev => ({
      ...prev,
      currentIntake: prev.currentIntake + amount,
    }));

    try {
      const data = await apiFetch('/api/hydration/add', {
        method: 'POST',
        body: JSON.stringify({ amount, userId })
      });
      
      console.log("Water added successfully:", data);
      
      // Only sync if server value differs significantly (handles race conditions)
      if (data && typeof data.currentMl === 'number') {
        setHydrationData(prev => ({
          ...prev,
          currentIntake: data.currentMl
        }));
      }
    } catch (err) {
      console.error("Error adding water:", err);
      // Revert on error
      setHydrationData(prev => ({
        ...prev,
        currentIntake: previousIntake,
      }));
    }
  };

  const handleRemove = async (amount: number) => {
    const userId = getUserId();
    if (!userId) return;

    const newAmount = Math.max(0, hydrationData.currentIntake - amount);
    
    // Optimistic update
    setHydrationData(prev => ({
      ...prev,
      currentIntake: newAmount,
    }));

    try {
      const data = await apiFetch('/api/hydration/remove', {
        method: 'POST',
        body: JSON.stringify({ amount, userId })
      });
      
      setHydrationData(prev => ({
        ...prev,
        currentIntake: data.currentMl
      }));
    } catch (err) {
      console.error("Error removing water:", err);
    }
  };

  const handleReset = async () => {
    const userId = getUserId();
    if (!userId) return;

    const prevIntake = hydrationData.currentIntake;
    
    // Optimistic update
    setHydrationData(prev => ({
      ...prev,
      currentIntake: 0,
    }));

    try {
      await apiFetch('/api/hydration/reset', {
        method: 'POST',
        body: JSON.stringify({ userId })
      });
    } catch (err) {
      console.error("Error resetting hydration:", err);
      // Revert on error
      setHydrationData(prev => ({
        ...prev,
        currentIntake: prevIntake,
      }));
    }
  };

  const handleGoalChange = async (newGoal: number) => {
    const userId = getUserId();
    if (!userId) return;

    const prevGoal = hydrationData.waterGoal;
    
    // Optimistic update
    setHydrationData(prev => ({
      ...prev,
      waterGoal: newGoal
    }));

    try {
      await apiFetch('/api/hydration/goal', {
        method: 'PUT',
        body: JSON.stringify({ goal: newGoal, userId })
      });
    } catch (err) {
      console.error("Error updating goal:", err);
      // Revert on error
      setHydrationData(prev => ({
        ...prev,
        waterGoal: prevGoal
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

  // Fish count based on progress (0-10 fish)
  const progressPercent = Math.min((hydrationData.currentIntake / hydrationData.waterGoal) * 100, 100);
  const fishCount = Math.floor(progressPercent / 10); // 1 fish per 10% progress

  // Generate fish with random positions
  const fishEmojis = ['🐟','🐠','🐡','🦈','🐬','🐳','🐋','🦭','🐙','🦑','🦐','🦞','🦀','🦪','🐚'];
  const fish = Array.from({ length: fishCount }, (_, i) => ({
    id: i,
    emoji: fishEmojis[i % fishEmojis.length],
    top: 15 + (i * 17) % 70,
    delay: i * 0.7,
    duration: 8 + (i % 4) * 2,
    size: 5 + (i % 3) * 0.5,
  }));

  return (
    <div className={style.container}>
      <Navbar />

      {/* Swimming fish background */}
      <div className={style.fishContainer}>
        {fish.map((f) => (
          <span
            key={f.id}
            className={style.fish}
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

