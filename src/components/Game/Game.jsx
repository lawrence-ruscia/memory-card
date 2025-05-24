import { useState } from 'react';
import { Card } from '../Card/Card';
export const Game = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(score);
  const [cards, setCards] = useState([
    {
      id: 1,
      isClicked: false,
    },
    {
      id: 2,
      isClicked: false,
    },
    {
      id: 3,
      isClicked: false,
    },
    {
      id: 4,
      isClicked: false,
    },
  ]);
  if (score > bestScore) {
    setBestScore(score);
  }

  const handleCardClick = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    if (!clickedCard) {
      return; // Immediately exit if card is not found
    }

    if (clickedCard.isClicked) {
      setScore(0); // reset game
    } else {
      // Update score if card has not been clicked
      setScore((prevScore) => prevScore + 1);

      // Update card obj in array
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === id ? { ...card, isClicked: true } : card
        )
      );
    }
  };

  return (
    <div>
      <div>
        <h1>Neko Match</h1>
        <p>
          Get points by clicking on an image but don't click on any more than
          once!
        </p>
      </div>
      <ScoreBoard score={score} bestScore={bestScore} />
      {cards.map((card) => (
        <Card id={card.id} handleClick={() => handleCardClick(card.id)} />
      ))}
    </div>
  );
};

const ScoreBoard = ({ score, bestScore }) => {
  return (
    <div>
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
    </div>
  );
};
