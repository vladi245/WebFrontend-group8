import Logo from '../../components/Logo/Logo'
import style from './Friends.module.css';
import UserProfile from '../../components/Friends/UserProfile/UserProfile';
import FollowRequests from '../../components/Friends/FollowRequests/FollowRequests';
import ActivitySection from '../../components/Friends/ActivitySection/ActivitySection';
import FriendsActivityFeed from '../../components/Friends/FriendsActivityFeed/FriendsActivityFeed';
import FriendsTopNav from '../../components/Friends/FriendsTopNav/FriendsTopNav';
import FriendSuggestions from '../../components/Friends/FriendSuggestions/FriendSuggestions';
import { User } from 'lucide-react';
import Navbar from '../../components/NavbarVertical/Navbar';

const FriendsPage = () => {
    const userIcon = <User size={24} />;

    return (
        <>
        <Navbar />

        <div className={style.friendsPage}>
            <div style={{background: 'transparent', height: '10px'}}>

            </div>

            <div className={style.leftColumn}>

                <UserProfile />
                <FollowRequests />
                
                <ActivitySection 
                    title="Last 7 Days"
                    icon={userIcon}
                    text="@user name started to following you."
                    timestamp="1d"
                />
                
                <ActivitySection 
                    title="Your Latest Activity"
                    icon={userIcon}
                    text="Completed a 20 min desk workout"
                    timestamp="Mar 17, 2025"
                />
            </div>
            
            <div className={style.middleColumn}>
                <FriendsActivityFeed />
            </div>
            
            <div className={style.rightColumn}>
                <FriendsTopNav />
                <FriendSuggestions />
            </div>
        </div>
        </>
    );
};

export default FriendsPage;

