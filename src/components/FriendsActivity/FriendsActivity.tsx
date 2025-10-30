import styles from './FriendsActivity.module.css';
import { Users, UserRound } from 'lucide-react';

interface Activity {
  id: number;
  username: string;
  action: string;
  timeAgo: string;
}

interface FriendsActivityProps {
  activities: Activity[];
}

const FriendsActivity = ({ activities }: FriendsActivityProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Users className={styles.headerIcon} />
        <span className={styles.headerTitle}>Friends activity</span>
      </div>
      <div className={styles.activities}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.activityItem}>
            <div className={styles.activityIcon}>
              <UserRound className={styles.userIcon} />
            </div>
            <div className={styles.activityContent}>
              <span className={styles.username}>@{activity.username}</span>
              <span className={styles.action}>{activity.action}</span>
            </div>
            <div className={styles.timeAgo}>{activity.timeAgo}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsActivity;
