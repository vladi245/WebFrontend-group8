import './Navbar.css';
import GetStandingLogo from './assets/GetStanding.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">
                    <img src={GetStandingLogo} alt="GetStanding Logo" />
                </a>
            </div>
            <div className="navbar-center">
                <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/dashboard">Dashboard</a></li> {/*here would have to add the dropdown in the future */}
                    <li><a href="/community">Community</a></li>
                    <li><a href="/subscriptions">Subscriptions</a></li>
                    <li><a href="/about">About Us</a></li>

                </ul>
            </div>
            <div className="navbar-right">
                <a href="/login" className="login-button">
                    Login
                </a>
                <a href="/sign-up" className="signup-button">
                    Sign Up
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
