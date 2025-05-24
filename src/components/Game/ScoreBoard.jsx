import styles from './Game.module.css';
export const ScoreBoard = ({ score, bestScore }) => {
  return (
    <div>
      <p>
        Score:
        <span className={styles.highlight}> {score}</span>
      </p>
      <p>
        Best Score:
        <span className={styles.highlight}> {bestScore}</span>
      </p>
    </div>
  );
};
