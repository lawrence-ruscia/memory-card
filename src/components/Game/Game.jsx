import { useState, useEffect } from 'react';
import { getCards } from '../../card-images';
import { ScoreBoard } from './ScoreBoard';
import { Deck } from './Deck';
import styles from './Game.module.css';

export const Game = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState(null);

  if (score > bestScore) {
    setBestScore(score);
  }

  useEffect(() => {
    async function fillCards() {
      const cardData = await getCards();
      setCards(cardData);
    }
    fillCards();
  }, []);

  const resetCards = (cards) => {
    const newCards = cards.map((card) => {
      return { ...card, isClicked: false };
    });

    return newCards;
  };

  const updateCard = (cards, id) => {
    const newCards = cards.map((card) =>
      card.id === id ? { ...card, isClicked: true } : card
    );

    return newCards;
  };

  const handleCardClick = async (id) => {
    console.log(`Clicked card: ${id}`);
    const clickedCard = cards.find((card) => card.id === id);
    if (!clickedCard) {
      return; // Immediately exit if card is not found
    }

    if (clickedCard.isClicked) {
      // Reset and shuffle cards
      setCards((prevCards) => {
        const latestCards = resetCards(prevCards);
        const newCards = shuffleCards(latestCards);
        return newCards;
      });

      setScore(0);
    } else {
      // Update score if card has not been clicked
      setScore((prevScore) => prevScore + 1);

      // Update card obj in array
      setCards((prevCards) => {
        const latestCards = updateCard(prevCards, id);
        const newCards = shuffleCards(latestCards);
        return newCards;
      });
    }
  };

  // Use Fisher-Yates shuffle to shuffle cards array
  const shuffleCards = (cards) => {
    const cardsCopy = [...cards];
    for (let i = cardsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
      [cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]]; // Swap cards
    }

    return cardsCopy;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.highlight}>Neko Match</h1>
          <p>
            Get points by clicking on an image but don't click on any more than
            once!
          </p>
        </div>
        <ScoreBoard score={score} bestScore={bestScore} />
      </div>
      {cards === null ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.content}>
          <Deck cards={cards} handleCardClick={handleCardClick} />
        </div>
      )}
    </div>
  );
};
