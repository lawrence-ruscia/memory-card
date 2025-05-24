import { Card } from '../Card/Card';
import styles from './Game.module.css';
export const Deck = ({ cards, handleCardClick }) => {
  return (
    <div className={styles.deck}>
      {cards.map((card) => (
        <Card
          id={card.id}
          url={card.url}
          key={card.id}
          handleClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
};
