import React from "react";
import noteService from '../services/notes'

const DisplayPeople = ({ persons, search, setPersons }) => {
  const displayPeople = () => {
    var people = [];
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase().includes(search.toLowerCase())) {
        people = people.concat(persons[i]);
      }
    }
    return people;
  };

  return (
    <>
      {displayPeople().map((person) => (
        <p key={person.name}>
          {person.name} {person.number} <button value={person.id} onClick={() => {
            if (window.confirm(`Delete: ${person.name}?`)) {
              noteService.del(person.id).then(() => {
                setPersons(persons.filter(p => p.id !== person.id))})
            }
          }}>delete</button>
        </p>
      ))}
    </>
  );
};

export default DisplayPeople;
