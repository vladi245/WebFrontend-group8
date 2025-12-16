import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../../components/NavbarVerticalAdmin/Navbar';
import styles from './ExercisesAdminPage.module.css';
import { Trash2, PlusCircle } from 'lucide-react';
import { apiFetch } from '../../services/api';

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  muscleGroups: string[];
}

export default function ExercisesAdminPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newExercise, setNewExercise] = useState({ name: '', sets: '', reps: '', muscleGroups: '' });

  useEffect(() => {
    async function fetchExercises() {
      const res = await apiFetch('/admin/workouts');
      const data = await res.json();
      // Map workouts to Exercise interface
      setExercises(data.map((w: any) => ({
        id: w.id,
        name: w.name,
        sets: w.sets,
        reps: w.reps,
        muscleGroups: w.muscle_group || []
      })));
    }
    fetchExercises();
  }, []);

  const filteredExercises = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return exercises;
    return exercises.filter(ex => ex.name.toLowerCase().includes(q));
  }, [exercises, searchTerm]);

  const deleteExercise = async (id: number) => {
    if (!confirm('Remove this exercise?')) return;
    await apiFetch(`/admin/workouts/${id}`, { method: 'DELETE' });
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const addExercise = async () => {
    if (!newExercise.name || !newExercise.sets || !newExercise.reps) return;
    const body = {
      name: newExercise.name,
      sets: Number(newExercise.sets),
      reps: Number(newExercise.reps),
      muscle_group: newExercise.muscleGroups.split(',').map(m => m.trim()).filter(m => m)
    };
    const res = await apiFetch('/admin/workouts', {
      method: 'POST',
      body: JSON.stringify(body)
    });
    const created = await res.json();
    setExercises(prev => [...prev, {
      id: created.id,
      name: created.name,
      sets: created.sets,
      reps: created.reps,
      muscleGroups: created.muscle_group || []
    }]);
    setNewExercise({ name: '', sets: '', reps: '', muscleGroups: '' });
  };

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <h1 className={styles.title}>Admin — Exercises</h1>

        <div className={styles.addCard}>
          <h2 className={styles.sectionTitle}>Add Exercise</h2>
          <div className={styles.formGrid}>
            <input className={styles.input} placeholder="Name" value={newExercise.name} onChange={e => setNewExercise({ ...newExercise, name: e.target.value })} />
            <input className={styles.input} placeholder="Sets" type="number" value={newExercise.sets} onChange={e => setNewExercise({ ...newExercise, sets: e.target.value })} />
            <input className={styles.input} placeholder="Reps" type="number" value={newExercise.reps} onChange={e => setNewExercise({ ...newExercise, reps: e.target.value })} />
            <input className={styles.input} placeholder="Muscle groups (comma separated)" value={newExercise.muscleGroups} onChange={e => setNewExercise({ ...newExercise, muscleGroups: e.target.value })} />
          </div>
          <button className={styles.addBtn} onClick={addExercise}><PlusCircle className={styles.addIcon} /> Add Exercise</button>
        </div>

        <div className={styles.searchWrap}>
          <input className={styles.searchInput} placeholder="Search exercise by name…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>

        <div className={styles.listWrap}>
          {filteredExercises.length === 0 ? (
            <p className={styles.noResults}>No exercises found.</p>
          ) : (
            filteredExercises.map(ex => (
              <div key={ex.id} className={styles.exerciseCard}>
                <div>
                  <h3 className={styles.exerciseName}>{ex.name}</h3>
                  <p className={styles.exerciseDetails}>{ex.sets} sets × {ex.reps} reps</p>
                  <div className={styles.tags}>{ex.muscleGroups.map((m, i) => <span key={i} className={styles.tag}>{m}</span>)}</div>
                </div>
                <button className={styles.deleteBtn} onClick={() => deleteExercise(ex.id)}><Trash2 className={styles.delIcon} /></button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}