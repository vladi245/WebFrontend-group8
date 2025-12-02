import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavbarVerticalAdmin/Navbar';
import styles from './MessagesPage.module.css';
import { apiFetch } from '../../services/api';
import MessagesTable from './MessagesTable/MessagesTable';

export default function MessagesPage() {
  const [messages, setMessages] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await apiFetch('/api/contact');
        if (!mounted) return;
        setMessages(data);
      } catch (err) {
        console.error("Failed to load messages", err);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false };
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <h1 className={styles.title}>Admin — Contact Messages</h1>

        <div className={styles.tableWrapper}>
          <MessagesTable messages={messages} loading={loading} />
        </div>
      </div>
    </>
  );
}
