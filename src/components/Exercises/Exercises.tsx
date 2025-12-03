import { useState, useMemo, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import style from './Exercises.module.css';

interface Exercise {
    id: number;
    name: string;
    sets: number;
    reps: number;
    muscleGroups: string[];
}

interface CompletedRecord {
    record_id: number;
    workout_id: number;
    name: string;
    calories_burned: number;
    sets: number;
    reps: number;
    muscle_group: string[];
    timestamp: string;
}


interface ExercisesProps {
    onAdd?: (workout_id: number) => Promise<void> | void;
    onRemove?: (record_id: number) => Promise<void> | void;
    initialCompleted?: CompletedRecord[];
}

const FALLBACK_EXERCISES: Exercise[] = [
    { id: 1, name: 'Leg Press', sets: 3, reps: 15, muscleGroups: ['Glutes', 'Hamstrings', 'Quadriceps'] },
    { id: 2, name: 'Bench Press', sets: 4, reps: 10, muscleGroups: ['Chest', 'Triceps', 'Shoulders'] },
    { id: 3, name: 'Deadlift', sets: 3, reps: 8, muscleGroups: ['Back', 'Hamstrings', 'Glutes'] },
    { id: 4, name: 'Squats', sets: 4, reps: 12, muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'] },
    { id: 5, name: 'Pull-ups', sets: 3, reps: 10, muscleGroups: ['Back', 'Biceps', 'Shoulders'] },
    { id: 6, name: 'Shoulder Press', sets: 3, reps: 12, muscleGroups: ['Shoulders', 'Triceps'] },
    { id: 7, name: 'Bicep Curls', sets: 3, reps: 15, muscleGroups: ['Biceps'] },
    { id: 8, name: 'Tricep Dips', sets: 3, reps: 12, muscleGroups: ['Triceps', 'Chest'] },
];

const normalizeWorkout = (w: any): Exercise => ({
    id: w.id,
    name: w.name ?? "Unknown",
    sets: Number(w.sets) || 0,
    reps: Number(w.reps) || 0,
    muscleGroups: Array.isArray(w.muscle_group)
        ? w.muscle_group
        : w.muscle_group ? JSON.parse(w.muscle_group) : []
});

const Exercises = ({ onAdd, onRemove, initialCompleted = [] }: ExercisesProps) => {
    // availableExercises will be fetched from server; fallback to mock list if fetch fails
    const [available, setAvailable] = useState<Exercise[]>([]);
    const [completedRecords, setCompletedRecords] = useState<CompletedRecord[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const clean = (initialCompleted ?? []).filter(
            r => r && typeof r.record_id === "number" && typeof r.workout_id === "number"
        );

        setCompletedRecords(clean);
    }, [initialCompleted]);

    useEffect(() => {
        let active = true;

        const load = async () => {
            try {
                const list = await apiFetch("/api/workouts/all");

                if (!active) return;

                if (Array.isArray(list) && list.length) {
                    setAvailable(list.map(normalizeWorkout));
                } else {
                    setAvailable(FALLBACK_EXERCISES);
                }
            } catch {
                if (active) setAvailable(FALLBACK_EXERCISES);
            }
        };

        load();
        return () => { active = false; };
    }, []);

    // Filtered list derived from search
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return q
            ? available.filter(ex => ex.name.toLowerCase().includes(q))
            : available;
    }, [available, search]);

    const handleAdd = async (ex: Exercise) => {
        if (!ex?.id) return;

        if (onAdd) {
            try { await onAdd(ex.id); }
            catch (err) { console.error("Add failed:", err); }
            return; // parent handles re-fetching
        }

    };

    const handleRemove = async (record: CompletedRecord) => {
        if (!record?.record_id) return;
        if (onRemove) {
            try { 
                await onRemove(record.record_id); 
            } catch (err) { 
                console.error("Remove failed:", err); 
            }
        }
        setCompletedRecords(prev => prev.filter(r => r.record_id !== record.record_id));
    };


    return (
        <div className={style.exercisesContainer}>
            <div className={style.exercisesSection}>
                <h2 className={style.sectionTitle}>Exercises</h2>
                <div className={style.exerciseList}>
                    <div className={style.searchContainer}>
                        <input
                            className={style.searchInput}
                            placeholder="Search exercises..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search exercises by name"
                        />
                    </div>

                    {filtered.length === 0 ? (
                        <p className={style.noResults}>No exercises match "{search}"</p>
                    ) : (
                        filtered.map((exercise) => (
                            <div key={exercise.id} className={style.exerciseCard}>
                                <div className={style.exerciseContent}>
                                    <div className={style.exerciseInfo}>
                                        <h3 className={style.exerciseName}>{exercise.name}</h3>
                                        <p className={style.exerciseDetails}>
                                            {exercise.sets} sets x {exercise.reps} reps
                                        </p>
                                    </div>
                                    {exercise.muscleGroups.length > 0 && (
                                        <div className={style.muscleTags}>
                                            {exercise.muscleGroups.map((muscle, index) => (
                                                <span key={index} className={style.muscleTag}>
                                                    {muscle}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button
                                    className={style.addButton}
                                    onClick={() => handleAdd(exercise)}
                                    title="Add to completed"
                                >
                                    +
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className={style.completedSection}>
                <h2 className={style.sectionTitle}>Exercises Done</h2>
                <div className={style.exerciseList}>
                    {completedRecords.map((exercise) => (
                    <div key={exercise.record_id} className={style.exerciseCard}>
                        <div className={style.exerciseContent}>
                        <div className={style.exerciseInfo}>
                            <h3 className={style.exerciseName}>{exercise.name}</h3>
                            <p className={style.exerciseDetails}>
                            {exercise.sets} sets x {exercise.reps} reps
                            </p>
                        </div>
                        </div>
                        <button
                        className={style.removeButton}
                        onClick={() => handleRemove(exercise)}
                        title="Remove from completed"
                        >
                        −
                        </button>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Exercises;