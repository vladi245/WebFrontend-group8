import style from './Navbar.module.css';
import GetStandingLogo from '../../assets/GetStanding.png';
import Seperator from '../ui/Seperator/Seperator';
import { LayoutDashboard,Dumbbell, LampDesk, Users, Settings} from 'lucide-react';
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

            <a href="/dashboard" className={style.navlink}>
               <LayoutDashboard className={style.icon} />
               <span>Dashboard</span>
            </a>

            <a href="/workout" className={style.navlink}>
               <Dumbbell className={style.icon} />
               <span>Workout</span>
            </a>
            
            {/* hide for the presentation
               <a href="#" className={style.navlink}>
                  <Utensils className={style.icon} />
                  <span>Meals</span>
               </a>
            */}
            
            <a href="/desk" className={style.navlink}>
               <LampDesk className={style.icon} />
               <span>Desk Details</span>
            </a>

            <a href="/friends" className={style.navlink}>
               <Users className={style.icon} />
               <span>Friends</span>
            </a>

            <Seperator variant="accent" />

            <a href="/settings" className={style.navlink}>
               <Settings className={style.icon} />
               <span>Settings</span>
            </a>
        </nav>
    );
};

export default Navbar;