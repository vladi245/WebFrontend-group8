import React from 'react';
import style from './Features.module.css';
import { useTranslation } from 'react-i18next';

const Features = () => {
    const { t } = useTranslation();
    const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

    const features = [
        {
            id: 0,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm5.675-10l1.3 1.3q.3.3.7.3t.7-.3l3.675-3.7q.275-.275.275-.7t-.275-.7q-.3-.3-.712-.287t-.688.287l-2.975 2.975l-1.3-1.3q-.3-.3-.7-.3t-.7.3L6.95 11.9q-.275.275-.275.7t.275.7q.3.3.713.287t.687-.287zm-3.95 5L5 17.725V19h.85l3-3zm3.95 0l-3 3H9.8l3-3zm3.725 0l-3 3h2.125l3-3zm3.75 0l-3 3h2.125L19 17.275V16z" /></svg>,
            title: t('features.items.0.title'),
            description: t('features.items.0.description'),
            span: 'col3',
        },
        {
            id: 1,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2 9V4h20v7.5h-2V6H4v3zm0 11v-5h2v3h5.5v2zm10.5 3q-.625 0-1.062-.437T11 21.5v-3.675l1.325-3.525q.225-.575.738-.938T14.2 13H16v-2h2v2h1.8q.625 0 1.138.363t.737.937L23 17.825V21.5q0 .625-.437 1.063T21.5 23h-2q-.625 0-1.062-.437T18 21.5V20h2v1h1v-2.825L19.8 15H18v.925l1.65 1.675l-1.4 1.4L17 17.75L15.75 19l-1.4-1.4L16 15.925V15h-1.8L13 18.175V21h1v-1h2v1.5q0 .625-.437 1.063T14.5 23zM2 13v-2h3.6L7 13.775L10.35 7h1.275l2.25 4.525q-.525.05-.987.225t-.863.5l-1.025-2L7.625 17h-1.25l-2-4z" /></svg>,
            title: t('features.items.1.title'),
            description: t('features.items.1.description'),
            span: 'col5',
            blue: true,
        },
        {
            id: 2,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11q.825 0 1.413-.587T14 9t-.587-1.412T12 7t-1.412.588T10 9t.588 1.413T12 11M7 21v-2h4v-3.1q-1.225-.275-2.187-1.037T7.4 12.95q-1.875-.225-3.137-1.637T3 8V7q0-.825.588-1.412T5 5h2V3h10v2h2q.825 0 1.413.588T21 7v1q0 1.9-1.263 3.313T16.6 12.95q-.45 1.15-1.412 1.913T13 15.9V19h4v2zm0-10.2V7H5v1q0 .95.55 1.713T7 10.8m5 3.2q1.25 0 2.125-.875T15 11V5H9v6q0 1.25.875 2.125T12 14m5-3.2q.9-.325 1.45-1.088T19 8V7h-2zm-5-1.3" /></svg>,
            title: t('features.items.2.title'),
            description: t('features.items.2.description'),
            span: 'col4',
        },
        {
            id: 3,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 21v-5q-1.55-.125-3.037-.35T3 15l.5-2q2.075.575 4.2.788T12 14q2.15 0 4.275-.213T20.5 13l.5 2q-1.5.425-2.988.65T15 16v5zm3-8q-.85 0-1.425-.575T10 11q0-.825.575-1.412T12 9q.825 0 1.413.588T14 11q0 .85-.587 1.425T12 13m-7.5-3q-.65 0-1.075-.425T3 8.5q0-.625.425-1.062T4.5 7q.625 0 1.063.438T6 8.5q0 .65-.437 1.075T4.5 10m15 0q-.65 0-1.075-.425T18 8.5q0-.625.425-1.062T19.5 7q.625 0 1.063.438T21 8.5q0 .65-.437 1.075T19.5 10M7.25 6.25q-.65 0-1.075-.425T5.75 4.75q0-.625.425-1.062T7.25 3.25q.625 0 1.063.438T8.75 4.75q0 .65-.437 1.075T7.25 6.25m9.5 0q-.65 0-1.075-.425T15.25 4.75q0-.625.425-1.062t1.075-.438q.625 0 1.063.438t.437 1.062q0 .65-.437 1.075t-1.063.425M12 5q-.65 0-1.075-.425T10.5 3.5q0-.625.425-1.062T12 2q.625 0 1.063.438T13.5 3.5q0 .65-.437 1.075T12 5" /></svg>,
            title: t('features.items.3.title'),
            description: t('features.items.3.description'),
            span: 'col3',
        },
        {
            id: 4,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.4 21.9L12 20.5l3.55-3.55l-8.5-8.5L3.5 12l-1.4-1.4l1.4-1.45l-1.4-1.4l2.1-2.1L2.8 4.2l1.4-1.4l1.45 1.4l2.1-2.1l1.4 1.4l1.45-1.4L12 3.5L8.45 7.05l8.5 8.5L20.5 12l1.4 1.4l-1.4 1.45l1.4 1.4l-2.1 2.1l1.4 1.45l-1.4 1.4l-1.45-1.4l-2.1 2.1l-1.4-1.4z" /></svg>,
            title: t('features.items.4.title'),
            description: t('features.items.4.description'),
            span: 'col4',
            blue: true,
        },
        {
            id: 5,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 7q.425 0 .713-.288T13 6t-.288-.712T12 5t-.712.288T11 6t.288.713T12 7m2.825 0h1.75q.75 0 1.3.5t.675 1.225l1.425 10q.125.9-.462 1.588T18 21H6q-.925 0-1.513-.687t-.462-1.588l1.425-10Q5.575 8 6.125 7.5t1.3-.5h1.75q-.075-.25-.125-.487T9 6q0-1.25.875-2.125T12 3t2.125.875T15 6q0 .275-.05.513T14.825 7" /></svg>,
            title: t('features.items.5.title'),
            description: t('features.items.5.description'),
            span: 'col5',
            blue: true,
        },
    ];

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h2 className={style.title}>
                    {t('features.title1')} <span className={style.highlight}>{t('features.title2')}</span>
                </h2>
                <p className={style.subtitle}>
                    {t('features.subtitle')}
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
                        <a
                            href="#"
                            className={`${style.learnMore} ${hoveredCard === feature.id ? style.learnMoreHover : ''}`}
                            onClick={(e) => e.preventDefault()}
                        >
                            {t('features.learnMore')}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;