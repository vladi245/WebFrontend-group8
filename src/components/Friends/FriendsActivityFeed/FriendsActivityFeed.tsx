import style from './FriendsActivityFeed.module.css';
import FriendActivityCard from '../FriendActivityCard/FriendActivityCard';

const FriendsActivityFeed = () => {
    // Fake data - in real app, this would come from a database
    const activities = [
        {
            username: "username",
            activity: "completed a 10 min stretch.",
            timestamp: "20m ago"
        },
        {
            username: "friend2",
            activity: "completed a 30 min workout.",
            timestamp: "1h ago"
        },
        {
            username: "friend3",
            activity: "completed a 15 min desk exercise.",
            timestamp: "2h ago"
        }
    ];

    return (
        <div className={style.feedContainer}>
            <div className={style.header}>
                <h1 className={style.mainHeading}>
                    Stay <span className={style.highlight}>connected</span>, stay motivated.
                </h1>
            </div>
            
            <div className={style.contentSection}>
                <div className={style.sectionHeader}>
                    <h2 className={style.sectionTitle}>Friends activity</h2>
                    <p className={style.sectionSubtitle}>See what your friends have been up to.</p>
                </div>
                
                <div className={style.activitiesList}>
                    {activities.map((activity, index) => (
                        <FriendActivityCard
                            key={index}
                            username={activity.username}
                            activity={activity.activity}
                            timestamp={activity.timestamp}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FriendsActivityFeed;

