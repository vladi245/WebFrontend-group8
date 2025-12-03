import React, { useEffect, useState } from "react";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import style from './Settings.module.css'
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Navbar from '../../components/NavbarVertical/Navbar';
import LanguageChange from '../../components/LanguageChange/LanguageChange';
import { apiFetch } from '../../services/api';

export default function Settings() {
    const [height, setHeight] = useState<number | ''>('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserHeight = async () => {
            try {
                const data = await apiFetch('api/user/userheight');

            }
            catch (err) {
                console.error('Failed to fetch user height:', err);
            }
        };
        fetchUserHeight();
    }, []);


    const handleSave = async () => {
        setLoading(true);
        setMessage('');
        try {
            const body = { height: height || 0 };
            await apiFetch('/api/user/height', { method: 'PATCH', body: JSON.stringify(body) });
            setMessage('Height saved');
        } catch (err: any) {
            console.error(err);
            setMessage(err?.error || 'Failed to save height');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={style.zoomContainer}>
            <Navbar />

            <div className={style.settingsContainer}>
                <h1 className={style.settingsText}>
                    Settings
                </h1>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                    <label htmlFor="user-height">Your height (cm):</label>
                    <input
                        id="user-height"
                        type="number"
                        min={100}
                        max={250}
                        value={height}
                        onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    <button onClick={handleSave} disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>


                {message && (
                    <div style={{ marginBottom: 12 }}>{message}</div>
                )}

                <LanguageChange />
                <LogoutButton />
                <DeleteButton />

            </div>
        </div>
    );
};
