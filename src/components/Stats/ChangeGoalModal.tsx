import { useState } from 'react';
import { Droplets } from 'lucide-react';
import styles from './ChangeGoalModal.module.css';

interface ChangeGoalModalProps {
  isOpen: boolean;
  currentGoal: number;
  onClose: () => void;
  onSave: (newGoal: number) => void;
}

const GLASS_SIZE = 250; // ml per glass

const RECOMMENDED_GOALS = [
  { ml: 1500, label: 'Light activity' },
  { ml: 2000, label: 'Recommended' },
  { ml: 2500, label: 'Active Lifestyle' },
  { ml: 3000, label: 'High Intensity' },
];

const ChangeGoalModal = ({ isOpen, currentGoal, onClose, onSave }: ChangeGoalModalProps) => {
  const [customVal, setCustomVal] = useState('');

  if (!isOpen) return null;

  //calculate the selected goal value  prioritize custom input if numeric, else current goal
  const getSelectedGoal = (): number => {
    const parsed = parseInt(customVal.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
    return currentGoal;
  };

  const selectedGoal = getSelectedGoal();
  const glassCount = Math.ceil(selectedGoal / GLASS_SIZE);

  const handleSave = () => {
    if (selectedGoal > 0) {
      onSave(selectedGoal);
      setCustomVal('');
    }
  };

  const handleClose = () => {
    setCustomVal('');
    onClose();
  };

  const handleRecommendedClick = (ml: number) => {
    setCustomVal(String(ml));
  };

  return (
    <div className={styles.overlay}>
      
      <div className={styles.backdrop} onClick={handleClose} />

      
      <div className={styles.modal}>
       
        <div className={styles.selectedGoalSection}>
          <div className={styles.selectedGoalHeader}>
            <Droplets size={20} color="#0096FF" />
            <span className={styles.selectedGoalTitle}>Selected goal</span>
          </div>
          <div className={styles.selectedGoalContent}>
            <div className={styles.goalBadge}>
              {selectedGoal} ml
            </div>
            <div className={styles.glassInfo}>
              {glassCount} glasses x {GLASS_SIZE} ml
            </div>
          </div>
        </div>

       
        <div className={styles.sectionTitle}>Recommended goals</div>
        <div className={styles.recommendedGrid}>
          {RECOMMENDED_GOALS.map(r => (
            <button
              key={r.ml}
              className={styles.recommendedButton}
              onClick={() => handleRecommendedClick(r.ml)}
            >
              <span className={styles.recommendedValue}>{r.ml} ml</span>
              <span className={styles.recommendedLabel}>{r.label}</span>
            </button>
          ))}
        </div>

        
        <div className={styles.sectionTitle}>Custom goal</div>
        <div className={styles.customInputRow}>
          <input
            type="text"
            inputMode="numeric"
            value={customVal}
            onChange={e => setCustomVal(e.target.value)}
            className={styles.customInput}
            placeholder="Enter custom amount"
          />
          <div className={styles.mlBadge}>ml</div>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.cancelButton} onClick={handleClose}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeGoalModal;
