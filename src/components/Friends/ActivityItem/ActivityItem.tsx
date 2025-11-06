import React from 'react';
import style from './ActivityItem.module.css';
import { User } from 'lucide-react';

interface ActivityItemProps {
    icon?: React.ReactNode;
    text: string;
    timestamp?: string;
}

const ActivityItem = ({ icon = <User size={20} />, text, timestamp }: ActivityItemProps) => {
    return (
        <div className={style.activityItem}>
            <div className={style.icon}>{icon}</div>
            <div className={style.content}>
                <span className={style.text}>{text}</span>
                {timestamp && <span className={style.timestamp}>{timestamp}</span>}
            </div>
        </div>
    );
};

export default ActivityItem;

