import DeleteButton from "../../components/DeleteButton/DeleteButton";
import style from './Settings.module.css'
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Navbar from '../../components/NavbarVertical/Navbar';
import LanguageChange from '../../components/LanguageChange/LanguageChange';

export default function Settings() {
    return (
        <div className={style.zoomContainer}>
            <Navbar />

            <div className={style.settingsContainer}>
                <h1 className={style.settingsText}>
                    Settings
                </h1>
                <LanguageChange />
                <LogoutButton />
                <DeleteButton />

            </div>
        </div>
    );
};
