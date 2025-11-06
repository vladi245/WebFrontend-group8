import style from './FriendActivityCard.module.css';
import { User, Dumbbell } from 'lucide-react';

interface FriendActivityCardProps {
    username: string;
    activity: string;
    timestamp: string;
}

const FriendActivityCard = ({ username, activity, timestamp }: FriendActivityCardProps) => {
    return (
    <div className={style.card}>
            <div className={style.userIcon}>
                <User size={24} />
            </div>
            <div className={style.content}>
                <div className={style.username}>@{username}</div>
                <div className={style.activity}>{activity}</div>
            </div>
            <div className={style.rightSection}>
                <div className={style.dumbbellIcon}>
                    <Dumbbell size={20} />
                </div>
                <div className={style.timestamp}>{timestamp}</div>
            </div>
        </div>
    );
};

export default FriendActivityCard;

