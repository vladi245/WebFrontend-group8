import style from './Logo.module.css';
import GetStandingLogo from '../../assets/GetStanding.png';

const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <div className={style['navbar-left']}>
                <a href="/" className={style.logo}>
                    <img src={GetStandingLogo} alt="GetStanding Logo" />
                </a>
            </div>
            <div className={style['navbar-center']}>
            </div>
            <div className={style['navbar-right']}>
            </div>
        </nav>
    );
};

export default Navbar;