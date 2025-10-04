import React from 'react';
import style from './Subscriptions.module.css';

const Subscriptions = () => {
    const [hoveredPlan, setHoveredPlan] = React.useState<number | null>(null);

    const plans = [
        {
            id: 0,
            name: 'Beginner Plan',
            price: 0,
            features: [
                'Notifications to adjust your desk',
                'Manual desk adjustment',
                'Logging up to 30 meals',
                'Logging up to 50 workouts'
            ]
        },
        {
            id: 1,
            name: 'Premium Plan',
            price: 1000,
            features: [
                'Unlimited workout logging',
                'Unlimited meal tracking',
                'Automatic desk adjustment',
                'All of the Beginner Plan features and many more'
            ]
        }
    ];

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h2 className={style.title}>
                    Join <span className={style.highlight}>Today</span>
                </h2>
                <p className={style.subtitle}>
                    Checkout Our Subscription Options:
                </p>
            </div>

            <div className={style.plansContainer}>
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`${style.planCard} ${hoveredPlan === plan.id ? style.planCardHover : ''}`}
                        onMouseEnter={() => setHoveredPlan(plan.id)}
                        onMouseLeave={() => setHoveredPlan(null)}
                    >
                        <div className={style.planHeader}>
                            <p className={style.planName}>{plan.name}</p>
                            <h3 className={style.planPrice}>
                                HUK {plan.price} <span className={style.priceUnit}>/ Month</span>
                            </h3>
                            <p className={style.planIncludes}>This plan includes:</p>
                        </div>

                        <ul className={style.featuresList}>
                            {plan.features.map((feature, index) => (
                                <li key={index} className={style.featureItem}>
                                    <svg className={style.checkIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z" />
                                    </svg>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={style.choosePlanButton}>
                            Choose Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;
