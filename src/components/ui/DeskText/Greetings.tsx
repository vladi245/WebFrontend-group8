import styles from './Greeting.module.css';
import { useTranslation } from 'react-i18next';

interface GreetingProps {
  name?: string;
}

const Greeting = ({ name }: GreetingProps) => {
  const { t } = useTranslation();
  return (
    <>
      <h1 className={styles.greeting}>
        {name ? (
          <>
            {t('deskGreeting.hello')}, <span className={styles.name}>{name}</span>!
          </>
        ) : (
          t('deskGreeting.helloGuest')
        )}
      </h1>
      <h3 className={styles.sub}>
        {t('deskGreeting.manageDesk')}
      </h3>
    </>
  );
};

export default Greeting;
