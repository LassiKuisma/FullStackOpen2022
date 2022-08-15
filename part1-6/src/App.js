import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodRating = () => {
    setGood(good + 1);
  };

  const handleNeutralRating = () => {
    setNeutral(neutral + 1);
  };

  const handleBadRating = () => {
    setBad(bad + 1);
  };


  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <Button handleClick={handleGoodRating} text='good' />
        <Button handleClick={handleNeutralRating} text='neutral' />
        <Button handleClick={handleBadRating} text='bad' />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App
