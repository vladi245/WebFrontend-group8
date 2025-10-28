import styles from './Seperator.module.css';


// variant can be 'dark' or 'accent'
// this is how you pass the value  <Seperator variant="accent" />
const Seperator = ({ variant = 'dark' }) => {
  return <div className={`${styles.separator} ${styles[variant]}`} />;
};

export default Seperator;
