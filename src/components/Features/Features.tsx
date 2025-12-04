import React from 'react';
import style from './Features.module.css';

const Features = () => {
    const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

    const features = [
        {
            id: 0,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm5.675-10l1.3 1.3q.3.3.7.3t.7-.3l3.675-3.7q.275-.275.275-.7t-.275-.7q-.3-.3-.712-.287t-.688.287l-2.975 2.975l-1.3-1.3q-.3-.3-.7-.3t-.7.3L6.95 11.9q-.275.275-.275.7t.275.7q.3.3.713.287t.687-.287zm-3.95 5L5 17.725V19h.85l3-3zm3.95 0l-3 3H9.8l3-3zm3.725 0l-3 3h2.125l3-3zm3.75 0l-3 3h2.125L19 17.275V16z" /></svg>,
            title: 'Calorie tracker',
            description: 'Monitor your daily calorie intake with our calorie tracking system making sure your macros are on track',
            span: 'col3',
        },
        {
            id: 1,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2 9V4h20v7.5h-2V6H4v3zm0 11v-5h2v3h5.5v2zm10.5 3q-.625 0-1.062-.437T11 21.5v-3.675l1.325-3.525q.225-.575.738-.938T14.2 13H16v-2h2v2h1.8q.625 0 1.138.363t.737.937L23 17.825V21.5q0 .625-.437 1.063T21.5 23h-2q-.625 0-1.062-.437T18 21.5V20h2v1h1v-2.825L19.8 15H18v.925l1.65 1.675l-1.4 1.4L17 17.75L15.75 19l-1.4-1.4L16 15.925V15h-1.8L13 18.175V21h1v-1h2v1.5q0 .625-.437 1.063T14.5 23zM2 13v-2h3.6L7 13.775L10.35 7h1.275l2.25 4.525q-.525.05-.987.225t-.863.5l-1.025-2L7.625 17h-1.25l-2-4z" /></svg>,
            title: 'Desk adjustment system',
            description: 'Track your time spent sitting and standing, helping you get some weight off that back.',
            span: 'col5',
            blue: true,
        },
        {
            id: 2,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.4 21.9L12 20.5l3.55-3.55l-8.5-8.5L3.5 12l-1.4-1.4l1.4-1.45l-1.4-1.4l2.1-2.1L2.8 4.2l1.4-1.4l1.45 1.4l2.1-2.1l1.4 1.4l1.45-1.4L12 3.5L8.45 7.05l8.5 8.5L20.5 12l1.4 1.4l-1.4 1.45l1.4 1.4l-2.1 2.1l1.4 1.45l-1.4 1.4l-1.45-1.4l-2.1 2.1l-1.4-1.4z" /></svg>,
            title: 'Workout tracker',
            description: 'Log exercises, track sets, monitor progression',
            span: 'col4',
            blue: true,
        },
        {
            id: 3,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 7q.425 0 .713-.288T13 6t-.288-.712T12 5t-.712.288T11 6t.288.713T12 7m2.825 0h1.75q.75 0 1.3.5t.675 1.225l1.425 10q.125.9-.462 1.588T18 21H6q-.925 0-1.513-.687t-.462-1.588l1.425-10Q5.575 8 6.125 7.5t1.3-.5h1.75q-.075-.25-.125-.487T9 6q0-1.25.875-2.125T12 3t2.125.875T15 6q0 .275-.05.513T14.825 7" /></svg>,
            title: 'Visualize',
            description: 'Monitor your progress with the help of graph created based on your performance.',
            span: 'col5',
            blue: true,
        },
        {
            id: 0,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-glass-water-icon lucide-glass-water"><path d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z"/><path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"/></svg>,
            title: 'Hydration',
            description: 'Track your daily water intake and stay hydrated throughout the day.',
            span: 'col5',
            blue: true,
        }

    ];

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h2 className={style.title}>
                    Our <span className={style.highlight}>Features</span>
                </h2>
                <p className={style.subtitle}>
                    This Is A Preview Of What GetStanding Offers To Its Users. Find Out More By Clicking On Each Feature.
                </p>
            </div>

            <div className={style.gridContainer}>
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className={`${style.card} ${style[feature.span]} ${style[`card${feature.id}`]} ${feature.blue ? style.cardBlue : ''} ${hoveredCard === feature.id ? style.cardHover : ''}`}
                        onMouseEnter={() => setHoveredCard(feature.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className={style.iconWrapper}>
                            <span className={style.icon}>{feature.icon}</span>
                        </div>
                        <h3 className={style.cardTitle}>{feature.title}</h3>
                        <p className={style.cardDescription}>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;