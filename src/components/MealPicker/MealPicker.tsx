import { useState, useMemo, useEffect } from "react";
import style from "./MealPicker.module.css";

type MealKey = "breakfast" | "lunch" | "dinner" | "snacks";

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
  mealType: MealKey;    
  foodId: number;
  name: string;
  calories: number;
}

interface MealPickerProps {
  
  onMealAdded?: (stats?: { totalMeals: number; caloriesEaten: number; averageIntake: number }) => void;
}

const ALL_FOODS: Food[] = [
  { id: 1, name: "Oatmeal", calories: 250 },
  { id: 2, name: "Greek Yogurt", calories: 120 },
  { id: 3, name: "Scrambled Eggs", calories: 210 },
  { id: 4, name: "Boiled Egg", calories: 70 },
  { id: 5, name: "Toast", calories: 90 },
  { id: 6, name: "Butter Toast", calories: 150 },
  { id: 7, name: "Peanut Butter Toast", calories: 210 },
  { id: 8, name: "Jam Toast", calories: 140 },
  { id: 9, name: "Cereal with Milk", calories: 220 },
  { id: 10, name: "Cornflakes", calories: 180 },
  { id: 11, name: "Muesli", calories: 240 },
  { id: 12, name: "Apple", calories: 80 },
  { id: 13, name: "Banana", calories: 95 },
  { id: 14, name: "Orange", calories: 70 },
  { id: 15, name: "Pear", calories: 85 },
  { id: 16, name: "Grapes", calories: 60 },
  { id: 17, name: "Strawberries", calories: 50 },
  { id: 18, name: "Blueberries", calories: 85 },
  { id: 19, name: "Kiwi", calories: 60 },
  { id: 20, name: "Watermelon", calories: 45 },
  { id: 21, name: "Granola Bar", calories: 180 },
  { id: 22, name: "Protein Bar", calories: 210 },
  { id: 23, name: "Pretzels", calories: 110 },
  { id: 24, name: "Crackers", calories: 90 },
  { id: 25, name: "Popcorn", calories: 100 },
  { id: 26, name: "Cheese Stick", calories: 80 },
  { id: 27, name: "Chips", calories: 150 },
  { id: 28, name: "Rice Cake", calories: 35 },
  { id: 29, name: "Mixed Nuts", calories: 170 },
  { id: 30, name: "Coffee", calories: 5 },
  { id: 31, name: "Tea", calories: 5 },
  { id: 32, name: "Milk", calories: 120 },
  { id: 33, name: "Chocolate Milk", calories: 180 },
  { id: 34, name: "Orange Juice", calories: 110 },
  { id: 35, name: "Apple Juice", calories: 120 },
  { id: 36, name: "Cola", calories: 140 },
  { id: 37, name: "Lemonade", calories: 130 },
  { id: 38, name: "Iced Coffee", calories: 90 },
  { id: 39, name: "Smoothie", calories: 200 },
  { id: 40, name: "Ham Sandwich", calories: 350 },
  { id: 41, name: "Cheese Sandwich", calories: 320 },
  { id: 42, name: "Peanut Butter Sandwich", calories: 330 },
  { id: 43, name: "Tuna Sandwich", calories: 400 },
  { id: 44, name: "Chicken Sandwich", calories: 420 },
  { id: 45, name: "Turkey Sandwich", calories: 390 },
  { id: 46, name: "Egg Sandwich", calories: 320 },
  { id: 47, name: "Rice", calories: 200 },
  { id: 48, name: "Pasta", calories: 350 },
  { id: 49, name: "Boiled Potatoes", calories: 150 },
  { id: 50, name: "Mashed Potatoes", calories: 210 },
  { id: 51, name: "Fried Potatoes", calories: 320 },
  { id: 52, name: "Grilled Chicken", calories: 280 },
  { id: 53, name: "Baked Chicken", calories: 260 },
  { id: 54, name: "Fried Chicken", calories: 420 },
  { id: 55, name: "Ground Beef", calories: 290 },
  { id: 56, name: "Meatballs", calories: 330 },
  { id: 57, name: "Hot Dog", calories: 280 },
  { id: 58, name: "Sausage", calories: 300 },
  { id: 59, name: "Bread Roll", calories: 150 },
  { id: 60, name: "Bagel", calories: 280 },
  { id: 61, name: "Croissant", calories: 230 },
  { id: 62, name: "Muffin", calories: 300 },
  { id: 63, name: "Pita Bread", calories: 170 },
  { id: 64, name: "Cheddar Cheese", calories: 110 },
  { id: 65, name: "Mozzarella Cheese", calories: 85 },
  { id: 66, name: "Cottage Cheese", calories: 90 },
  { id: 67, name: "Yogurt", calories: 100 },
  { id: 68, name: "Carrots", calories: 50 },
  { id: 69, name: "Tomatoes", calories: 30 },
  { id: 70, name: "Cucumber", calories: 15 },
  { id: 71, name: "Broccoli", calories: 55 },
  { id: 72, name: "Green Beans", calories: 40 },
  { id: 73, name: "Corn", calories: 140 },
  { id: 74, name: "Tomato Soup", calories: 150 },
  { id: 75, name: "Chicken Soup", calories: 180 },
  { id: 76, name: "Vegetable Soup", calories: 120 },
  { id: 77, name: "Baked Beans", calories: 190 },
  { id: 78, name: "Yogurt Drink", calories: 90 },
  { id: 79, name: "Croutons", calories: 110 },
  { id: 80, name: "Plain Bagel", calories: 260 },
  { id: 81, name: "Hard Bread", calories: 60 },
  { id: 82, name: "Jam", calories: 60 },
  { id: 83, name: "Honey Toast", calories: 170 },
  { id: 84, name: "Cucumber Sandwich", calories: 210 },
];

