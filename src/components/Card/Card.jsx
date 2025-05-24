import { useState } from 'react';
import styles from './Card.module.css';
export const Card = ({ url, handleClick }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={styles.container} onClick={handleClick}>
      {!loaded && <div>Loading...</div>}
      <img
        className={`${loaded ? styles.loaded : styles.image}`}
        src={url}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
