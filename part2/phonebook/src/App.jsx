import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "011-3495-758" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filteredUsers, setFilteredUsers] = useState("");

  const showFilter = filteredUsers
    ? persons.filter((user) => user.name.toLowerCase().includes(filteredUsers))
    : persons;

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setFilteredUsers(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const newPerson = {
        name: newName,
        phone: newPhone,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewPhone("");
    }
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilter} value={filteredUsers} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        handleChange={handleChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName}
        newPhone={newPhone}
      />
      <h3>Numbers</h3>
      <Persons showFilter={showFilter} />
    </div>
  );
};

export default App;
