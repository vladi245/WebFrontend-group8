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

const Exercises = ({ onAdd, onRemove, initialCompleted = [] }: ExercisesProps) => {
    // availableExercises will be fetched from server; fallback to mock list if fetch fails
    const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);

    const fallbackMock: Exercise[] = [
        { id: 1, name: 'Leg Press', sets: 3, reps: 15, muscleGroups: ['Glutes', 'Hamstrings', 'Quadriceps'] },
        { id: 2, name: 'Bench Press', sets: 4, reps: 10, muscleGroups: ['Chest', 'Triceps', 'Shoulders'] },
        { id: 3, name: 'Deadlift', sets: 3, reps: 8, muscleGroups: ['Back', 'Hamstrings', 'Glutes'] },
        { id: 4, name: 'Squats', sets: 4, reps: 12, muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'] },
        { id: 5, name: 'Pull-ups', sets: 3, reps: 10, muscleGroups: ['Back', 'Biceps', 'Shoulders'] },
        { id: 6, name: 'Shoulder Press', sets: 3, reps: 12, muscleGroups: ['Shoulders', 'Triceps'] },
        { id: 7, name: 'Bicep Curls', sets: 3, reps: 15, muscleGroups: ['Biceps'] },
        { id: 8, name: 'Tricep Dips', sets: 3, reps: 12, muscleGroups: ['Triceps', 'Chest'] },
    ];

    // Fetch canonical exercises from backend
    useEffect(() => {
        let mounted = true;
        const fetchExercises = async () => {
            try {
                const list = await apiFetch('/api/exercises');
                if (!mounted) return;
                if (Array.isArray(list) && list.length > 0) {
                    const mapped = list.map((w: any) => {
                        let muscles: string[] = [];
                        if (Array.isArray(w.muscle_group)) muscles = w.muscle_group;
                        else if (typeof w.muscle_group === 'string') {
                            try {
                                const parsed = JSON.parse(w.muscle_group);
                                if (Array.isArray(parsed)) muscles = parsed.map(String);
                                else muscles = String(w.muscle_group).split(',').map((s: string) => s.trim()).filter(Boolean);
                            } catch (e) {
                                muscles = String(w.muscle_group).split(',').map((s: string) => s.trim()).filter(Boolean);
                            }
                        }

                        return {
                            id: w.id,
                            name: w.name || 'Unknown',
                            sets: typeof w.sets === 'number' ? w.sets : 0,
                            reps: typeof w.reps === 'number' ? w.reps : 0,
                            muscleGroups: muscles
                        } as Exercise;
                    });
                    setAvailableExercises(mapped);
                    return;
                }
            } catch (err) {
                console.warn('Could not fetch exercises from API, using fallback list', err);
            }

            // fallback
            if (mounted) setAvailableExercises(fallbackMock);
        };
        fetchExercises();
        return () => { mounted = false; };
    }, []);

    const [completedExercises, setCompletedExercises] = useState<Exercise[]>([]);
    // if backend provided initial completed records, map them to Exercise-like shape when mounting
    const [completedRecords, setCompletedRecords] = useState<CompletedRecord[]>(initialCompleted);
    // keep completedRecords in sync when parent passes new data
    useEffect(() => {
        // Only accept well-formed completed records (avoid undefined/empty entries)
        const sane = Array.isArray(initialCompleted)
            ? initialCompleted.filter(r => r && (r.record_id || r.record_id === 0) && (r.workout_id || r.workout_id === 0))
            : [];
        setCompletedRecords(sane);
    }, [initialCompleted]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Filtered list derived from available exercises and the search term
    const filteredAvailable = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        if (!q) return availableExercises;
        return availableExercises.filter((ex) => {
            try {
                const name = (ex && ex.name) ? String(ex.name).toLowerCase() : '';
                return name.includes(q);
            } catch (e) {
                return false;
            }
        });
    }, [availableExercises, searchTerm]);

    const addToCompleted = async (exercise: Exercise) => {
        if (!exercise || typeof exercise.id !== 'number') {
            console.warn('Attempted to add invalid exercise:', exercise);
            return;
        }
        // If parent provided an onAdd handler, call it and let parent update the UI from server response.
        if (onAdd) {
            try {
                await onAdd(exercise.id);
            } catch (err) {
                console.error('Failed to add via API', err);
            }
            return;
        }

        // No onAdd handler -> do local optimistic add
        setCompletedExercises(prev => {
            if (prev.some(e => e.id === exercise.id)) return prev;
            return [...prev, exercise];
        });

        setAvailableExercises(prev => prev.filter(ex => ex.id !== exercise.id));
    };

    const removeFromCompleted = (exercise: Exercise) => {
        if (!exercise || typeof exercise.id !== 'number') {
            console.warn('Attempted to remove invalid exercise:', exercise);
            return;
        }

        setAvailableExercises(prev => {
            // avoid duplicating available exercises
            if (prev.some(ex => ex.id === exercise.id)) return prev;
            return [...prev, exercise];
        });

        setCompletedExercises(prev => prev.filter(ex => ex.id !== exercise.id));

        // If backend provided remove handler, try to locate corresponding record_id to remove
        if (onRemove && completedRecords.length > 0) {
            const rec = completedRecords.find(r => r.workout_id === exercise.id);
            if (rec) {
                const result = onRemove(rec.record_id);
                if (result && typeof (result as any).catch === 'function') {
                    (result as Promise<void>).catch((e: unknown) => console.error('Failed to remove via API', e));
                }
            }
        }
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search exercises by name"
                        />
                    </div>

                    {filteredAvailable.length === 0 ? (
                        <p className={style.noResults}>No exercises match "{searchTerm}"</p>
                    ) : (
                        filteredAvailable.map((exercise) => (
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
                                    onClick={() => addToCompleted(exercise)}
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
                    {/* Render backend-provided completed records first (if any) */}
                    {completedRecords.map((rec) => (
                        <div key={`${rec.record_id}-${rec.timestamp || ''}`} className={style.exerciseCard}>
                            <div className={style.exerciseContent}>
                                <div className={style.exerciseInfo}>
                                    <h3 className={style.exerciseName}>{rec.name}</h3>
                                    <p className={style.exerciseDetails}>
                                        {rec.sets} sets x {rec.reps} reps
                                    </p>
                                </div>
                            </div>
                            <button
                                className={style.removeButton}
                                onClick={() => onRemove ? onRemove(rec.record_id) : undefined}
                                title="Remove from completed"
                            >
                                −
                            </button>
                        </div>
                    ))}

                    {/* Local completed items added during this session */}
                    {completedExercises.map((exercise) => (
                        <div key={`local-${exercise.id}`} className={style.exerciseCard}>
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
                                onClick={() => removeFromCompleted(exercise)}
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