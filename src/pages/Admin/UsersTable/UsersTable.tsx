import React from 'react';
import UserRow from './UserRow';
import styles from './UsersTable.module.css';


interface User {
    id: string;
    name: string;
    email: string;
    type: string;
    status?: string;
}


interface Props {
    users: User[];
    loading?: boolean;
    onDelete: (id: string) => void;
    onTypeChange?: (id: string, newType: string) => void;
}


export default function UsersTable({ users, loading, onDelete, onTypeChange }: Props) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>Users</h3>
                <span className={styles.count}>{users.length}</span>
            </div>


            <div className={styles.tableWrap}>
                <div className={styles.tableHeader}>
                    <div className={styles.colUser}>User</div>
                    <div className={styles.colEmail}>Email</div>
                    <div className={styles.colRole}>Role</div>
                    <div className={styles.colActions}>Actions</div>
                </div>


                {loading ? (
                    <div className={styles.loading}>Loading users…</div>
                ) : users.length === 0 ? (
                    <div className={styles.empty}>No users found.</div>
                ) : (
                    <div className={styles.tableBody}>
                        {users.map(u => (
                            <UserRow key={u.id} user={u} onDelete={onDelete} onTypeChange={onTypeChange} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}