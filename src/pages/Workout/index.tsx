import Logo from '../../components/Logo/Logo'
import style from './Workout.module.css'
import Stats from '../../components/Stats/Stats'
import Performance from '../../components/Performance/Performance'
import Exercises from '../../components/Exercises/Exercises'
import MuscleGroup from '../../components/MuscleGroup/MuscleGroup'

export default function Workout() {
    return (
        <div className={style.container}>
            <Logo />
            <Stats />
            <Performance />
            <Exercises />
            <MuscleGroup />
        </div>
    );
}