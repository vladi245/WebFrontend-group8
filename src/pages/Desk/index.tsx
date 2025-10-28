import Logo from '../../components/Logo/Logo'
import ConnectionStatus from "../../components/ConnectionStatus/ConnectionStatus";
import DeskSlider from '../../components/DeskSlider/DeskSlider';
import style from './Desk.module.css';
export default function Desk(){
    return(
        <div className={style.container}>
            <Logo/>
           
            <ConnectionStatus/>
        </div>
    );
};
