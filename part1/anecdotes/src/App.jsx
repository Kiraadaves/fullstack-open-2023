import { useState } from "react";

const Heading = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

 
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });
 
  
  const handleVote = () => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [selected]: (prevVotes[selected] || 0) + 1,
    }));
  };

  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum);
    setVotes(prevVotes => (
      {
        ...prevVotes,
        [selected]: (prevVotes[selected] || 0)
      }
    ));
  };
  console.log(votes);
   const maxVotesIndex = Object.keys(votes).reduce((a, b) =>
     votes[a] > votes[b] ? a : b
   );
  return (
    <div>
      <Heading text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected] || 0} {votes[selected] > 1 ? "votes" : "vote"}</p>
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdote" onClick={handleClick} />
      <Heading text="Anecdotes with most votes" />
      {votes[selected] > 0 && (
        <div>
          <p>{anecdotes[maxVotesIndex]} </p>
          <p>has {votes[maxVotesIndex]} {votes[maxVotesIndex] > 1 ? "votes" : "vote"}.</p>
        </div>
      )}
    </div>
  );
};

export default App;
