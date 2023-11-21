import Button from "./Button";
const Persons = ({ person, deleteNote }) => {
  return (
    <li>
      {person.name} {person.number} <Button deleteNote={deleteNote}/>
    </li>
  );
};

export default Persons;
