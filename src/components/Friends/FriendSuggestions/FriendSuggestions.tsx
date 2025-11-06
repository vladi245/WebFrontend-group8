import style from './FriendSuggestions.module.css';
import { User } from 'lucide-react';

const FriendSuggestions = () => {
    // Fake data
    const suggestions = [
        { username: "username1" },
        { username: "username2" },
        { username: "username3" }
    ];

    return (
        <div className={style.suggestionsContainer}>
            <div className={style.sectionHeader}>
                <h3 className={style.sectionTitle}>Suggestions for you</h3>
                <a href="#" className={style.seeAllLink}>See All</a>
            </div>
            
            <div className={style.suggestionsList}>
                {suggestions.map((suggestion, index) => (
                    <div key={index} className={style.suggestionCard}>
                        <div className={style.userIcon}>
                        <   User size={24} />

                        </div>
                        <div className={style.username}>@{suggestion.username}</div>
                        <div className={style.buttons}>
                            <button className={style.removeButton}>Remove</button>
                            <button className={style.followButton}>Follow</button>
                        </div>
                        <p className={style.tagline}>People You May Know</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendSuggestions;

