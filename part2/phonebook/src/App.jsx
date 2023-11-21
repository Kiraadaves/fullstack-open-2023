import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import noteService from "./components/personsdata";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filteredUsers, setFilteredUsers] = useState("");
  const [notification, setNotification] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const showFilter = filteredUsers
    ? persons.filter((user) => user.name.toLowerCase().includes(filteredUsers))
    : persons;

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setFilteredUsers(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (persons.some((person) => person.name === newName)) {
    //   alert(`${newName} is already added to the phonebook`);
    // } else {
    //   const newPerson = {
    //     name: newName,
    //     number: newPhone,
    //   };
    // previous code to check if the newName is same with an already exixting name. if this returns true, an allert is shown otherwise, the newphone and newname is added
    //   noteService.create(newPerson)
    //     .then(returnedPersons => {
    //      setPersons(persons.concat(returnedPersons));
    //      setNewName("");
    //      setNewPhone("");
    //   })

    // }

    const prevPersons = persons.find((person) => person.name === newName);
    if (prevPersons) {
      const toUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (toUpdate) {
        const updatedPerson = { ...prevPersons, number: newPhone };
        noteService
          .update(prevPersons.id, updatedPerson)
          .then((returnedPersons) => {
            setPersons(
              persons.map((person) =>
                person.id === prevPersons.id ? returnedPersons : person
              )
            );
            setNewName("");
            setNewPhone("");
            setNotification(true);
            setNotificationMessage(
              `${newName}'s phone number has succesfully been updated`
            );

            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch(() => {
            setNotificationMessage(
              `Information of ${newName} has already been removed from server`
            );
            setNotification(!notification);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newPhone,
      };
      noteService
        .create(newPerson)
        .then((returnedPersons) => {
          setPersons(persons.concat(returnedPersons));
          setNotificationMessage(`${newName} has succesfully been added`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setNewName("");
          setNewPhone("");
          setNotificationMessage(`Added ${newName}`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(() => {
          setNotificationMessage(`Error adding ${newName}`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const deleteNote = (id, name) => {
    console.log(id);
    const confirm = window.confirm(`Delete ${name} ?`);
    if (confirm) {
      noteService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        setNotification(true);
        setNotificationMessage(`Successfully deleted ${name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
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
      <Notification
        message={notificationMessage}
        className={`${notification ? "success" : "error"}`}
      />
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
      <ul>
        {showFilter.map((person) => (
          <Persons
            key={person.id}
            person={person}
            deleteNote={() => deleteNote(person.id, person.name)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
