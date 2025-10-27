import style from './MuscleGroup.module.css'

const MuscleGroup = () => {
    return (
        <div className={style.muscleGroupContainer}>
            <div className={style.header}>
                <h2 className={style.title}>Muscle Group Targeting</h2>
                <p className={style.subtitle}>Visual representation of muscle activation from your workout</p>
            </div>
        </div>
    );
};

export default MuscleGroup;