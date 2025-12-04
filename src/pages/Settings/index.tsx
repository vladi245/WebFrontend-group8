import { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import style from './Settings.module.css';
import Navbar from '../../components/NavbarVertical/Navbar';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import ModeButton from '../../components/ModeButton/ModeButton';
import { apiFetch } from '../../services/api';

interface UserData {
    name: string;
    email: string;
    type: string;
    height: number | null;
}

export default function Settings() {
    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        type: 'standard',
        height: null
    });
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [isEditingHeight, setIsEditingHeight] = useState(false);
    const [editedHeight, setEditedHeight] = useState<string>('');

    const fetchUserHeight = async (userId: number) => {
        try {
            const response = await apiFetch(`/api/users/${userId}/height`);
            const data = await response.json();
            if (data.user_height) {
                setUserData(prev => ({ ...prev, height: data.user_height }));
                setEditedHeight(data.user_height.toString());
            }
        } catch (error) {
            console.error('Failed to fetch user height:', error);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserData({
                name: user.name || '',
                email: user.email || '',
                type: user.type || 'standard',
                height: user.height || null
            });
            setEditedName(user.name || '');
            setEditedHeight(user.height?.toString() || '');

            if (user.id) {
                fetchUserHeight(user.id);
            }
        }
    }, []);

    const handleEditName = () => {
        setIsEditingName(true);
    };

    const handleSaveName = async () => {
        if (!editedName.trim()) return;

        try {
            const storedUser = localStorage.getItem('user');
            const user = storedUser ? JSON.parse(storedUser) : null;
            const userId = user?.id;

            if (userId) {
                await apiFetch(`/api/users/${userId}/name`, {
                    method: 'PUT',
                    body: JSON.stringify({ name: editedName })
                });

                //update localstorage
                const updatedUser = { ...user, name: editedName };
                localStorage.setItem('user', JSON.stringify(updatedUser));

                setUserData(prev => ({ ...prev, name: editedName }));
            }
        } catch (error) {
            console.error('Failed to update name:', error);
        }

        setIsEditingName(false);
    };

    const handleCancelEdit = () => {
        setEditedName(userData.name);
        setIsEditingName(false);
    };

    const handleEditHeight = () => {
        setIsEditingHeight(true);
    };

    const handleSaveHeight = async () => {
        const heightNum = parseInt(editedHeight);
        if (isNaN(heightNum) || heightNum < 100 || heightNum > 250) {
            alert('Height must be between 100 and 250 cm');
            return;
        }

        try {
            const storedUser = localStorage.getItem('user');
            const user = storedUser ? JSON.parse(storedUser) : null;
            const userId = user?.id;

            if (userId) {
                await apiFetch(`/api/users/${userId}/heightsave`, {
                    method: 'PUT',
                    body: JSON.stringify({ height: heightNum })
                });

                // Update localStorage
                const updatedUser = { ...user, height: heightNum };
                localStorage.setItem('user', JSON.stringify(updatedUser));

                setUserData(prev => ({ ...prev, height: heightNum }));
            }
        } catch (error) {
            console.error('Failed to update height:', error);
        }

        setIsEditingHeight(false);
    };

    const handleCancelHeightEdit = () => {
        setEditedHeight(userData.height?.toString() || '');
        setIsEditingHeight(false);
    };

    return (
        <div className={style.zoomContainer}>
            <Navbar />

            <div className={style.settingsContainer}>
                <div className={style.card}>
                    <h2 className={style.cardTitle}>Profile details</h2>

                    <div className={style.profileContent}>
                        <div className={style.userIcon}>
                            <UserCircle size={100} strokeWidth={1.5} />
                        </div>

                        <div className={style.profileFields}>
                            <div className={style.fieldRow}>
                                {isEditingName ? (
                                    <input
                                        type="text"
                                        className={style.input}
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        placeholder="Name"
                                        autoFocus
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className={style.input}
                                        value={userData.name}
                                        placeholder="Name"
                                        readOnly
                                    />
                                )}
                                {isEditingName ? (
                                    <div className={style.editActions}>
                                        <button className={style.saveButton} onClick={handleSaveName}>
                                            Save
                                        </button>
                                        <button className={style.cancelButton} onClick={handleCancelEdit}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button className={style.editButton} onClick={handleEditName}>
                                        Edit name
                                    </button>
                                )}
                            </div>

                            <div className={style.fieldRow}>
                                <input
                                    type="text"
                                    className={style.input}
                                    value={userData.email}
                                    placeholder="E-mail"
                                    readOnly
                                />
                            </div>

                            <div className={style.fieldRow}>
                                {isEditingHeight ? (
                                    <input
                                        type="number"
                                        className={style.input}
                                        value={editedHeight}
                                        onChange={(e) => setEditedHeight(e.target.value)}
                                        placeholder="Height (cm)"
                                        min="100"
                                        max="250"
                                        autoFocus
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className={style.input}
                                        value={userData.height ? `${userData.height} cm` : ''}
                                        placeholder="Height (cm)"
                                        readOnly
                                    />
                                )}
                                {isEditingHeight ? (
                                    <div className={style.editActions}>
                                        <button className={style.saveButton} onClick={handleSaveHeight}>
                                            Save
                                        </button>
                                        <button className={style.cancelButton} onClick={handleCancelHeightEdit}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button className={style.editButton} onClick={handleEditHeight}>
                                        Edit height
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className={style.accountType}>
                            <span>Account type: <span className={userData.type === 'premium' ? style.premiumText : ''}>{userData.type}</span></span>
                        </div>
                    </div>
                </div>

                <div className={style.card}>
                    <div className={style.actionsRow}>
                        <ModeButton />
                        <LogoutButton />
                        <DeleteButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
