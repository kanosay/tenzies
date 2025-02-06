import Dice from './component/dice'
import { nanoid } from "nanoid"
import React from 'react'

function App() {
  let [dices, setDices] = React.useState(() => generateAllDices())

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
    setDices(generateAllDices)
  }

  const diceElement = dices.map(function(prev){
    return <Dice key={prev.id} value={prev.value} />
  })

  return (
    <main className="main">
      <div className="main__inner">
        {diceElement}
      </div>
      <button onClick={() => generateDicesInHtml()} className='main__btn'>Roll</button>
    </main>
  )
}

export default App
