import { Plus, Minus, RotateCcw } from 'lucide-react';
import styles from './HydrationQuickAdd.module.css';

interface HydrationQuickAddProps {
  onAdd?: (amountMl: number) => void;
  onRemove?: (amountMl: number) => void;
  onReset?: () => void;
}

const HydrationQuickAdd = ({
  onAdd,
  onRemove,
  onReset,
}: HydrationQuickAddProps) => {
  const amounts = [250, 500, 750, 1000];

  const handleAdd = (amount: number) => {
    onAdd?.(amount);
  };

  const handleRemove = () => {
    onRemove?.(250);
  };

  const handleReset = () => {
    onReset?.();
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>Quick Add</span>
      </div>

      <div className={styles.grid}>
        {/* Top row: 4 equal buttons */}
        {amounts.map((amount) => (
          <button
            key={amount}
            type="button"
            className={styles.quickButton}
            onClick={() => handleAdd(amount)}
          >
            <Plus className={styles.icon} />
            <span>{amount} ml</span>
          </button>
        ))}

        {/* Bottom row: long remove button (3 cols) */}
        <button
          type="button"
          className={`${styles.actionButton} ${styles.removeButton}`}
          onClick={handleRemove}
        >
          <Minus className={styles.icon} />
          <span>Remove 250 ml</span>
        </button>

        {/* Bottom row: small reset button (1 col) */}
        <button
          type="button"
          className={`${styles.actionButton} ${styles.resetButton}`}
          onClick={handleReset}
        >
          <RotateCcw className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default HydrationQuickAdd;
