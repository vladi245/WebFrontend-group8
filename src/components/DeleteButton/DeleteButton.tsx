import { useState } from 'react';
import style from './DeleteButton.module.css';

const DeleteButton = () => {
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleConfirmDelete = () => {
        // delete account logic will go here
        try {
            const response = await fetch(`http://localhost:5000/api/users/${}`, {
                method: "DELETE",
            });
            console.log('Account deleted');
            setShowModal(false);
        }
    };

    return (
        <>
            <div className={style.buttonContainer}>
                <button className={style.DeleteButton} onClick={handleDeleteClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" />
                    </svg>
                    Delete account
                </button>
            </div>

            {showModal && (
                <div className={style.modalOverlay} onClick={handleCancel}>
                    <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2 className={style.modalTitle}>
                            You're about to cancel your account. Are You Sure?
                        </h2>
                        <div className={style.modalButtons}>
                            <button className={style.cancelButton} onClick={handleCancel}>
                                Cancel
                            </button>
                            <button className={style.confirmDeleteButton} onClick={handleConfirmDelete}>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteButton;