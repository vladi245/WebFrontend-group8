import { useState } from 'react';
import Logo from '../../components/Logo/Logo'
import ConnectionStatus from "../../components/ConnectionStatus/ConnectionStatus";
import DeskSlider from '../../components/DeskSlider/DeskSlider';
import style from './Desk.module.css';
import DeskSettings from '../../components/DeskSettings/DeskSettings';
import Navbar from '../../components/NavbarVertical/Navbar';
import Seperator
 from '../../components/ui/Seperator/Seperator';
import Greeting from '../../components/ui/DeskText/Greetings';
export default function Desk() {
    const [currentHeight, setCurrentHeight] = useState<number>(100);

    const handleHeightChange = (height: number) => {
        setCurrentHeight(height);
    };

    const storedUserForGreeting = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const parsedUserForGreeting = storedUserForGreeting ? JSON.parse(storedUserForGreeting) : null;
    const displayName = parsedUserForGreeting?.name ?? parsedUserForGreeting?.username ?? 'Guest';


    return (
        <div className={style.zoomContainer}>

            <Navbar />
            <div className={style.gridContainer}>
                <Greeting name={displayName} />
                <div style={{ width: '50%' }}>
                    <Seperator variant="accent" />
                </div>
                <ConnectionStatus />
                <div className={style.subgrid}>
                    <DeskSlider initialHeight={currentHeight} />
                    <DeskSettings onHeightChange={handleHeightChange} />
                </div>
            </div>

        </div>
    );
};
