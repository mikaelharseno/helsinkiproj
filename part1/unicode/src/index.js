import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
  return (
      <tr><td>{props.text}</td><td>{props.value}</td></tr>
    )
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad

  const fun = () => {
    if (props.good > 0 || props.neutral > 0 || props.bad > 0) {
      return (
        <>
          <Statistic text="good" value={props.good} />
          <Statistic text="neutral" value={props.neutral} />
          <Statistic text="bad" value={props.bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={(props.good - props.bad) / total} />
          <Statistic text="positive" value={((props.good) * 100 / total) + ' %'} />
        </>
        )
    } else {
      return (
        <>
        <p>No feedback given </p>
        </>
      )
    }
  }

  return (
    <>
      <h1>statistics</h1>
      {fun()}
    </>
    )
}

const Button = (props) => {
  return (
    <button onClick={props.func}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button func={() => setGood(good+1)} text="good" />
      <Button func={() => setNeutral(neutral+1)} text="neutral" />
      <Button func={() => setBad(bad+1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)