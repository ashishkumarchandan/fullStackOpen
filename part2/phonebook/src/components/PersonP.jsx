import React from "react";

const PersonP = ({ individualPerson, deletePerson }) => {
  return (
    <div>
      {console.log(individualPerson)}
      <p>
        {individualPerson.content} {individualPerson.important}
      </p>
      <button onClick={() => deletePerson(individualPerson.id)}>Delete</button>
    </div>
  );
};

export default PersonP;
