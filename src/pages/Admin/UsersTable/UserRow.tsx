import React from 'react';
import styles from './UserRow.module.css';
import { Trash2 } from 'lucide-react';


interface User {
    id: string;
    name: string;
    email: string;
    type: string;
}


interface Props {
    user: User;
    onDelete: (id: string) => void;
    onTypeChange?: (id: string, newType: string) => void;
}


export default function UserRow({ user, onDelete, onTypeChange }: Props) {
    const handleDelete = () => {
        if (confirm(`Delete user ${user.name}? This action cannot be undone.`)) {
            onDelete(user.id);
        }
    };


    return (
        <div className={styles.row}>
            <div className={styles.colUser}>
                <div className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
                <div>
                    <div className={styles.username}>@{user.name}</div>
                    <div className={styles.sub}>{user.id}</div>
                </div>
            </div>


            <div className={styles.colEmail}>{user.email}</div>
            <div className={styles.colRole}>
                {user.type === 'admin' ? (
                    <span className={styles.role}>{user.type}</span>
                ) : (
                    <select
                        className={styles.roleSelect}
                        value={user.type || 'standard'}
                        onChange={(e) => {
                            const t = e.target.value;
                            if (onTypeChange) onTypeChange(user.id, t);
                        }}
                    >
                        <option value="standard">standard</option>
                        <option value="premium">premium</option>
                    </select>
                )}
            </div>
            <div className={styles.colActions}>
                <button className={styles.deleteBtn} onClick={handleDelete} title="Delete user">
                    <Trash2 className={styles.trashIcon} />
                    <span className={styles.deleteText}>Delete</span>
                </button>
            </div>
        </div>
    );
}