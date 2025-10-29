import style from './UserProfile.module.css';
import { User } from 'lucide-react';

const UserProfile = () => {
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
                <div className={style.statBox}>
                    <div className={style.statNumber}>1</div>
                    <div className={style.statLabel}>Following</div>
                </div>
                <div className={style.statDivider}></div>
                <div className={style.statBox}>
                    <div className={style.statNumber}>1</div>
                    <div className={style.statLabel}>Followers</div>
                </div>
            </div>
            <div className={style.dividerBelow}></div>
        </div>
    );
};

export default UserProfile;

