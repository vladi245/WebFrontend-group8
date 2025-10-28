import { useState } from 'react';
import style from './DeskSettings.module.css';

const DeskSettings = () => {
    const [defaultValue, setDefaultValue] = useState<number>(120.1);

    const addOne = () => {
        setDefaultValue(prev => prev + 1);
    };

    const subractOne = () => {
        setDefaultValue(prev => prev - 1);
    };

    return (
        <div className={style.DeskSettingsContainer}>
            <p className={style.Title}>Desk Settings</p>
            <p className={style.SettingsText}> Save Current Height As Preferred </p>
            <button className={style.SaveButton}>confirm</button>
            <p className={style.SettingsText}> Preferred Height (Cm) - Manual</p>
            <div className={style.parent}>
                <label className={style.Label}> {defaultValue} </label>
                <button className={style.PlusButton} onClick={addOne}>+</button>
                <button className={style.MinusButton} onClick={subractOne}>-</button>
            </div>
        </div>


    );
};
export default DeskSettings;
