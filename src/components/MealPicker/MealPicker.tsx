import { useState, useMemo, useEffect } from "react";
import style from "./MealPicker.module.css";

interface MealEntry {
  recordId: number;
  foodId: number;
  name: string;
  calories: number;
}

interface Food {
  id: number;
  name: string;
  calories: number;
}

interface BackendMeal {
  id: number;
  foodId: number;
  name: string;
  calories: number;
}

interface MealPickerProps {
  onMealAdded?: () => void;
}

const MealPicker = ({ onMealAdded }: MealPickerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState<Food[]>([]);
  const [meals, setMeals] = useState<MealEntry[]>([]);

  // -----------------------------
  // Load FOOD LIBRARY (from /api/foods)
  // -----------------------------
  const loadFoodsFromServer = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/foods");
      const data: Food[] = await res.json();
      setFoods(data);
    } catch (err) {
      console.error("Failed to load foods:", err);
    }
  };

  // -----------------------------
  // Load MEALS (from /api/meals/entries)
  // -----------------------------
  const loadMealsFromServer = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      const userId = user?.id;

      if (!userId) return;

      const res = await fetch(
        `http://localhost:5000/api/meals/entries?userId=${userId}`
      );
      const data: BackendMeal[] = await res.json();

      setMeals(
        data.map((entry) => ({
          recordId: entry.id,
          foodId: entry.foodId,
          name: entry.name,
          calories: entry.calories,
        }))
      );

      onMealAdded?.();
    } catch (err) {
      console.error("Failed to load meals:", err);
    }
  };

  // Load foods + meals when component mounts
  useEffect(() => {
    loadFoodsFromServer();
    loadMealsFromServer();
  }, []);

  // -----------------------------
  // Filter foods based on search input
  // -----------------------------
  const filteredFoods = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return foods;
    return foods.filter((food) =>
      food.name.toLowerCase().includes(q)
    );
  }, [searchTerm, foods]);

  // -----------------------------
  // Add food to meals
  // -----------------------------
  const handleAddFood = async (food: Food) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const userId = user?.id;

      if (!userId) return;
      console.log(userId)

      const res = await fetch("http://localhost:5000/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          foodId: food.id,
        }),
      });

      if (!res.ok) {
        console.error("Failed to save meal entry");
        return;
      }

      onMealAdded?.();
      await loadMealsFromServer();
    } catch (err) {
      console.error("Failed to add meal:", err);
    }
  };

  // -----------------------------
  // Remove meal entry
  // -----------------------------
  const handleRemoveFood = async (recordId: number) => {
    setMeals((current) => current.filter((m) => m.recordId !== recordId));

    try {
      await fetch("http://localhost:5000/api/meals", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId }),
      });

      onMealAdded?.();
      await loadMealsFromServer();
    } catch (err) {
      console.error("Failed to remove meal entry:", err);
    }
  };

  const totalCalories = meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  // -----------------------------
  // UI Render
  // -----------------------------
  return (
    <div className={style.mealsPlannerContainer}>
      {/* LEFT — FOOD LIBRARY */}
      <div className={style.foodLibrarySection}>
        <h2 className={style.sectionTitle}>Food Library</h2>

        <div className={style.searchContainer}>
          <input
            className={style.searchInput}
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={style.foodPillList}>
          {filteredFoods.length === 0 ? (
            <p className={style.noResults}>
              No foods match "{searchTerm}"
            </p>
          ) : (
            filteredFoods.map((food) => (
              <button
                key={food.id}
                className={style.foodPill}
                onClick={() => handleAddFood(food)}
              >
                {food.name}
              </button>
            ))
          )}
        </div>
      </div>

      {/* RIGHT — FOODS EATEN TODAY */}
      <div className={style.mealsSection}>
        <h2 className={style.sectionTitle}>Today's Foods</h2>

        <div className={style.mealList}>
          {meals.length === 0 ? (
            <p className={style.noResults}>No foods added yet.</p>
          ) : (
            meals.map((meal) => (
              <div key={meal.recordId} className={style.mealRow}>
                <div className={style.mealText}>
                  <span className={style.mealName}>{meal.name}</span>
                  <span className={style.mealCalories}>
                    {meal.calories} kcal
                  </span>
                </div>

                <button
                  type="button"
                  className={style.removeButton}
                  onClick={() => handleRemoveFood(meal.recordId)}
                >
                  −
                </button>
              </div>
            ))
          )}
        </div>

        <div className={style.mealTotal}>
          <span>Total Calories:</span>
          <span className={style.mealTotalValue}>
            {totalCalories} kcal
          </span>
        </div>
      </div>
    </div>
  );
};

export default MealPicker;
