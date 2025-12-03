import { useState } from 'react';
import style from './DeskSettings.module.css';
import { useTranslation } from 'react-i18next';

interface DeskSettingsProps {
    onHeightChange?: (height: number) => void;
    onModeChange?: (isStanding: boolean) => void;
    userHeight?: number;
}

const DeskSettings: React.FC<DeskSettingsProps> = ({ onHeightChange, onModeChange, userHeight }) => {
    const { t } = useTranslation();
    const [sittingHeight, setSittingHeight] = useState<number>(100);
    const [standingHeight, setStandingHeight] = useState<number>(120);
    const [isStanding, setIsStanding] = useState<boolean>(false);
    const position = isStanding ? t('deskSettings.positionStanding') : t('deskSettings.positionSitting');

    const recommendedSittingHeight = userHeight ? Math.round(((0.4739 * userHeight) - 17 + (0.5538 * userHeight - 24)) / 2) : null;
    const recommendedStandingHeight = userHeight ? Math.round(((0.6 * userHeight) + (0.64 * userHeight) + 6) / 2) : null;

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
                <label className={style.ValueLabel}> {sittingHeight} </label>
                <button className={style.PlusButton} onClick={addOneSitting}>+</button>
                <button className={style.MinusButton} onClick={subtractOneSitting}>-</button>
                <label className={style.SuggestionValue}>Reccomended: {recommendedSittingHeight} </label>
            </div>
            <p className={style.SettingsText}> {t('deskSettings.prefStandingHeight')}</p>
            <div className={style.valueAndChangeButtonsGrid}>
                <label className={style.ValueLabel}> {standingHeight} </label>
                <button className={style.PlusButton} onClick={addOneStanding}>+</button>
                <button className={style.MinusButton} onClick={subtractOneStanding}>-</button>
                <label className={style.SuggestionValue}>Reccomended: {recommendedStandingHeight} </label>
            </div>

        </div >
    );
};
export default DeskSettings;

