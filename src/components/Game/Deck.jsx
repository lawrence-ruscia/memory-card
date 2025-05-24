import { Card } from '../Card/Card';
export const Deck = ({ cards, handleCardClick }) => {
  return (
    <div>
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
