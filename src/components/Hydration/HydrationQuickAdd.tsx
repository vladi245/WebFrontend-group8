import { Plus, Minus, RotateCcw } from 'lucide-react';
import styles from './HydrationQuickAdd.module.css';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        <span className={styles.title}>{t('hydrationQuickAdd.quickAdd')}</span>
      </div>

      <div className={styles.grid}>

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


        <button
          type="button"
          className={`${styles.actionButton} ${styles.removeButton}`}
          onClick={handleRemove}
        >
          <Minus className={styles.icon} />
          <span>Remove 250 ml</span>
        </button>


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
