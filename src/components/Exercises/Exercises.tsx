import { useState } from 'react';
import style from './Exercises.module.css';

interface Exercise {
    id: number;
    name: string;
    sets: number;
    reps: number;
    muscleGroups: string[];
}

const Exercises = () => {
    // Mock data
    const [availableExercises, setAvailableExercises] = useState<Exercise[]>([
        { id: 1, name: 'Leg Press', sets: 3, reps: 15, muscleGroups: ['Glutes', 'Hamstrings', 'Quadriceps'] },
        { id: 2, name: 'Bench Press', sets: 4, reps: 10, muscleGroups: ['Chest', 'Triceps', 'Shoulders'] },
        { id: 3, name: 'Deadlift', sets: 3, reps: 8, muscleGroups: ['Back', 'Hamstrings', 'Glutes'] },
        { id: 4, name: 'Squats', sets: 4, reps: 12, muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'] },
        { id: 5, name: 'Pull-ups', sets: 3, reps: 10, muscleGroups: ['Back', 'Biceps', 'Shoulders'] },
    ]);

    const [completedExercises, setCompletedExercises] = useState<Exercise[]>([]);
    const [draggedExercise, setDraggedExercise] = useState<Exercise | null>(null);
    const [dragSource, setDragSource] = useState<'available' | 'completed' | null>(null);

    const handleDragStart = (exercise: Exercise, source: 'available' | 'completed') => {
        setDraggedExercise(exercise);
        setDragSource(source);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDropToCompleted = () => {
        if (draggedExercise && dragSource === 'available') {
            setCompletedExercises([...completedExercises, draggedExercise]);
            setAvailableExercises(availableExercises.filter(ex => ex.id !== draggedExercise.id));
        }
        setDraggedExercise(null);
        setDragSource(null);
    };

    const handleDropToAvailable = () => {
        if (draggedExercise && dragSource === 'completed') {
            setAvailableExercises([...availableExercises, draggedExercise]);
            setCompletedExercises(completedExercises.filter(ex => ex.id !== draggedExercise.id));
        }
        setDraggedExercise(null);
        setDragSource(null);
    };

    return (
        <div className={style.exercisesContainer}>
            <div className={style.exercisesSection}>
                <h2 className={style.sectionTitle}>Exercises</h2>
                <div
                    className={style.exerciseList}
                    onDragOver={handleDragOver}
                    onDrop={handleDropToAvailable}
                >
                    {availableExercises.map((exercise) => (
                        <div
                            key={exercise.id}
                            className={style.exerciseCard}
                            draggable
                            onDragStart={() => handleDragStart(exercise, 'available')}
                        >
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
                    ))}
                </div>
            </div>

            <div className={style.completedSection}>
                <h2 className={style.sectionTitle}>Exercises Done</h2>
                <div
                    className={style.exerciseList}
                    onDragOver={handleDragOver}
                    onDrop={handleDropToCompleted}
                >
                    {completedExercises.map((exercise) => (
                        <div
                            key={exercise.id}
                            className={style.exerciseCard}
                            draggable
                            onDragStart={() => handleDragStart(exercise, 'completed')}
                        >
                            <div className={style.exerciseInfo}>
                                <h3 className={style.exerciseName}>{exercise.name}</h3>
                                <p className={style.exerciseDetails}>
                                    {exercise.sets} sets x {exercise.reps} reps
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Exercises;