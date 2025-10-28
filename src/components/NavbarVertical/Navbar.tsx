import style from './Navbar.module.css';
import GetStandingLogo from '../../assets/GetStanding.png';
import Seperator from '../ui/Seperator/Seperator';
import { LayoutDashboard,Dumbbell, Utensils, LampDesk, Users, Settings} from 'lucide-react';
const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <div className={style['navbar-left']}>
                <a href="/" className={style.logo}>
                    <img src={GetStandingLogo} alt="GetStanding Logo" />
                </a>
            </div>
            <Seperator variant="accent" />
            <h3>NAVIGATION</h3>

            <a href="#" className={style.navlink}>
               <LayoutDashboard className={style.icon} />
               <span>Dashboard</span>
            </a>

            <a href="#" className={style.navlink}>
               <Dumbbell className={style.icon} />
               <span>Workout</span>
            </a>

            <a href="#" className={style.navlink}>
               <Utensils className={style.icon} />
               <span>Meals</span>
            </a>

            <a href="#" className={style.navlink}>
               <Utensils className={style.icon} />
               <span>Meals</span>
            </a>

            <a href="#" className={style.navlink}>
               <LampDesk className={style.icon} />
               <span>Desk Details</span>
            </a>

            <a href="#" className={style.navlink}>
               <Users className={style.icon} />
               <span>Friends</span>
            </a>

            <Seperator variant="accent" />

            <a href="#" className={style.navlink}>
               <Settings className={style.icon} />
               <span>Settings</span>
            </a>
        </nav>
    );
};

export default Navbar;