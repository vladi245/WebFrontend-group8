import DeleteButton from "../../components/DeleteButton/DeleteButton";
import style from './Settings.module.css'
import Logo from '../../components/Logo/Logo'

export default function Settings() {
    return (
        <div className={style.settingsContainer}>
            <Logo />
            <h1 className={style.settingsText}>
                Settings
            </h1>

            <DeleteButton />

        </div>
    );
};
