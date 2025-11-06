import style from './Navbar.module.css';
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
                <ul className={style['nav-links']}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/dashboard">Dashboard</a></li> {/*here would have to add the dropdown in the future */}
                    <li><a href="/about">About Us</a></li>

                </ul>
            </div>
            <div className={style['navbar-right']}>
                <a href="/login" className={style['login-button']}>
                    Login
                </a>
                <a href="/sign-up" className={style['signup-button']}>
                    Sign Up
                </a>
            </div>
        </nav>
    );
};

export default Navbar;