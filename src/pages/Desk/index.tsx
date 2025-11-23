import { useState } from 'react';
import Logo from '../../components/Logo/Logo'
import ConnectionStatus from "../../components/ConnectionStatus/ConnectionStatus";
import DeskSlider from '../../components/DeskSlider/DeskSlider';
import style from './Desk.module.css';
import DeskSettings from '../../components/DeskSettings/DeskSettings';
import Navbar from '../../components/NavbarVertical/Navbar';
export default function Desk() {
    const [currentHeight, setCurrentHeight] = useState<number>(100);

    const handleHeightChange = (height: number) => {
        setCurrentHeight(height);
    };

    return (
        <div className={style.zoomContainer}>

            <Navbar />
            <div className={style.logoContainer}>
                <div className={style.gridContainer}>
                    <div className={style.deskComponentsGridSetup}>
                        <div className={style.deskConnectionStatus}>
                            <ConnectionStatus />
                        </div>
                        <div className={style.deskImageAndSlider}>
                            <DeskSlider initialHeight={currentHeight} />
                        </div>
                        <div className={style.deskSettings}>
                            <DeskSettings onHeightChange={handleHeightChange} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
