import { useState, useEffect } from 'react';
import { nanoid } from "nanoid";
import Dice from './components/Dice';
import Timer from './components/Timer';
import Confetti from 'react-confetti';



function App() {
  const [dice, setDice] = useState(() => generateAllDices());
  const [time, setTime] = useState(30);
  const [isRunning, setIsRunning] = useState(false);

  const gameWon = dice.every(value => value.isHeld) && dice.every(value => value.value === dice[0].value);

  function generateAllDices() {
    return new Array(10).fill(5).map(value => {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    });
  }

  const dices = dice.map(dice => {
    return <Dice
      value={dice.value}
      isHeld={dice.isHeld}
      key={dice.id}
      toggle={toggleHeld}
      id={dice.id}
      isRunning={isRunning}
    />
  })

  function rollDices() {
    if (!gameWon) {
      setDice(prevDice => {
        return prevDice.map(value => {
          if (value.isHeld) {
            return value
          } else {
            return {
              ...value,
              value: Math.ceil(Math.random() * 6)
            }
          }
        })
      })
    } else {
      setDice(() => generateAllDices())
    }
  }

  function toggleHeld(id) {
    setDice(prevDice => {
      return prevDice.map(value => {
        if (value.id === id) {
          return {
            ...value,
            isHeld: !value.isHeld
          }
        } else {
          return value
        }
      })
    })
  }


  useEffect(() => {
    if (!isRunning || gameWon) {
      if (gameWon) {
        setTime(30); 
      }
      return;
    };

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval); 
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, [isRunning, gameWon]);

  const startTimer = () => {
    setTime(30);
    setIsRunning(true);
  };


  return (
    <main className='main'>
      {gameWon ? <Confetti /> : null}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <Timer time={time} />
      <div className="main__container">
        {dices}
      </div>
      <button onClick={!isRunning ? startTimer : rollDices} className='rollBtn'>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
