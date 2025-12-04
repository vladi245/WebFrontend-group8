import React from 'react';
import style from './Subscriptions.module.css';
import { useNavigate } from 'react-router-dom';

const Subscriptions = () => {
    const [hoveredPlan, setHoveredPlan] = React.useState<number | null>(null);
    const navigate = useNavigate();

    const plans = [
        {
            id: 0,
            name: t('subscriptions.plans.0.name'),
            price: 0,
            features: [
                'Daily workout tracking',
                'Weekly workout performance insights',
                'Muscle group analysis',
                'Manual desk adjustment',
            ]
        },
        {
            id: 1,
            name: t('subscriptions.plans.1.name'),
            price: 1000,
            features: [
                'Daily calorie tracking',
                'Weekly calorie consumption insights',
                'Daily hydration tracking',
                'Enjoy all Beginner features with additional analytics'
            ]
        }
    ];

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h2 className={style.title}>
                    {t('subscriptions.title1')} <span className={style.highlight}>{t('subscriptions.title2')}</span>
                </h2>
                <p className={style.subtitle}>
                    {t('subscriptions.subtitle')}
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
                                {t('subscriptions.currency')} {plan.price} <span className={style.priceUnit}>{t('subscriptions.priceUnit')}</span>
                            </h3>
                            <p className={style.planIncludes}>{t('subscriptions.planIncludes')}</p>
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

                        <button
                            className={style.choosePlanButton}
                            onClick={() => navigate('/login')}
                        >
                            Choose Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;
