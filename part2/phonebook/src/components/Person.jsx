import React from "react";
import PersonP from "./PersonP";

const Person = ({ persons, deletePersonFxn }) => {
  return (
    <div>
      <div>
        {persons.map((person) => {
          // console.log(`${person.content} says 3@!`);

          return (
            <PersonP
              individualPerson={person}
              deletePerson={deletePersonFxn}
              key={person.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Person;
