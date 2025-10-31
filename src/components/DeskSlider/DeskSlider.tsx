import style from './DeskSlider.module.css';
import desk_high from '../../assets/desk_high.png';
import desk_medium from '../../assets/desk_low.png';
import desk_low from '../../assets/desk_normal.png';
import SliderValue from './SliderValue';
import { useState, type ChangeEvent } from 'react';


const DeskSlider = () => {
    const preferredHeight = 100;
    const max_height = 140;
    const min_height = 60;
    const type = "range";

    const [value, setValue] = useState(preferredHeight);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(Number(e.target.value));
    };

    let currentImage: string;
    if (value < 80) {
        currentImage = desk_medium;
    } else if (value >= 80 && value <= 120) {
        currentImage = desk_low;
    } else {
        currentImage = desk_high;
    }

    return (
        <div className={style.Container}>
            <div className={style.ImageContainer}>
                <img src={currentImage} alt="Desk Position" className={style.DeskImage} />
            </div>
            <SliderValue
                type={type}
                prefHeight={value}
                currentHeight={value}
                minHeight={min_height}
                maxHeight={max_height}
                onChange={handleChange}
            />
        </div>
    );
};

export default DeskSlider;