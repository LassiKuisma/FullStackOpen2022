import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  )

}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }


  let average = (good * 1 + neutral * 0 + bad * -1) / total;
  let percentPositive = good * 100 / total;

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />

      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average.toFixed(2)} />
      <StatisticLine text="positive" value={percentPositive.toFixed(2).concat('%')} />
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

        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App
