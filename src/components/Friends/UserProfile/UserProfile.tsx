import style from './UserProfile.module.css';
import { User } from 'lucide-react';
import Counter from './Counter';


const UserProfile = () => {

    const following = 0;
    const followers = 0;
    return (
        <div className={style.profileContainer}>
            <div className={style.avatarContainer}>
                <div className={style.card}>
            <div className={style.userIcon}>
                <   User size={24} />
            </div>
                </div>
                <h2 className={style.name}>name</h2>
                <button className={style.editButton}>Edit profile</button>
            </div>
            
            <div className={style.statsContainer}>
                <Counter label="Following" number={following} />             
                <div className={style.statDivider}></div>
                <Counter label="Followers" number={followers} />   
            </div>
            <div className={style.dividerBelow}></div>
        </div>
    );
};

export default UserProfile;

