import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [arr, setArr] = useState(new Array(props.anecdotes.length + 1).join('0').split('').map(parseFloat))

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const setNewArray = () => {
    const temp = {...arr}
    temp[selected] += 1
    setArr(temp)
  }

  let maxindex = 0;

  let maxvalue = arr[0];

  for (let i = 1; i < props.anecdotes.length; i++) {
    if (arr[i] > maxvalue) {
      maxvalue = arr[i];
      maxindex = i;
    }
  }


  return (
    <>
    <h1>Anecdote of the day</h1>
    <div>
      {props.anecdotes[selected]}
    </div>
    <div>
      has {arr[selected]} votes
    </div>
    <div>
      <button onClick={setNewArray}>vote</button>
      <button onClick={() => setSelected(getRandomInt(0,props.anecdotes.length - 1))}>next anecdote</button>
    </div>
    <h1>Anecdote with most votes</h1>
    <div>
      {props.anecdotes[maxindex]}
    </div>
    <div>
      has {arr[maxindex]} votes
    </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)