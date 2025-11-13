import style from './DeskSlider.module.css';
import desk_high from '../../assets/desk_high.png';
import desk_medium from '../../assets/desk_low.png';
import desk_low from '../../assets/desk_normal.png';
import SliderValue from './SliderValue';
import React, { useState, useEffect, type ChangeEvent } from 'react';

interface DeskSliderProps {
    initialHeight?: number;
}

const DeskSlider: React.FC<DeskSliderProps> = ({ initialHeight = 100 }) => {
    const max_height = initialHeight + 5;
    const min_height = initialHeight - 5;
    const type = "range";

    const [value, setValue] = useState(initialHeight);

    // Update slider value when initialHeight changes
    useEffect(() => {
        setValue(initialHeight);
    }, [initialHeight]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(Number(e.target.value));
    };

    let currentImage: string;
    if (value < initialHeight - 2) {
        currentImage = desk_medium;
    } else if (value >= initialHeight - 2 && value <= initialHeight + 2) {
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