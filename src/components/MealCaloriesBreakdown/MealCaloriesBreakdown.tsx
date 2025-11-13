// src/components/MealCaloriesBreakdown/MealCaloriesBreakdown.tsx
import style from "./MealCaloriesBreakdown.module.css";

interface MealCalories {
  breakfast: number;
  lunch: number;
  dinner: number;
  snacks: number;
}

interface Props {
  mealCalories: MealCalories;
  totalCalories: number; //total eaten today
}

const MealCaloriesBreakdown = ({ mealCalories, totalCalories }: Props) => {
  const { breakfast, lunch, dinner, snacks } = mealCalories;

  const safeTotal = totalCalories > 0 ? totalCalories : 1; //avoid dividing by zero (thats why its 1)

  const segments = [
    { key: "Breakfast", value: breakfast, colorClass: style.breakfast },
    { key: "Lunch", value: lunch, colorClass: style.lunch },
    { key: "Dinner", value: dinner, colorClass: style.dinner },
    { key: "Snacks", value: snacks, colorClass: style.snacks },
  ];

  return (
    <div className={style.container}>
      <div className={style.header}>
        <span className={style.title}>Meal breakdown</span>
        <span className={style.totalLabel}>{totalCalories} kcal</span>
      </div>

      <div className={style.bar}>
        {segments.map(
          (seg) =>
            seg.value > 0 && (
              <div
                key={seg.key}
                className={`${style.segment} ${seg.colorClass}`}
                style={{
                  width: `${(seg.value / safeTotal) * 100}%`,
                }}
                title={`${seg.key}: ${seg.value} kcal`}
              />
            )
        )}
      </div>

      <div className={style.legend}>
        {segments.map((seg) => (
          <div key={seg.key} className={style.legendItem}>
            <span className={`${style.legendDot} ${seg.colorClass}`} />
            <span className={style.legendLabel}>
              {seg.key}: {seg.value} kcal
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealCaloriesBreakdown;
