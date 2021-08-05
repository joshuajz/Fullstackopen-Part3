import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import NumberForm from "./components/Form";
import DisplayPeople from "./components/DisplayPeople";
import noteService from "./services/notes";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState("");
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [notification, setNotification] = useState(null);
  const [colour, setColour] = useState("black");

  useEffect(() => {
    noteService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace the old number with ${phoneNumber}?`
        )
      ) {
        const person = persons.filter((p) => p.name === newName)[0];
        const newPerson = { ...person, number: phoneNumber };
        noteService
          .update(newPerson)
          .then(() => {
            setPersons(
              persons.map((p) => (p.id !== newPerson.id ? p : newPerson))
            );
            setColour("green");
            setNotification(
              `"${newPerson.name}" 's phone number was successfully edited!`
            );
            console.log(person, newPerson, persons);
            setTimeout(() => {
              setNotification(null);
              setColour("black");
            }, 5000);
          })
          .catch((error) => {
            setNotification(
              `"${person.name}" was already removed from the server.`
            );
            setColour("red");
            setTimeout(() => {
              setNotification(null);
              setColour("black");
            }, 5000);
          });
      }
      setNewName("");
      setPhoneNumber("");
    } else {
      const addedPerson = { name: newName, number: phoneNumber };

      noteService.create(addedPerson).then((response) => {
        console.log(response);
        setPersons(persons.concat(response));
        setColour("green");
        setNotification(`"${addedPerson.name}" was added to the server!`);
        setTimeout(() => {
          setNotification(null);
          setColour("black");
        }, 5000);
      });
      setNewName("");
      setPhoneNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} colour={colour} />
      <Filter value={search} onChange={handleSearchChange} />
      <h2>New</h2>
      <NumberForm
        name={newName}
        onName={handleNameChange}
        number={phoneNumber}
        onNumber={handlePhoneNumberChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <DisplayPeople
        persons={persons}
        search={search}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
