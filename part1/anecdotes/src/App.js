import React, { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({ content }) => <h1>{content}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [scores, setScores] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)


  const selectRandom = () => {
    const anecdoteIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(anecdoteIndex)
  }

  const voteCurrent = () => {
    const copyScores = [...scores];
    copyScores[selected]++;
    setScores(copyScores);
  }

  const highestRatingsIndex = scores.indexOf(Math.max(...scores))

  return (
    <div>
      <Header content="Anecdote of the day"></Header>
      <div>{anecdotes[selected]}</div>
      <div>has {scores[selected]} votes.</div>
      <Button text="vote" handleClick={voteCurrent}/>
      <Button text="next anecdote" handleClick={selectRandom} />
      
      <Header content="Anecdote with most votes"></Header>
      <div>{anecdotes[highestRatingsIndex]}</div>
      <div>has {scores[highestRatingsIndex]} votes.</div>
    </div>
  )
}

export default App