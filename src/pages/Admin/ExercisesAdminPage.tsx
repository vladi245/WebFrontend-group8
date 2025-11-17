import React, { useState, useMemo } from 'react';
import Navbar from '../../components/NavbarVertical/Navbar';
import styles from './ExercisesAdminPage.module.css';
import { Trash2, PlusCircle } from 'lucide-react';

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  muscleGroups: string[];
}

export default function ExercisesAdminPage() {
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: 1, name: 'Leg Press', sets: 3, reps: 15, muscleGroups: ['Glutes', 'Hamstrings', 'Quadriceps'] },
    { id: 2, name: 'Bench Press', sets: 4, reps: 10, muscleGroups: ['Chest', 'Triceps', 'Shoulders'] },
    { id: 3, name: 'Deadlift', sets: 3, reps: 8, muscleGroups: ['Back', 'Hamstrings', 'Glutes'] },
    { id: 4, name: 'Squats', sets: 4, reps: 12, muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'] },
    { id: 5, name: 'Pull-ups', sets: 3, reps: 10, muscleGroups: ['Back', 'Biceps', 'Shoulders'] }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    muscleGroups: ''
  });

  const filteredExercises = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return exercises;
    return exercises.filter(ex => ex.name.toLowerCase().includes(q));
  }, [exercises, searchTerm]);

  const deleteExercise = (id: number) => {
    if (confirm('Remove this exercise?')) {
      setExercises(prev => prev.filter(ex => ex.id !== id));
    }
  };

  const addExercise = () => {
    if (!newExercise.name || !newExercise.sets || !newExercise.reps) return;

    const newEx: Exercise = {
      id: Date.now(),
      name: newExercise.name,
      sets: Number(newExercise.sets),
      reps: Number(newExercise.reps),
      muscleGroups: newExercise.muscleGroups
        .split(',')
        .map(m => m.trim())
        .filter(m => m !== '')
    };

    setExercises(prev => [...prev, newEx]);
    setNewExercise({ name: '', sets: '', reps: '', muscleGroups: '' });
  };

  return (
    <>
      <Navbar />

      <div className={styles.page}>
        <h1 className={styles.title}>Admin — Exercises</h1>

        {/* Add New Exercise */}
        <div className={styles.addCard}>
          <h2 className={styles.sectionTitle}>Add Exercise</h2>

          <div className={styles.formGrid}>
            <input
              className={styles.input}
              placeholder="Name"
              value={newExercise.name}
              onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
            />
            <input
              className={styles.input}
              placeholder="Sets"
              type="number"
              value={newExercise.sets}
              onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
            />
            <input
              className={styles.input}
              placeholder="Reps"
              type="number"
              value={newExercise.reps}
              onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
            />
            <input
              className={styles.input}
              placeholder="Muscle groups (comma separated)"
              value={newExercise.muscleGroups}
              onChange={(e) => setNewExercise({ ...newExercise, muscleGroups: e.target.value })}
            />
          </div>

          <button className={styles.addBtn} onClick={addExercise}>
            <PlusCircle className={styles.addIcon} /> Add Exercise
          </button>
        </div>

        {/* Search */}
        <div className={styles.searchWrap}>
          <input
            className={styles.searchInput}
            placeholder="Search exercise by name…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Exercise List */}
        <div className={styles.listWrap}>
          {filteredExercises.length === 0 ? (
            <p className={styles.noResults}>No exercises found.</p>
          ) : (
            filteredExercises.map(ex => (
              <div key={ex.id} className={styles.exerciseCard}>
                <div>
                  <h3 className={styles.exerciseName}>{ex.name}</h3>
                  <p className={styles.exerciseDetails}>{ex.sets} sets × {ex.reps} reps</p>
                  <div className={styles.tags}>
                    {ex.muscleGroups.map((m, i) => (
                      <span key={i} className={styles.tag}>{m}</span>
                    ))}
                  </div>
                </div>

                <button className={styles.deleteBtn} onClick={() => deleteExercise(ex.id)}>
                  <Trash2 className={styles.delIcon} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );

}