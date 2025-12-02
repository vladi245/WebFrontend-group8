import style from './Navbar.module.css';
import GetStandingLogo from '../../assets/GetStanding.png';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t, i18n } = useTranslation();

    const handleLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <nav className={style.navbar}>
            <div className={style['navbar-left']}>
                <a href="/" className={style.logo}>
                    <img src={GetStandingLogo} alt="GetStanding Logo" />
                </a>
            </div>
            <div className={style['navbar-center']}>
                <ul className={style['nav-links']}>
                    <li><a href="/">{t('home')}</a></li>
                    <li><a href="/about">{t('aboutUs')}</a></li>

                </ul>
            </div>
            <div className={style['navbar-right']}>
                <a href="/login" className={style['login-button']}>
                    {t('login')}
                </a>
                <a href="/sign-up" className={style['signup-button']}>
                    {t('signUp')}
                </a>
                <select value={i18n.language} onChange={handleLangChange} aria-label="language-select">
                    <option value="en">EN</option>
                    <option value="da">DA</option>
                </select>
            </div>
        </nav>
    );
};

export default Navbar;