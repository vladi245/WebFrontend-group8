import style from './Settings.module.css'
import Logo from '../../components/Logo/Logo'
import Modal from '../../components/DeletePopUp/DeletePopUp.module.css';

export default function Settings() {
    return
    <div className={style.settingsContainer}>
        <Logo />
        <h1 className={style.settingsText}>
            Settings
        </h1>
        <Modal />
    </div>

};
