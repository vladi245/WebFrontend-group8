import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/NavbarVertical/Navbar';
import SearchBar from './SearchBar/SearchBar';
import UsersTable from './UsersTable/UsersTable';
import styles from './UsersPage.module.css';


// Temporary mock fetching function — replace with your real API call
async function fetchUsersMock() {
return new Promise(resolve => {
setTimeout(() => {
resolve([
{ id: '1', name: 'washington', email: 'wash@example.com', type: 'user' },
{ id: '2', name: 'washington', email: 'wash@example2.com', type: 'user' }
]);
}, 350);
});
}


export default function UsersPage() {
const [query, setQuery] = useState('');
const [roleFilter, setRoleFilter] = useState('all');
const [users, setUsers] = useState([] as any[]);
const [loading, setLoading] = useState(true);


useEffect(() => {
let mounted = true;
setLoading(true);
fetchUsersMock().then((data: any) => {
if (!mounted) return;
setUsers(data);
setLoading(false);
});
return () => { mounted = false };
}, []);


const handleDelete = (id: string) => {
// Replace with real delete call
setUsers(prev => prev.filter(u => u.id !== id));
};


const filtered = useMemo(() => {
const q = query.trim().toLowerCase();
return users.filter(u => {
if (roleFilter !== 'all' && u.role !== roleFilter) return false;
if (!q) return true;
return (
u.username.toLowerCase().includes(q) ||
u.email.toLowerCase().includes(q) ||
(u.role || '').toLowerCase().includes(q)
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
<option value="moderator">Moderator</option>
<option value="user">User</option>
</select>
</div>
</div>


<div style={{ marginTop: '12px' }}>
<UsersTable users={filtered} loading={loading} onDelete={handleDelete} />
</div>
</div>
</>
);
}