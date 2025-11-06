import style from './FriendsTopNav.module.css';
import { Bell, Search } from 'lucide-react';

const FriendsTopNav = () => {
    return (
        <div className={style.topNav}>
            <button className={style.notificationButton}>
            <   Bell size={24} />
                
            </button>
            
            <div className={style.searchContainer}>
                <  Search size={24} />
                    <input 
                    type="text" 
                    className={style.searchInput}
                    placeholder="Find Friends"
                />
            </div>
        </div>
    );
};

export default FriendsTopNav;

