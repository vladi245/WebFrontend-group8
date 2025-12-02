import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './DeleteButton.module.css';
import { apiFetch, logout } from '../../services/api';
import { useTranslation } from 'react-i18next';
const DeleteButton = () => {
    const { t } = useTranslation();

    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleConfirmDelete = useCallback(async (id: string | null) => {
        if (!id) {
            setError('No user id found');
            return;
        }

        setLoading(true);
        setError('');
        try {
            // backend exposes user deletion under the admin routes mounted at /admin
            await apiFetch(`/admin/users/${id}`, { method: 'DELETE' });
            // clear local data and redirect to login
            logout();
            setShowModal(false);
            navigate('/login');
        } catch (err: any) {
            console.error('Delete failed', err);
            setError(err?.error || err?.message || 'Delete failed');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    // get current user id from localStorage
    const userJson = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    let user: any = null;
    try {
        user = userJson ? JSON.parse(userJson) : null;
    } catch (e) {
        user = null;
    }
    const userId = user?._id || user?.id || null;

    return (
        <>
            <div className={style.buttonContainer}>
                <button className={style.DeleteButton} onClick={handleDeleteClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" />
                    </svg>
                    {t('deleteButton.DeleteAccount')}
                </button>
            </div>

            {showModal && (
                <div className={style.modalOverlay} onClick={handleCancel}>
                    <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2 className={style.modalTitle}>
                            {t('deleteButton.WarningMessage')}
                        </h2>
                        <div className={style.modalButtons}>
                            <button className={style.cancelButton} onClick={handleCancel}>
                                Cancel
                            </button>
                            <button
                                className={style.confirmDeleteButton}
                                onClick={() => handleConfirmDelete(userId)}
                                disabled={loading}
                            >
                                {loading ? 'Deleting…' : t('deleteButton.DeleteAccount')}
                            </button>
                        </div>
                        {error && <p className={style.errorText}>{error}</p>}
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteButton;