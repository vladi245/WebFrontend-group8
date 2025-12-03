import { useState, useEffect } from "react";
import FoodStats from "../../components/Stats/FoodStats";
import FoodPerformance from '../../components/Performance/FoodPerformance';
import CalorieIntake from "../../components/CalorieIntake/CalorieIntake";
import MealPicker from "../../components/MealPicker/MealPicker";
import style from "./Meals.module.css";
import Navbar from '../../components/NavbarVertical/Navbar';
import { apiFetch, logout } from '../../services/api';

interface StatsData {
  totalMeals: number;
  caloriesEaten: number;
  averageIntake: number;
}

interface FoodPerformanceData {
  day: string;
  caloriesEaten: number;
}

export default function Meals() {
  const [statsData, setStatsData] = useState<StatsData>({
    totalMeals: 0,
    caloriesEaten: 0,
    averageIntake: 0,
  });

  const [foodPerformanceData, setFoodPerformanceData] = useState<FoodPerformanceData[]>([]);
  const [loading, setLoading] = useState(true);




  const fetchStats = async (provided?: StatsData) => {
    if (provided) {
      setStatsData(provided);
      setLoading(false);
      return;
    }

    try {
      const storedUser = localStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;
      const userId = user?.id;

      //fetch todays totals
      const response = await apiFetch(`/api/meals/stats?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      const data = await response.json();

      //fetch weekly stast and average
      const weekRes = await apiFetch(`/api/meals/weekly?userId=${userId}`);
      if (!weekRes.ok) {
        throw new Error("Failed to fetch weekly stats");
      }
      
      console.log(weekRes)
      const weekData = await weekRes.json();


      //weekData
      setFoodPerformanceData(weekData.week.map((d: any) => ({ day: d.day, caloriesEaten: d.caloriesEaten })));


      const average = Math.round(weekData.average);

      setStatsData({
        totalMeals: data.totalMeals ?? 0,
        caloriesEaten: data.caloriesEaten ?? 0,
        averageIntake: average,
      });
    } catch (error) {
      console.error("Failed to fetch meals stats:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchStats();
  }, []);


  return (
    <div className={style.zoomContainer}>

      <Navbar />

      <div className={style.container}>
        {!loading && <FoodStats data={statsData} />}


        <CalorieIntake current={statsData.caloriesEaten} goal={2500} />


        {!loading && <MealPicker onMealAdded={fetchStats} />}


        {!loading && <FoodPerformance data={foodPerformanceData} />}
      </div>

    </div>
  );
}

