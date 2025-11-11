import DeleteButton from "../../components/DeleteButton/DeleteButton";
import style from './Settings.module.css'
import Navbar from "../../components/NavbarVertical/Navbar";
export default function Settings() {
    return (
        <>
            <Navbar />
            <div className={style.settingsContainer}>

                <h1 className={style.settingsText}>
                    Settings
                </h1>

                <DeleteButton />

            </div>
        </>
    );
};
