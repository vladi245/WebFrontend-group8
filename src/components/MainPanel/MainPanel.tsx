import { useNavigate } from 'react-router-dom';
import style from './MainPanel.module.css';
import { useTranslation } from 'react-i18next';

const MainPanel = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleStartJourney = () => {
        navigate('/login');
    };

    const handleExplorePrograms = () => {
        navigate('/login');
    };

    return (
        <div className={style.mainpanel}>
            <div className={style.content}>
                <h1 className={style.title}>
                    {t('hero.title1')} <span className={style.highlight}> <br />{t('hero.title2')}</span>
                </h1>

                <p className={style.description}>
                    {t('hero.description')}
                </p>

                <div className={style.buttonContainer}>
                    <button className={style.primaryButton} onClick={handleStartJourney}>
                        {t('hero.startButton')}
                    </button>
                    <button className={style.secondaryButton} onClick={handleExplorePrograms}>
                        {t('hero.exploreButton')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainPanel;