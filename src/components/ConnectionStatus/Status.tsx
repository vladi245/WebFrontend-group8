import React from 'react';
import style from './Status.module.css'
interface StatusProps {
    connectionLabel: string;
    currentDeskLabel: string;
    statusColor?: string;

}


const Status: React.FC<StatusProps> = ({ connectionLabel, currentDeskLabel, statusColor }) => {
    return (
        <p className={style.StatusText}> <span className={style.StatusCircle} style={{ backgroundColor: statusColor }}></span> <span className={style.StatusLabel} style={{ color: statusColor }}> {connectionLabel} </span>{currentDeskLabel}</p>


    );
};
export default Status;



