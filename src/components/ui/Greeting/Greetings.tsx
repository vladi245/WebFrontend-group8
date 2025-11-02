import styles from './Greeting.module.css';

interface GreetingProps {
  name?: string;
}

const Greeting = ({ name }: GreetingProps) => {
  return (
    <>
      <h1 className={styles.greeting}>
        {name ? (
          <>
            Hello, <span className={styles.name}>{name}</span>!
          </>
        ) : (
          'Hello, Guest!'
        )}
      </h1>
      <h3 className={styles.sub}>
        Today is a great day to be fit.
      </h3>
    </>
  );
};

export default Greeting;
