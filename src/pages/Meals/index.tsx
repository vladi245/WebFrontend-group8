import { useState, useEffect } from "react";
import Logo from "../../components/Logo/Logo";
import FoodStats from "../../components/Stats/FoodStats";
import FoodPerformance from '../../components/Performance/FoodPerformance';
import CalorieIntake from "../../components/CalorieIntake/CalorieIntake";
import MealPicker from "../../components/MealPicker/MealPicker";
import style from "./Meals.module.css";
import Navbar from '../../components/NavbarVertical/Navbar';


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
      const response = await fetch(`http://localhost:5000/api/meals/stats?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      const data = await response.json();

      //fetch weekly stast and average
      const weekRes = await fetch(`http://localhost:5000/api/meals/weekly?userId=${userId}`);
      if (!weekRes.ok) {
        throw new Error("Failed to fetch weekly stats");
      }
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

  // useEffect(() => {
  //   const fetchMealsData = async () => {
  //     try {
  //       // mock data for now
  //       const mockStatsData: StatsData = {
  //         totalMeals: 8,
  //         caloriesEaten: 1467,
  //         averageIntake: 1789,
  //       };

  //       const mockFoodPerformanceData: FoodPerformanceData[] = [
  //                   { day: 'Mon', caloriesEaten: 1678 },
  //                   { day: 'Tue', caloriesEaten: 1567 },
  //                   { day: 'Wed', caloriesEaten: 1207 },
  //                   { day: 'Thu', caloriesEaten: 1345 },
  //                   { day: 'Fri', caloriesEaten: 1123 },
  //                   { day: 'Sat', caloriesEaten: 2897 },
  //                   { day: 'Sun', caloriesEaten: 1964 },
  //               ];

  //       setStatsData(mockStatsData);
  //       setFoodPerformanceData(mockFoodPerformanceData);

  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Failed to fetch meals data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchMealsData();
  // }, []);

  // return (
  //   <div className={style.container}>
  //     <Logo />
  //     {!loading && <FoodStats data={statsData} />}
  //     <CalorieIntake current={1467} goal={2000} />
  //     {!loading && <MealPicker />}
  //     {!loading && <FoodPerformance data={foodPerformanceData} />}
  //   </div>
  // );

  return (
    <>
      <Navbar />

      <div className={style.container}>
        {!loading && <FoodStats data={statsData} />}


        <CalorieIntake current={statsData.caloriesEaten} goal={2500} />


        {!loading && <MealPicker onMealAdded={fetchStats} />}


        {!loading && <FoodPerformance data={foodPerformanceData} />}
      </div>

    </>
  );
}

