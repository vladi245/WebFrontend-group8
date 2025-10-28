import Logo from '../../components/Logo/Logo'
import ConnectionStatus from "../../components/ConnectionStatus/ConnectionStatus";
import DeskSlider from '../../components/DeskSlider/DeskSlider';
import style from './Desk.module.css';
import DeskSettings from '../../components/DeskSettings/DeskSettings';
export default function Desk() {
    return (
        <>
            <div className={style.logoContainer}>
                <Logo />
                <div className={style.gridContainer}>
                    <div className={style.parent}>
                        <div className={style.div1}>
                            <ConnectionStatus />
                        </div>
                        <div className={style.div2}>
                            <DeskSlider />
                        </div>
                        <div className={style.div3}>
                            <DeskSettings />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
