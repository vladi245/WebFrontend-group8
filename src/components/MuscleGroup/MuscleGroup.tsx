import { useMemo } from 'react';
import style from './MuscleGroup.module.css';

// Muscle groups that can be targeted
type MuscleGroupName =
    | 'Chest'
    | 'Back'
    | 'Shoulders'
    | 'Biceps'
    | 'Triceps'
    | 'Forearms'
    | 'Abs'
    | 'Obliques'
    | 'Quadriceps'
    | 'Hamstrings'
    | 'Glutes'
    | 'Calves'
    | 'Traps'
    | 'Lats';

// Aliases for muscle group names (handles variations in naming for other exercises inthe future)
const muscleAliases: Record<string, MuscleGroupName> = {
    'chest': 'Chest',
    'pectorals': 'Chest',
    'pecs': 'Chest',
    'back': 'Back',
    'upper back': 'Back',
    'lower back': 'Back',
    'shoulders': 'Shoulders',
    'delts': 'Shoulders',
    'deltoids': 'Shoulders',
    'biceps': 'Biceps',
    'bicep': 'Biceps',
    'triceps': 'Triceps',
    'tricep': 'Triceps',
    'forearms': 'Forearms',
    'forearm': 'Forearms',
    'abs': 'Abs',
    'abdominals': 'Abs',
    'core': 'Abs',
    'obliques': 'Obliques',
    'quadriceps': 'Quadriceps',
    'quads': 'Quadriceps',
    'hamstrings': 'Hamstrings',
    'hamstring': 'Hamstrings',
    'glutes': 'Glutes',
    'gluteus': 'Glutes',
    'buttocks': 'Glutes',
    'calves': 'Calves',
    'calf': 'Calves',
    'traps': 'Traps',
    'trapezius': 'Traps',
    'lats': 'Lats',
    'latissimus': 'Lats',
};

interface CompletedExercise {
    muscle_group?: string[];
    muscleGroups?: string[];
}

interface MuscleGroupProps {
    completedExercises?: CompletedExercise[];
}

// Color scale: transparent -> green -> yellow -> orange -> red
const getIntensityColor = (intensity: number): string => {
    if (intensity === 0) return 'rgba(100, 100, 100, 0.2)';
    if (intensity <= 1) return '#22c55e';
    if (intensity <= 2) return '#84cc16';
    if (intensity <= 3) return '#eab308';
    if (intensity <= 4) return '#f97316';
    return '#ef4444';
};

