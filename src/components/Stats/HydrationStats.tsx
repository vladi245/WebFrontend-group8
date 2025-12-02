import { useState, useEffect } from 'react';
import StatCard from './StatCard';
import ChangeGoalModal from './ChangeGoalModal';

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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem 1.5rem',
      border: '1px solid #0096FF',
      borderRadius: '12px',
      backgroundColor: '#0D0D0D',
      minWidth: '200px',
    }}>
      <span style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Water Goal</span>
      <span style={{ color: 'white', fontSize: '2rem', fontWeight: 600 }}>{goalInMl} ml</span>
      <button
        onClick={() => setShowModal(true)}
        style={{
          marginTop: '0.75rem',
          background: '#333',
          border: '1px solid #555',
          color: 'white',
          padding: '8px 24px',
          borderRadius: 20,
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: 500,
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = '#444'}
        onMouseOut={(e) => e.currentTarget.style.background = '#333'}
      >
        Change
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
