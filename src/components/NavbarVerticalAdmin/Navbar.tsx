import style from './Navbar.module.css';
import GetStandingLogo from '../../assets/GetStanding.png';
import Seperator from '../ui/Seperator/Seperator';
import { LayoutDashboard,Dumbbell, Utensils,Contact } from 'lucide-react';
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

            <a href="/admin" className={style.navlink}>
               <LayoutDashboard className={style.icon} />
               <span>Dashboard</span>
            </a>

            <a href="/admin/workout" className={style.navlink}>
               <Dumbbell className={style.icon} />
               <span>Workout</span>
            </a>
            
            <a href="/admin/foods" className={style.navlink}>
               <Utensils className={style.icon} />
               <span>Meals</span>
            </a>
           
           <a href="/admin/contact" className={style.navlink}>
               <Contact className={style.icon} />
               <span>Contact</span>
            </a>
        </nav>
    );
};

export default Navbar;