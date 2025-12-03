import style from './Navbar.module.css';
import GetStandingLogo from '../../assets/GetStanding.png';
import { useTranslation } from 'react-i18next';
import LanguageChange from '../../components/LanguageChange/LanguageChange';
const Navbar = () => {
    const { t } = useTranslation();


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
                <LanguageChange />
            </div>
        </nav>
    );
};

export default Navbar;