const MuscleGroup = ({ completedExercises = [] }: MuscleGroupProps) => {
    // Calculate muscle activation based on completed exercises
    const muscleActivation = useMemo(() => {
        const activation: Record<MuscleGroupName, number> = {
            Chest: 0,
            Back: 0,
            Shoulders: 0,
            Biceps: 0,
            Triceps: 0,
            Forearms: 0,
            Abs: 0,
            Obliques: 0,
            Quadriceps: 0,
            Hamstrings: 0,
            Glutes: 0,
            Calves: 0,
            Traps: 0,
            Lats: 0,
        };

        completedExercises.forEach(exercise => {
            const muscles = exercise.muscle_group || exercise.muscleGroups || [];
            muscles.forEach(muscle => {
                const normalizedMuscle = muscleAliases[muscle.toLowerCase()];
                if (normalizedMuscle && normalizedMuscle in activation) {
                    activation[normalizedMuscle] += 1;
                }
            });
        });

        return activation;
    }, [completedExercises]);

    // SVG paths for front view muscles
    const frontMuscles = {
        // Traps (front visible part - neck area) - centered
        Traps: (
            <path
                key="front-traps"
                d="M 140 72 Q 160 65 180 72 L 185 90 Q 160 84 135 90 Z"
                fill={getIntensityColor(muscleActivation.Traps)}
                className={style.musclePath}
            />
        ),
        // Shoulders 
        ShoulderLeft: (
            <path
                key="front-shoulder-left"
                d="M 95 80 Q 82 85 80 100 Q 82 115 92 120 L 108 112 Q 112 100 108 88 Z"
                fill={getIntensityColor(muscleActivation.Shoulders)}
                className={style.musclePath}
            />
        ),
        // Shoulders
        ShoulderRight: (
            <path
                key="front-shoulder-right"
                d="M 225 80 Q 238 85 240 100 Q 238 115 228 120 L 212 112 Q 208 100 212 88 Z"
                fill={getIntensityColor(muscleActivation.Shoulders)}
                className={style.musclePath}
            />
        ),
        // Chest - Left Pec
        ChestLeft: (
            <path
                key="front-chest-left"
                d="M 122 95 L 155 95 L 155 130 Q 140 142 122 130 Q 115 118 118 105 Z"
                fill={getIntensityColor(muscleActivation.Chest)}
                className={style.musclePath}
            />
        ),
        // Chest - Right Pec (mirror of left)
        ChestRight: (
            <path
                key="front-chest-right"
                d="M 165 95 L 198 95 Q 205 105 198 130 Q 180 142 165 130 L 165 95 Z"
                fill={getIntensityColor(muscleActivation.Chest)}
                className={style.musclePath}
            />
        ),
        // Biceps - Left
        BicepsLeft: (
            <path
                key="front-biceps-left"
                d="M 50 90 L 78 90 L 78 110 Q 68 120 50 110 Q 44 102 47 96 Z"
                fill={getIntensityColor(muscleActivation.Biceps)}
                className={style.musclePath}
            />
        ),
        // Biceps - Right (mirror of left)
        BicepsRight: (
            <path
                key="front-biceps-right"
                d="M 242 90 L 270 90 Q 276 96 270 110 Q 252 120 242 110 L 242 90 Z"
                fill={getIntensityColor(muscleActivation.Biceps)}
                className={style.musclePath}
            />
        ),
        // Forearms - Left
        ForearmsLeft: (
            <path
                key="front-forearms-left"
                d="M 10 90 L 40 90 L 40 108 Q 28 118 10 108 Q 5 100 8 94 Z"
                fill={getIntensityColor(muscleActivation.Forearms)}
                className={style.musclePath}
            />
        ),
        // Forearms - Right (mirror of left)
        ForearmsRight: (
            <path
                key="front-forearms-right"
                d="M 280 90 L 310 90 Q 315 94 310 108 Q 292 118 280 108 L 280 90 Z"
                fill={getIntensityColor(muscleActivation.Forearms)}
                className={style.musclePath}
            />
        ),
        // Abs  - centered
        Abs: (
            <path
                key="front-abs"
                d="M 145 145 L 175 145 L 175 218 Q 160 230 145 218 Z"
                fill={getIntensityColor(muscleActivation.Abs)}
                className={style.musclePath}
            />
        ),
        // Obliques - Left
        ObliquesLeft: (
            <path
                key="front-obliques-left"
                d="M 122 145 L 140 145 L 140 218 Q 128 225 122 208 Q 118 185 120 165 Z"
                fill={getIntensityColor(muscleActivation.Obliques)}
                className={style.musclePath}
            />
        ),
        // Obliques - Right (mirror of left)
        ObliquesRight: (
            <path
                key="front-obliques-right"
                d="M 180 145 L 198 145 Q 200 165 198 185 Q 192 225 180 218 L 180 145 Z"
                fill={getIntensityColor(muscleActivation.Obliques)}
                className={style.musclePath}
            />
        ),
        // Quadriceps - Left (spread out)
        QuadricepsLeft: (
            <path
                key="front-quads-left"
                d="M 115 248 Q 95 305 85 365 Q 78 425 88 455 L 120 455 Q 135 425 135 365 Q 130 305 120 248 Z"
                fill={getIntensityColor(muscleActivation.Quadriceps)}
                className={style.musclePath}
            />
        ),
        // Quadriceps - Right (mirror of left)
        QuadricepsRight: (
            <path
                key="front-quads-right"
                d="M 205 248 Q 225 305 235 365 Q 242 425 232 455 L 200 455 Q 185 425 185 365 Q 190 305 200 248 Z"
                fill={getIntensityColor(muscleActivation.Quadriceps)}
                className={style.musclePath}
            />
        ),
        // Calves - Front Left
        CalvesLeft: (
            <path
                key="front-calves-left"
                d="M 78 470 Q 65 505 62 540 Q 65 570 78 590 L 110 590 Q 125 570 128 540 Q 125 505 112 470 Z"
                fill={getIntensityColor(muscleActivation.Calves)}
                className={style.musclePath}
            />
        ),
        // Calves - Front Right
        CalvesRight: (
            <path
                key="front-calves-right"
                d="M 242 470 Q 255 505 258 540 Q 255 570 242 590 L 210 590 Q 195 570 192 540 Q 195 505 208 470 Z"
                fill={getIntensityColor(muscleActivation.Calves)}
                className={style.musclePath}
            />
        ),
    };

    // SVG paths for back view muscles
    const backMuscles = {
        // Traps - centered
        Traps: (
            <path
                key="back-traps"
                d="M 130 70 Q 160 58 190 70 L 205 115 Q 160 105 115 115 Z"
                fill={getIntensityColor(muscleActivation.Traps)}
                className={style.musclePath}
            />
        ),
        // Rear Deltoids - Left
        ShoulderLeft: (
            <path
                key="back-shoulder-left"
                d="M 95 80 Q 80 88 80 102 Q 82 118 92 125 L 108 118 Q 112 102 108 88 Z"
                fill={getIntensityColor(muscleActivation.Shoulders)}
                className={style.musclePath}
            />
        ),
        // Rear Deltoids - Right (mirror of left)
        ShoulderRight: (
            <path
                key="back-shoulder-right"
                d="M 225 80 Q 240 88 240 102 Q 238 118 228 125 L 212 118 Q 208 102 212 88 Z"
                fill={getIntensityColor(muscleActivation.Shoulders)}
                className={style.musclePath}
            />
        ),
        // Lats - Left
        LatsLeft: (
            <path
                key="back-lats-left"
                d="M 120 120 L 155 120 L 155 178 Q 140 195 120 180 Q 110 160 115 140 Z"
                fill={getIntensityColor(muscleActivation.Lats)}
                className={style.musclePath}
            />
        ),
        // Lats - Right (mirror of left)
        LatsRight: (
            <path
                key="back-lats-right"
                d="M 165 120 L 200 120 Q 210 140 200 180 Q 180 195 165 178 L 165 120 Z"
                fill={getIntensityColor(muscleActivation.Lats)}
                className={style.musclePath}
            />
        ),
        // Lower Back - centered
        Back: (
            <path
                key="back-lower"
                d="M 140 185 L 180 185 L 185 222 Q 160 235 135 222 Z"
                fill={getIntensityColor(muscleActivation.Back)}
                className={style.musclePath}
            />
        ),
        // Triceps - Left
        TricepsLeft: (
            <path
                key="back-triceps-left"
                d="M 50 90 L 78 90 L 78 115 Q 68 125 50 115 Q 44 105 47 97 Z"
                fill={getIntensityColor(muscleActivation.Triceps)}
                className={style.musclePath}
            />
        ),
        // Triceps - Right (mirror of left)
        TricepsRight: (
            <path
                key="back-triceps-right"
                d="M 242 90 L 270 90 Q 276 97 270 115 Q 252 125 242 115 L 242 90 Z"
                fill={getIntensityColor(muscleActivation.Triceps)}
                className={style.musclePath}
            />
        ),
        // Forearms - Left
        ForearmsLeft: (
            <path
                key="back-forearms-left"
                d="M 10 90 L 40 90 L 40 112 Q 28 122 10 112 Q 5 104 8 96 Z"
                fill={getIntensityColor(muscleActivation.Forearms)}
                className={style.musclePath}
            />
        ),
        // Forearms - Right (mirror of left)
        ForearmsRight: (
            <path
                key="back-forearms-right"
                d="M 280 90 L 310 90 Q 315 96 310 112 Q 292 122 280 112 L 280 90 Z"
                fill={getIntensityColor(muscleActivation.Forearms)}
                className={style.musclePath}
            />
        ),
        // Glutes - Left
        GlutesLeft: (
            <path
                key="back-glutes-left"
                d="M 105 230 Q 92 245 88 265 Q 90 287 105 295 L 135 287 Q 140 270 138 252 Q 135 238 128 230 Z"
                fill={getIntensityColor(muscleActivation.Glutes)}
                className={style.musclePath}
            />
        ),
        // Glutes - Right (mirror of left)
        GlutesRight: (
            <path
                key="back-glutes-right"
                d="M 192 230 Q 185 238 182 252 Q 180 270 185 287 L 215 295 Q 230 287 232 265 Q 228 245 215 230 Z"
                fill={getIntensityColor(muscleActivation.Glutes)}
                className={style.musclePath}
            />
        ),
        // Hamstrings - Left
        HamstringsLeft: (
            <path
                key="back-hamstrings-left"
                d="M 95 305 Q 82 345 78 385 Q 78 425 88 450 L 120 450 Q 135 425 135 385 Q 130 345 120 305 Z"
                fill={getIntensityColor(muscleActivation.Hamstrings)}
                className={style.musclePath}
            />
        ),
        // Hamstrings - Right (mirror of left)
        HamstringsRight: (
            <path
                key="back-hamstrings-right"
                d="M 200 305 Q 190 345 185 385 Q 185 425 200 450 L 232 450 Q 242 425 242 385 Q 238 345 225 305 Z"
                fill={getIntensityColor(muscleActivation.Hamstrings)}
                className={style.musclePath}
            />
        ),
        // Calves - Back Left
        CalvesLeft: (
            <path
                key="back-calves-left"
                d="M 78 465 Q 65 498 62 532 Q 65 565 78 585 L 110 585 Q 125 565 128 532 Q 125 498 112 465 Z"
                fill={getIntensityColor(muscleActivation.Calves)}
                className={style.musclePath}
            />
        ),
        // Calves - Back Right (mirror of left)
        CalvesRight: (
            <path
                key="back-calves-right"
                d="M 208 465 Q 195 498 192 532 Q 195 565 210 585 L 242 585 Q 255 565 258 532 Q 255 498 242 465 Z"
                fill={getIntensityColor(muscleActivation.Calves)}
                className={style.musclePath}
            />
        ),
    };

    // Legend data
    const legendItems = [
        { color: 'rgba(100, 100, 100, 0.2)', label: 'Not targeted', border: true },
        { color: '#22c55e', label: 'Light (1x)' },
        { color: '#84cc16', label: 'Moderate (2x)' },
        { color: '#eab308', label: 'Active (3x)' },
        { color: '#f97316', label: 'Intense (4x)' },
        { color: '#ef4444', label: 'Maximum (5x+)' },
    ];

    // Active muscles summary
    const activeMuscles = Object.entries(muscleActivation)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);

    return (
        <div className={style.muscleGroupContainer}>
            <div className={style.header}>
                <h2 className={style.title}>Muscle Group Targeting</h2>
                <p className={style.subtitle}>Visual representation of muscle activation from your workout</p>
            </div>

            <div className={style.diagramWrapper}>
                {/* Front View */}
                <div className={style.viewContainer}>
                    <h3 className={style.viewTitle}>Front View</h3>
                    <svg
                        viewBox="0 0 320 600"
                        className={style.bodyDiagram}
                        aria-label="Front view of human body muscle diagram"
                    >
                        {/* Body outline - Front T-pose */}
                        <ellipse cx="160" cy="32" rx="28" ry="32" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />
                        {/* Neck */}
                        <rect x="150" y="60" width="20" height="15" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                        {/* Torso */}
                        <path
                            d="M 118 75 L 118 235 L 105 235 L 55 590 L 118 590 L 140 450 L 160 290 L 180 450 L 202 590 L 265 590 L 215 235 L 202 235 L 202 75 Z"
                            fill="#1a1a1a"
                            stroke="#333"
                            strokeWidth="1.5"
                        />
                        {/* Left Arm */}
                        <path
                            d="M 118 75 L 118 120 L 5 120 L 5 85 L 118 85"
                            fill="#1a1a1a"
                            stroke="#333"
                            strokeWidth="1.5"
                        />
                        {/* Right Arm */}
                        <path
                            d="M 202 75 L 202 120 L 315 120 L 315 85 L 202 85"
                            fill="#1a1a1a"
                            stroke="#333"
                            strokeWidth="1.5"
                        />

                        {/* Render front muscles */}
                        {Object.values(frontMuscles)}
                    </svg>
                </div>

                {/* Back View */}
                <div className={style.viewContainer}>
                    <h3 className={style.viewTitle}>Back View</h3>
                    <svg
                        viewBox="0 0 320 600"
                        className={style.bodyDiagram}
                        aria-label="Back view of human body muscle diagram"
                    >
                        {/* Body outline - Back T-pose*/}
                        <ellipse cx="160" cy="32" rx="28" ry="32" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />
                        {/* Neck */}
                        <rect x="150" y="60" width="20" height="15" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                        {/* Torso */}
                        <path
                            d="M 118 75 L 118 290 L 95 290 L 55 590 L 118 590 L 140 450 L 160 290 L 180 450 L 202 590 L 265 590 L 225 290 L 202 290 L 202 75 Z"
                            fill="#1a1a1a"
                            stroke="#333"
                            strokeWidth="1.5"
                        />
                        {/* Left Arm */}
                        <path
                            d="M 118 75 L 118 125 L 5 125 L 5 85 L 118 85"
                            fill="#1a1a1a"
                            stroke="#333"
                            strokeWidth="1.5"
                        />
                        {/* Right Arm */}
                        <path
                            d="M 202 75 L 202 125 L 315 125 L 315 85 L 202 85"
                            fill="#1a1a1a"
                            stroke="#333"
                            strokeWidth="1.5"
                        />

                        {/* Render back muscles */}
                        {Object.values(backMuscles)}
                    </svg>
                </div>
            </div>

            {/* Legend */}
            <div className={style.legend}>
                <h4 className={style.legendTitle}>Intensity Scale</h4>
                <div className={style.legendItems}>
                    {legendItems.map((item, index) => (
                        <div key={index} className={style.legendItem}>
                            <span
                                className={`${style.legendColor} ${item.border ? style.legendColorBordered : ''}`}
                                style={{
                                    backgroundColor: item.color
                                }}
                            />
                            <span className={style.legendLabel}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Muscles Summary */}
            {activeMuscles.length > 0 && (
                <div className={style.summary}>
                    <h4 className={style.summaryTitle}>Active Muscle Groups</h4>
                    <div className={style.muscleChips}>
                        {activeMuscles.map(([muscle, count]) => (
                            <div
                                key={muscle}
                                className={style.muscleChip}
                                style={{
                                    backgroundColor: getIntensityColor(count),
                                    color: count <= 2 ? '#000' : '#fff'
                                }}
                            >
                                <span className={style.muscleName}>{muscle}</span>
                                <span className={style.muscleCount}>{count}x</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeMuscles.length === 0 && (
                <div className={style.emptyState}>
                    <p>Complete exercises to see your muscle activation map!</p>
                </div>
            )}
        </div>
    );
};

export default MuscleGroup;