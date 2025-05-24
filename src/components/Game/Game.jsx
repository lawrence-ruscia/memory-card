import { useState, useEffect } from 'react';
import { Card } from '../Card/Card';
import { getCards } from '../../card-images';

export const Game = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState(null);

  if (score > bestScore) {
    setBestScore(score);
  }

  async function fetchCards() {
    const cardData = await getCards();
    setCards(cardData);
  }

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCardClick = async (id) => {
    console.log(`Clicked card: ${id}`);
    const clickedCard = cards.find((card) => card.id === id);
    if (!clickedCard) {
      return; // Immediately exit if card is not found
    }

    if (clickedCard.isClicked) {
      // Reset and shuffle cards if player clicks an already clicked
      fetchCards();
      shuffleCards(cards);

      setScore(0);
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

  // Use Fisher-Yates shuffle to shuffle cards array
  const shuffleCards = (cards) => {
    const cardsCopy = [...cards];
    for (let i = cardsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
      [cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]]; // Swap cards
    }
    console.log(cardsCopy);

    return cardsCopy;
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
      {cards === null ? (
        <div>Loading...</div>
      ) : (
        <>
          <ScoreBoard score={score} bestScore={bestScore} />
          <Deck cards={cards} handleCardClick={handleCardClick} />
        </>
      )}
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

const Deck = ({ cards, handleCardClick }) => {
  return (
    <div>
      {cards.map((card) => (
        <Card
          id={card.id}
          key={card.id}
          handleClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
};
