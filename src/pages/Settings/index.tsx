import DeleteButton from "../../components/DeleteButton/DeleteButton";
import style from './Settings.module.css'
import Logo from '../../components/Logo/Logo'
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Navbar from '../../components/NavbarVertical/Navbar';

export default function Settings() {
    return (    
        <div className={style.zoomContainer}>
            <Navbar />

            <div className={style.settingsContainer}>
                <h1 className={style.settingsText}>
                    Settings
                </h1>
                <LogoutButton />
                <DeleteButton />

            </div>
        </div>
    );
};
