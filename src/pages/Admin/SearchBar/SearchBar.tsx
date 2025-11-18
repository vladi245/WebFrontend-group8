import React from 'react';
import styles from './SearchBar.module.css';
import { Search } from 'lucide-react';


interface Props {
placeholder?: string;
value: string;
onChange: (val: string) => void;
}


export default function SearchBar({ placeholder = 'Search...', value, onChange }: Props) {
return (
<div className={styles.wrapper}>
<Search className={styles.icon} />
<input
className={styles.input}
placeholder={placeholder}
value={value}
onChange={(e) => onChange(e.target.value)}
/>
</div>
);
}