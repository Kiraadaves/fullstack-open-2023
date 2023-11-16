const Filter = ({ onChange, value }) => {
  return (
    <div>
    filter: <input onChange={onChange} value={value} />
  </div>
  )
};

export default Filter;
