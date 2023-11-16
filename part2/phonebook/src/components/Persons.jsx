
const Persons = ({showFilter}) => {
    return (
      <ul>
        {showFilter.map((person) => (
          <li key={person.name}>
            {person.name} {person.phone}
          </li>
        ))}
      </ul>
    );
};

export default Persons;