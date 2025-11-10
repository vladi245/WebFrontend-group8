import { useState, useMemo } from 'react';
import style from './Exercises.module.css';

interface Exercise {
    id: number;
    name: string;
    sets: number;
    reps: number;
    muscleGroups: string[];
}

const Exercises = () => {
    // mock data
    const [availableExercises, setAvailableExercises] = useState<Exercise[]>([
        { id: 1, name: 'Leg Press', sets: 3, reps: 15, muscleGroups: ['Glutes', 'Hamstrings', 'Quadriceps'] },
        { id: 2, name: 'Bench Press', sets: 4, reps: 10, muscleGroups: ['Chest', 'Triceps', 'Shoulders'] },
        { id: 3, name: 'Deadlift', sets: 3, reps: 8, muscleGroups: ['Back', 'Hamstrings', 'Glutes'] },
        { id: 4, name: 'Squats', sets: 4, reps: 12, muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'] },
        { id: 5, name: 'Pull-ups', sets: 3, reps: 10, muscleGroups: ['Back', 'Biceps', 'Shoulders'] },
        { id: 6, name: 'Shoulder Press', sets: 3, reps: 12, muscleGroups: ['Shoulders', 'Triceps'] },
        { id: 7, name: 'Bicep Curls', sets: 3, reps: 15, muscleGroups: ['Biceps'] },
        { id: 8, name: 'Tricep Dips', sets: 3, reps: 12, muscleGroups: ['Triceps', 'Chest'] },
    ]);

    const [completedExercises, setCompletedExercises] = useState<Exercise[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Filtered list derived from available exercises and the search term
    const filteredAvailable = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        if (!q) return availableExercises;
        return availableExercises.filter((ex) => ex.name.toLowerCase().includes(q));
    }, [availableExercises, searchTerm]);

    const addToCompleted = (exercise: Exercise) => {
        setCompletedExercises([...completedExercises, exercise]);
        setAvailableExercises(availableExercises.filter(ex => ex.id !== exercise.id));
    };

    const removeFromCompleted = (exercise: Exercise) => {
        setAvailableExercises([...availableExercises, exercise]);
        setCompletedExercises(completedExercises.filter(ex => ex.id !== exercise.id));
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
                    {completedExercises.map((exercise) => (
                        <div key={exercise.id} className={style.exerciseCard}>
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