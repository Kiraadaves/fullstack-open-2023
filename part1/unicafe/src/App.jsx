import { useState } from "react";

const Button = ({text, onClick}) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({text, value, percent}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value} {percent}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({all, good, neutral, bad, average, positive}) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} percent='%' />
    </table>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
   const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  
  const handleGood = () => {
    const newGood = good + 1;
    setGood(newGood)
    setAll(newGood + neutral + bad)
    const averageVal = (newGood - bad) / (all + 1);
    setAverage(averageVal.toFixed(1))
    const num = (newGood / (all + 1)) * 100;
    setPositive(num.toFixed(1))
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    setAll(good + newNeutral + bad)
    const averageVal = (good - bad) / (all + 1);
    setAverage(averageVal.toFixed(1));
    setPositive(((good / (all + 1)) * 100).toFixed(1));
  };
  const handleBad = () => {
    const newBad = bad + 1;
    setBad(newBad);
    setAll(good + neutral + newBad);
    const averageVal = (good - newBad) / (all + 1);
    setAverage(averageVal.toFixed(1));
    setPositive(((good / (all + 1)) * 100).toFixed(1));
  };
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />
      <h1>statistics</h1>
      <Statistics
        all={all}
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
