import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './LogoutButton.module.css';
import { logout } from '../../services/api';
import { useTranslation } from 'react-i18next';

const LogoutButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        logout();
        navigate('/login');
    }, [navigate]);

    return (
        <div className={style.buttonContainer}>
            <button className={style.LogoutButton} onClick={handleLogout}>
                {t('logoutButton.Logout')}
            </button>
        </div>
    );
}

export default LogoutButton;