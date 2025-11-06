import React from 'react';
import style from './ActivitySection.module.css';
import ActivityItem from '../ActivityItem/ActivityItem';

interface ActivitySectionProps {
    title: string;
    icon: React.ReactNode;
    text: string;
    timestamp?: string;
}

const ActivitySection = ({ title, icon, text, timestamp }: ActivitySectionProps) => {
    return (
        <div className={style.activitySection}>
            <h3 className={style.sectionHeading}>{title}</h3>
            <ActivityItem 
                icon={icon}
                text={text}
                timestamp={timestamp}
            />
        </div>
    );
};

export default ActivitySection;



