import { useState, useEffect } from "react";
import Logo from "../../components/Logo/Logo";
import FoodStats from "../../components/Stats/FoodStats"; 
import style from "./Meals.module.css";

interface StatsData {
  totalMeals: number;
  caloriesEaten: number;
  averageIntake: number;
}

export default function Meals() {
  const [statsData, setStatsData] = useState<StatsData>({
    totalMeals: 0,
    caloriesEaten: 0,
    averageIntake: 0,
  });

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

        setStatsData(mockStatsData);
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
    </div>
  );
}
