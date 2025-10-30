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
                    <div className={style.deskComponentsGridSetup}>
                        <div className={style.deskConnectionStatus}>
                            <ConnectionStatus />
                        </div>
                        <div className={style.deskImageAndSlider}>
                            <DeskSlider />
                        </div>
                        <div className={style.deskSettings}>
                            <DeskSettings />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
