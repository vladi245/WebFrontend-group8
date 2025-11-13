import React from "react";
import styles from "./Counter.module.css";

interface CounterProps {
  label: string;
  number: number | string;
}

const Counter: React.FC<CounterProps> = ({ label, number }) => {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <span className={styles.number}>{number}</span>
    </div>
  );
};

export default Counter;