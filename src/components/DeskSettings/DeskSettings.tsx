import { useState } from 'react';
import style from './DeskSettings.module.css';
import { useTranslation } from 'react-i18next';

interface DeskSettingsProps {
    onHeightChange?: (height: number) => void;
    onModeChange?: (isStanding: boolean) => void;
}

const DeskSettings: React.FC<DeskSettingsProps> = ({ onHeightChange, onModeChange }) => {
    const { t } = useTranslation();
    const [sittingHeight, setSittingHeight] = useState<number>(100);
    const [standingHeight, setStandingHeight] = useState<number>(120);
    const [isStanding, setIsStanding] = useState<boolean>(false);
    const position = isStanding ? t('deskSettings.positionSitting') : t('deskSettings.positionStanding');
    const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const standing = e.target.checked;
        setIsStanding(standing);
        if (onModeChange) {
            onModeChange(standing);
        }
    };


    const handleConfirm = () => {
        if (onHeightChange) {
            onHeightChange(isStanding ? standingHeight : sittingHeight);
        }
    };

    const addOneSitting = () => {
        setSittingHeight(prev => prev + 1);
    };

    const subtractOneSitting = () => {
        setSittingHeight(prev => prev - 1);
    };

    const addOneStanding = () => {
        setStandingHeight(prev => prev + 1);
    };

    const subtractOneStanding = () => {
        setStandingHeight(prev => prev - 1);
    };

    return (
        <div className={style.DeskSettingsContainer}>
            <div className={style.TitleContainer}>
                <p className={style.Title}>{t('deskSettings.title')}</p>
                <div>
                    <input
                        type="checkbox"
                        id="switch1"
                        name="switch1"
                        className={style.switch}
                        checked={isStanding}
                        onChange={handleToggleChange}
                    />
                    <label htmlFor="switch1">{position}</label>
                </div>
            </div>
            <p className={style.SettingsText}> {t('deskSettings.saveHeightLabel')} </p>
            <button className={style.SaveButton} onClick={handleConfirm}>{t('deskSettings.confirmButton')}</button>
            <p className={style.SettingsText}> {t('deskSettings.prefSittingHeight')}</p>
            <div className={style.valueAndChangeButtonsGrid}>
                <label className={style.Label}> {sittingHeight} </label>
                <button className={style.PlusButton} onClick={addOneSitting}>+</button>
                <button className={style.MinusButton} onClick={subtractOneSitting}>-</button>
            </div>
            <p className={style.SettingsText}> {t('deskSettings.prefStandingHeight')}</p>
            <div className={style.valueAndChangeButtonsGrid}>
                <label className={style.Label}> {standingHeight} </label>
                <button className={style.PlusButton} onClick={addOneStanding}>+</button>
                <button className={style.MinusButton} onClick={subtractOneStanding}>-</button>
            </div>

        </div >
    );
};
export default DeskSettings;

