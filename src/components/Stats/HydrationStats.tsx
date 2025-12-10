import { useState, useEffect } from 'react';
import ChangeGoalModal from './ChangeGoalModal';
import styles from './Stats.module.css';
import { useTranslation } from 'react-i18next';

interface HydrationStatsData {
  waterGoal: number;
  currentIntake: number;
}

interface HydrationStatsProps {
  data?: HydrationStatsData;
  onChangeGoal?: (newGoalMl: number) => void;
}

const HydrationStats = ({ data, onChangeGoal }: HydrationStatsProps) => {
  const [hydrationData, setHydrationData] = useState<HydrationStatsData>({
    waterGoal: 2000,
    currentIntake: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      setHydrationData(data);
    }
  }, [data]);

  const goalInMl = hydrationData.waterGoal;

  const handleSaveGoal = (newGoal: number) => {
    onChangeGoal?.(newGoal);
    setHydrationData(prev => ({ ...prev, waterGoal: newGoal }));
    setShowModal(false);
  };

  return (
    <div className={styles.hydrationStatsCard}>
      <span className={styles.hydrationStatsLabel}>{t('hydrationStats.waterGoal')}</span>
      <span className={styles.hydrationStatsValue}>{goalInMl} ml</span>
      <button
        onClick={() => setShowModal(true)}
        className={styles.hydrationChangeButton}
      >
        {t('hydrationStats.change')}
      </button>

      <ChangeGoalModal
        isOpen={showModal}
        currentGoal={goalInMl}
        onClose={() => setShowModal(false)}
        onSave={handleSaveGoal}
      />
    </div>
  );
};

export default HydrationStats;
