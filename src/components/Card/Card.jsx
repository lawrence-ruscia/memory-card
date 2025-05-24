import styles from './Card.module.css';
export const Card = ({ url, handleClick }) => {
  return (
    <div className={styles.container} onClick={handleClick}>
      <img className={styles.image} src={url} />
    </div>
  );
};