const MealPicker = ({ onMealAdded }: MealPickerProps) => {
  const [activeMeal, setActiveMeal] = useState<MealKey>("breakfast");
  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState<Record<MealKey, MealEntry[]>>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });

  const loadMealsFromServer = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/meals/entries");
      const data: BackendMeal[] = await res.json();

      const grouped: Record<MealKey, MealEntry[]> = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
      };

      data.forEach((entry) => {
        grouped[entry.mealType].push({
          recordId: entry.id,
          foodId: entry.foodId,
          name: entry.name,
          calories: entry.calories,
        });
      });

      setMeals(grouped);

      
      try {
        const allMeals = Object.values(grouped).flat();
        const totalMeals = allMeals.length;
        const caloriesEaten = allMeals.reduce((s, m) => s + (m.calories || 0), 0);
        const averageIntake = caloriesEaten; 
        onMealAdded?.({ totalMeals, caloriesEaten, averageIntake });
      } catch (e) {
        
        console.error("Failed to compute stats from loaded meals:", e);
      }
    } catch (err) {
      console.error("Failed to load meals from server:", err);
    }
  };

  useEffect(() => {
    loadMealsFromServer();
  }, []);

  const filteredFoods = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return ALL_FOODS;
    return ALL_FOODS.filter((food) =>
      food.name.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const handleAddFood = async (food: Food) => {
    try {
      const res = await fetch("http://localhost:5000/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mealType: activeMeal,
          foodId: food.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to save meal entry, status:", res.status, data);
        return;
      }

      
      if (data && data.stats) {
        onMealAdded?.(data.stats);
      } else {
        onMealAdded?.();
      }

      await loadMealsFromServer();
    } catch (err) {
      console.error("Failed to save meal entry:", err);
    }
  };

  const handleRemoveFood = async (mealKey: MealKey, recordId: number) => {
    
    setMeals((currentMeals) => {
      const updated = { ...currentMeals };
      updated[mealKey] = currentMeals[mealKey].filter(
        (meal) => meal.recordId !== recordId
      );
      return updated;
    });

    try {
        const res = await fetch("http://localhost:5000/api/meals", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recordId }),
        });

        try {
          const data = await res.json();
          if (res.ok && data && data.stats) {
            onMealAdded?.(data.stats);
          } else {
            onMealAdded?.();
          }
        } catch (e) {
          
          onMealAdded?.();
        }

        await loadMealsFromServer();
    } catch (err) {
      console.error("Failed to remove meal entry:", err);
    }
  };

  const activeMealItems = meals[activeMeal];
  const activeMealTotal = activeMealItems.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  const tabLabel: Record<MealKey, string> = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snacks: "Snacks",
  };

  const activeTabColorClass: Record<MealKey, string> = {
    breakfast: style.tabBreakfast,
    lunch: style.tabLunch,
    dinner: style.tabDinner,
    snacks: style.tabSnacks,
  };

  return (
    <div className={style.mealsPlannerContainer}>
      {/* left - library */}
      <div className={style.foodLibrarySection}>
        <h2 className={style.sectionTitle}>Food Library</h2>

        <div className={style.searchContainer}>
          <input
            className={style.searchInput}
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search foods by name"
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
                type="button"
              >
                {food.name}
              </button>
            ))
          )}
        </div>
      </div>

      {/* right - meals */}
      <div className={style.mealsSection}>
        <h2 className={style.sectionTitle}>Today's Meals</h2>

        <div className={style.tabs}>
          {(["breakfast", "lunch", "dinner", "snacks"] as MealKey[]).map(
            (mealKey) => (
              <button
                key={mealKey}
                type="button"
                className={
                  activeMeal === mealKey
                    ? `${style.tabButton} ${style.tabButtonActive} ${activeTabColorClass[mealKey]}`
                    : style.tabButton
                }
                onClick={() => setActiveMeal(mealKey)}
              >
                {tabLabel[mealKey]}
              </button>
            )
          )}
        </div>

        <div className={style.mealList}>
          {activeMealItems.length === 0 ? (
            <p className={style.noResults}>
              No foods added to {tabLabel[activeMeal]} yet.
            </p>
          ) : (
            activeMealItems.map((meal, index) => (
              <div
                key={`${meal.recordId}-${index}`}
                className={style.mealRow}
              >
                <div className={style.mealText}>
                  <span className={style.mealName}>{meal.name}</span>
                  <span className={style.mealCalories}>
                    {meal.calories} kcal
                  </span>
                </div>
                <button
                  type="button"
                  className={style.removeButton}
                  onClick={() =>
                    handleRemoveFood(activeMeal, meal.recordId)
                  }
                  aria-label={`Remove ${meal.name} from ${tabLabel[activeMeal]}`}
                >
                  −
                </button>
              </div>
            ))
          )}
        </div>

        <div className={style.mealTotal}>
          <span>Total for {tabLabel[activeMeal]}:</span>
          <span className={style.mealTotalValue}>
            {activeMealTotal} kcal
          </span>
        </div>
      </div>
    </div>
  );
};

export default MealPicker;
