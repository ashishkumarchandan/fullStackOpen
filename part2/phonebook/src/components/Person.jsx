import React from "react";
import PersonP from "./PersonP";

const Person = ({ persons, deletePersonFxn }) => {
  return (
    <div>
      <div>
        {persons.map((person) => {
          return (
            <PersonP
              indP={person}
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
