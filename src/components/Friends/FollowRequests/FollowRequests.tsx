import style from './FollowRequests.module.css';
import { User } from 'lucide-react';

const FollowRequests = () => {
    return (
        <div className={style.requestsContainer}>
            <h3 className={style.sectionHeading}>Follow Requests</h3>
            
            <div className={style.requestCard}>
                <div className={style.userIcon}>
                <   User size={24} />
                </div>
                <div className={style.cardContent}>
                    <span className={style.requestText}>@user name requested to follow you.</span>
                    <div className={style.buttons}>
                        <button className={style.confirmButton}>Confirm</button>
                        <button className={style.deleteButton}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FollowRequests;

