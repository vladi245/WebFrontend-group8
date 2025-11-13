import { useState, useEffect } from "react";
import Logo from "../../components/Logo/Logo";
import FoodStats from "../../components/Stats/FoodStats"; 
import FoodPerformance from '../../components/Performance/FoodPerformance';
import CalorieIntake from "../../components/CalorieIntake/CalorieIntake";
import MealPicker from "../../components/MealPicker/MealPicker";
import MealCaloriesBreakdown from "../../components/MealCaloriesBreakdown/MealCaloriesBreakdown";
import style from "./Meals.module.css";


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



  useEffect(() => {
    const fetchMealsData = async () => {
      try {
        // mock data for now
        const mockStatsData: StatsData = {
          totalMeals: 8,
          caloriesEaten: 1467,
          averageIntake: 1789,
        };

        const mockFoodPerformanceData: FoodPerformanceData[] = [
                    { day: 'Mon', caloriesEaten: 1678 },
                    { day: 'Tue', caloriesEaten: 1567 },
                    { day: 'Wed', caloriesEaten: 1207 },
                    { day: 'Thu', caloriesEaten: 1345 },
                    { day: 'Fri', caloriesEaten: 1123 },
                    { day: 'Sat', caloriesEaten: 2897 },
                    { day: 'Sun', caloriesEaten: 1964 },
                ];

        setStatsData(mockStatsData);
        setFoodPerformanceData(mockFoodPerformanceData);

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch meals data:", error);
        setLoading(false);
      }
    };

    fetchMealsData();
  }, []);

  return (
    <div className={style.container}>
      <Logo />
      {!loading && <FoodStats data={statsData} />}
      <div className={style.calorieRow}>
          <CalorieIntake current={1467} goal={2000} />

          <MealCaloriesBreakdown
            totalCalories={1467}
            mealCalories={{
              breakfast: 400,
              lunch: 500,
              dinner: 450,
              snacks: 117,
            }}
          />
        </div>
      {!loading && <MealPicker />}
      {!loading && <FoodPerformance data={foodPerformanceData} />}
    </div>
  );
}
