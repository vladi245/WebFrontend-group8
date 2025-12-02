import React from "react";
import styles from "./MessagesTable.module.css";

export default function MessagesTable({ messages, loading }: any) {

  if (loading) {
    return <p className={styles.loading}>Loading messages...</p>;
  }

  if (!messages.length) {
    return <p className={styles.empty}>No messages found.</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Message</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {messages.map((msg: any) => (
          <tr key={msg.id}>
            <td>{msg.name}</td>
            <td>{msg.email}</td>
            <td className={styles.messageCell}>{msg.message}</td>
            <td>{new Date(msg.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
