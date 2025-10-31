import React, { useState } from 'react';
import style from './DeletePopUp.module.css';

export default function Modal() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <>
            <button
                onClick={toggleModal}
                className={style.btnmodal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" />
                </svg>
                Delete account
            </button>

            <div className={style.modal}>
                <div className={style.modalcontent}>
                    <h1>Are you sure you want to delete your account?</h1>
                    <button className={style.closemodal} onClick={toggleModal}>No</button>
                    <button className={style.DeleteAccount}>Yes</button>
                </div>
            </div>
        </>


    )

}