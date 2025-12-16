import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/NavbarVerticalAdmin/Navbar';
import SearchBar from './SearchBar/SearchBar';
import UsersTable from './UsersTable/UsersTable';
import styles from './UsersPage.module.css';
import { apiFetch } from '../../services/api';

// Fetch users from backend
async function fetchUsers() {
  const res = await apiFetch('/admin/users');
  return await res.json();
}

export default function UsersPage() {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [users, setUsers] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchUsers().then((data: any) => {
      if (!mounted) return;
      setUsers(data);
      setLoading(false);
    });
    return () => { mounted = false };
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await apiFetch(`/admin/users/${id}`, { method: 'DELETE' });
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const changeType = async (id: string, newType: string) => {
    try {
      const response = await apiFetch(`/admin/users/${id}/type`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: newType })
      });
      const res = await response.json();
      if (res && res.user) {
        setUsers(prev => prev.map(u => (u.id === id ? res.user : u)));
      }
    }
    catch (err) {
      console.error('Account type change failed', err);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter(u => {
      if (roleFilter !== 'all' && (u.type || u.role) !== roleFilter) return false;
      if (!q) return true;
      const name = (u.name || u.username || '').toLowerCase();
      const email = (u.email || '').toLowerCase();
      const role = ((u.type || u.role) || '').toLowerCase();
      return (
        name.includes(q) ||
        email.includes(q) ||
        role.includes(q)
      );
    });
  }, [users, query, roleFilter]);

  return (
    <>
      <Navbar />
      <div style={{ marginLeft: '350px', padding: '20px' }}>
        <h1 className={styles.title}>Admin — Users</h1>
        <div className={styles.controlsRow}>
          <SearchBar
            placeholder="Search by username, email or role"
            value={query}
            onChange={(v) => setQuery(v)}
          />
          <div className={styles.filterWrap}>
            <label className={styles.filterLabel}>Role</label>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className={styles.select}>
              <option value="all">All</option>
              <option value="admin">Admin</option>
              <option value="premium">Premium</option>
              <option value="standard">Standard</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '12px' }}>
          <UsersTable users={filtered} loading={loading} onDelete={handleDelete} onTypeChange={changeType} />
        </div>
      </div>
    </>
  );
}