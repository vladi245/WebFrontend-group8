import React, { type ChangeEvent } from "react";
import style from "./Slider.module.css";

interface SliderValueProps {
    type: string;
    prefHeight: number;
    currentHeight: number;
    minHeight: number;
    maxHeight: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SliderValue: React.FC<SliderValueProps> = ({
    type,
    prefHeight,
    minHeight,
    maxHeight,
    onChange,
}) => {
    return (
        <div className={style.SliderContainer}>
            <input
                type={type}
                min={minHeight}
                max={maxHeight}
                value={prefHeight}
                className={style.DeskSlider}
                onChange={onChange}
            />
            <label className={style.Label}>{prefHeight} cm</label>
        </div>
    );
};

export default SliderValue;
