import DeleteButton from "../../components/DeleteButton/DeleteButton";
import style from './Settings.module.css'
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Navbar from '../../components/NavbarVertical/Navbar';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

export default function Settings() {
    const { t, i18n } = useTranslation();

    const handleLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value);
    };
    return (
        <div className={style.zoomContainer}>
            <Navbar />

            <div className={style.settingsContainer}>
                <h1 className={style.settingsText}>
                    Settings
                </h1>
                <select value={i18n.language} onChange={handleLangChange} aria-label="language-select">
                    <option value="en">EN</option>
                    <option value="da">DA</option>
                </select>
                <LogoutButton />
                <DeleteButton />

            </div>
        </div>
    );
};
