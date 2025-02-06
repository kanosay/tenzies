import Dice from './component/dice'
import { nanoid } from "nanoid"
import React from 'react'
import Confetti from "react-confetti"
import Timer from './component/timer'

function App() {
  let [dices, setDices] = React.useState(() => generateAllDices())
  const [startTimer, setStartTimer] = React.useState(false) 

  const [timeReset, setTimeReset] = React.useState(false) 

  function generateAllDices() {
    return new Array(10).fill(0).map(function(){
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    })
  }

  function generateDicesInHtml() {
    setDices(function(prev){
      return prev.map(function(value){
        if (value.isHeld) {
          return value
       } else {
          return {...value, value: Math.ceil(Math.random() * 6)}
       }
      })
    })
  }

  function heldId(id) {
    setDices(function(prev){
      return prev.map(function(elem){
        return id === elem.id ? {...elem, isHeld: !elem.isHeld} : elem
      })
    })
  }

  const diceElement = dices.map(function(prev){
    return <Dice isHeld={prev.isHeld} key={prev.id} value={prev.value} hold={() => heldId(prev.id)} />
  })

  const gameWon = dices.every(value => value.isHeld) && dices.every(value => value.value === dices[0].value);

  function handleRoll() {
    if (gameWon) {
      setDices(generateAllDices()) 
      setTimeReset(true) 
    } else {
      generateDicesInHtml()
    }
    setStartTimer(true) 
  }

  return (
    <main className="main">
      {gameWon ? <Confetti /> : ''}
      {gameWon ? <h1 className='gameWon'>You won the game</h1> : ''}
      <div className="main__inner">
        {diceElement}
      </div>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze</p>
      <button onClick={handleRoll} className='main__btn'>{gameWon ? 'New Game' : 'Roll'}</button>
      <Timer start={startTimer} gameWon={gameWon} reset={timeReset} /> 
    </main>
  )
}

export default App
