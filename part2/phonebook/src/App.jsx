import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Person from "./components/Person";
import axios from "axios";
import personsService from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log(`effect`);
    const populate = async () => {
      try {
        const response = await personsService.getAll();

        setPersons(response);
      } catch (error) {
        console.log(`Failed to fetch person data ${error}`);
      }
    };

    populate();
  }, []);

  const addPerson = async (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => {
      return person.name === newName;
    });

    if (existingPerson) {
      // alert(`${newName} is already added to phonebook`);
      // return;

      if (
        window.confirm(
          `${newName} is already inside phoneBook, replace it with new Neumber`
        )
      ) {
        try {
          const changedPerson = { ...existingPerson, number: newNumber };
          const returnedPerson = await personsService.update(
            existingPerson.id,
            changedPerson
          );

          const updatedPersons = persons.map((person) => {
            if (person.id === existingPerson.id) {
              return returnedPerson;
            }
            return person;
          });

          setNewName("");
          setNewNumber("");
        } catch (error) {
          console.log("Failed to update person:", error);
        }
      }
      return;
    }

    const personObj = {
      name: newName,
      number: newNumber,
    };

    try {
      const returnedPerson = await personsService.create(personObj);

      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    } catch (error) {
      console.error("Failed to create person:", error);
    }
  };

  const deletePerson = async (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      try {
        const response = await personsService.remove(id);
        const updatedPerson = persons.filter((p) => {
          return p.id !== id;
        });
        setPersons(updatedPerson);
      } catch (error) {}
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personToShow =
    filter === ""
      ? persons
      : persons.filter((person) => {
          return person.name.toLowerCase().includes(filter.toLowerCase());
        });

  return (
    <>
      <h2>PhoneBook</h2>
      <Filter value={filter} onchange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onsubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Person persons={personToShow} deletePersonFxn={deletePerson} />
    </>
  );
}

export default App;
