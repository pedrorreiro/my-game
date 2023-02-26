import { useContext, useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import { GameContext } from './contexts/GameProvider';
import { LEVELS } from './utils/constraints';
import { createCards } from './utils/functions';
export function Game() {

  const { playing,
    setPlaying,
    cards,
    lives,
    setCards,
    points,
    fillLives,
    currentLevel
  } = useContext(GameContext)

  const prepareCards = async (cards) => {
    console.log("Organizando cartas");
    const result = createCards(cards);
    setCards(result);;

  }

  const [counter, setCounter] = useState(0);
  const [counting, setCounting] = useState(false);

  const contar = (number) => {

    setCounter(number);
    setCounting(true);

    const interval = setInterval(() => {

      setCounter(number);
      number--;
      setCounter(number);

      if (number === 0) {
        clearInterval(interval);
        flipAll();
        setPlaying(true);
        setCounting(false);
      }
    }, 1000);

  }


  const flipAll = () => {
    cards.forEach(card => {
      card.isFlipped = !card.isFlipped;
    });
    setCards([...cards]);
  }
  useEffect(() => {

    prepareCards(LEVELS[currentLevel].cards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel]);

  const play = () => {
    setPlaying(true);
    fillLives();
    flipAll();
    contar(5);
  }

  return (

    <div className="App">

      <header>

        {playing && <h2 className='level'>Nível {currentLevel}</h2>}

        {counting && <h2>{counter} segundos</h2>}
        {!counting && playing &&
          <div className='placar'>
            <div>
              <h2>Pontos: {points}</h2>
            </div>
            <div>
              {
                Array(lives).fill().map((_, index) => <span className='life' key={index}>❤</span>)
              }
            </div>
          </div>
        }

      </header>


      {cards && !playing && <button onClick={() => play()}>JOGAR</button>}

      <div className="cards">
        {cards &&
          cards.map(card =>
            <Card card={card} key={card.id} />
          )
        }
      </div>
    </div >
  );
}

export default Game;
