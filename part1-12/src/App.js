import { useState } from 'react'

const Anecdote = ({ text, points }) => {
  return (
    <div>
      <p>{text}</p>
      <p>Has {points} points.</p>
    </div>
  )
}

const AnecdoteMostPoint = ({ anecdotes, anecdotePoints }) => {
  let noPointsGiven = true;
  let indexOfHighest = 0;
  let highest = 0;

  for (let i = 0; i < anecdotePoints.length; i++) {
    const points = anecdotePoints[i];
    if (points > highest) {
      noPointsGiven = false;
      indexOfHighest = i;
      highest = points;
    }
  }

  if (noPointsGiven) {
    return (
      <>
        <h1>Anecdote with most votes</h1>
        <p>No points given to any anecdotes.</p>
      </>
    )
  }

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[indexOfHighest]} points={anecdotePoints[indexOfHighest]} />
    </>
  )
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    let random = randomInt(anecdotes.length);
    setSelected(random);
  };

  const handleVote = () => {
    let copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote text={anecdotes[selected]} points={points[selected]} />
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNextAnecdote}>next anecdote</button>
      </div>
      <div>
        <AnecdoteMostPoint anecdotes={anecdotes} anecdotePoints={points} />
      </div>
    </>
  )
}

export default App
