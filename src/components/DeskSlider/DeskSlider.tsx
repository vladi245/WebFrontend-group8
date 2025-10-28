import { useState, type ChangeEvent } from 'react';
import style from './DeskSlider.module.css';
import desk_high from '../../assets/desk_high.png';
import desk_medium from '../../assets/desk_low.png';
import desk_low from '../../assets/desk_normal.png';


const DeskSlider = () => {
    const [value, setValue] = useState<number>(1);

    const Change = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(Number(e.target.value));
    };

    let currentImage: string;
    if (value < 80) {
        currentImage = desk_medium;
    }
    else if (value >= 80 && value <= 120) {
        currentImage = desk_low;
    }
    else {
        currentImage = desk_high;
    }

    return (
        <div className={style.Container}>
            <div className={style.ImageContainer}>
                <img src={currentImage} alt="Desk Position" className={style.DeskImage} />
            </div>
            <div className={style.SliderContainer}>
                <input
                    type="range"
                    min="60"
                    max="140"
                    value={value}
                    className={style.DeskSlider}
                    onChange={Change}
                />
                <label className={style.Label}>{value} cm</label>
            </div>
        </div>




    );
};
export default DeskSlider;