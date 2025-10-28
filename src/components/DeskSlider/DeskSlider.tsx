import { useState, type ChangeEvent } from 'react';
import style from './DeskSlider.module.css';

//const images = []

const DeskSlider = () => {
    const [value, setValue] = useState<number>(1);

    const Change =(e: ChangeEvent<HTMLInputElement>): void =>{
        setValue(Number(e.target.value));
    };
    /*
    let currentImage: string; 
    if (value < 80){
        currentImage = images[0];}
    else if (value > 120){
        currentImage = images[2];}
    else {
        currentImage = images[1];}
    */    

    return(
        <div className={style.SliderContainer}>
            <input 
                type="range"
                min="60"
                max="140"
                value={value}
                className={style.DeskSliderz}
                onChange={Change}
            />

            <div>   
                <img>
                    {/*<source src={currentImage} />*/}                
                </img>
            </div>

        </div>
        

        
        
    );
};
export default DeskSlider;