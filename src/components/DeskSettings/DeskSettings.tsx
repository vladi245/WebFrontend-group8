import { useState } from 'react';
import style from './DeskSettings.module.css';

interface DeskSettingsProps {
    onHeightChange?: (height: number) => void;
    onModeChange?: (isStanding: boolean) => void;
}

const DeskSettings: React.FC<DeskSettingsProps> = ({ onHeightChange, onModeChange }) => {
    const [sittingHeight, setSittingHeight] = useState<number>(100);
    const [standingHeight, setStandingHeight] = useState<number>(120);
    const [isStanding, setIsStanding] = useState<boolean>(false);

    const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const standing = e.target.checked;
        setIsStanding(standing);
        if (onModeChange) {
            onModeChange(standing);
        }
        if (onHeightChange) {
            onHeightChange(standing ? standingHeight : sittingHeight);
        }
    };

    const addOneSitting = () => {
        const newHeight = sittingHeight + 1;
        setSittingHeight(newHeight);
        if (!isStanding && onHeightChange) {
            onHeightChange(newHeight);
        }
    };

    const subtractOneSitting = () => {
        const newHeight = sittingHeight - 1;
        setSittingHeight(newHeight);
        if (!isStanding && onHeightChange) {
            onHeightChange(newHeight);
        }
    };

    const addOneStanding = () => {
        const newHeight = standingHeight + 1;
        setStandingHeight(newHeight);
        if (isStanding && onHeightChange) {
            onHeightChange(newHeight);
        }
    };

    const subtractOneStanding = () => {
        const newHeight = standingHeight - 1;
        setStandingHeight(newHeight);
        if (isStanding && onHeightChange) {
            onHeightChange(newHeight);
        }
    };

    return (
        <div className={style.DeskSettingsContainer}>
            <div className={style.TitleContainer}>
                <p className={style.Title}>Desk Settings</p>
                <div>
                    <input
                        type="checkbox"
                        id="switch1"
                        name="switch1"
                        className={style.switch}
                        checked={isStanding}
                        onChange={handleToggleChange}
                    />
                    <label htmlFor="switch1">Standing</label>
                </div>
            </div>
            <p className={style.SettingsText}> Save Current Height As Preferred </p>
            <button className={style.SaveButton}>confirm</button>
            <p className={style.SettingsText}> Preferred Sitting Height (Cm) - Manual</p>
            <div className={style.valueAndChangeButtonsGrid}>
                <label className={style.Label}> {sittingHeight} </label>
                <button className={style.PlusButton} onClick={addOneSitting}>+</button>
                <button className={style.MinusButton} onClick={subtractOneSitting}>-</button>
            </div>
            <p className={style.SettingsText}> Preferred Standing Height (cm)- Manual</p>
            <div className={style.valueAndChangeButtonsGrid}>
                <label className={style.Label}> {standingHeight} </label>
                <button className={style.PlusButton} onClick={addOneStanding}>+</button>
                <button className={style.MinusButton} onClick={subtractOneStanding}>-</button>
            </div>

        </div >
    );
};
export default DeskSettings;

