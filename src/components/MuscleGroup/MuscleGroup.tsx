import style from './MuscleGroup.module.css'
import { useTranslation } from 'react-i18next';

const MuscleGroup = () => {
    const { t } = useTranslation();
    return (
        <div className={style.muscleGroupContainer}>
            <div className={style.header}>
                <h2 className={style.title}>{t('muscleGroup.title')}</h2>
                <p className={style.subtitle}>{t('muscleGroup.subtitle')}</p>
            </div>
        </div>
    );
};

export default MuscleGroup;