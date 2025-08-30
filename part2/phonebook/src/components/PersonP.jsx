import React from "react";

const PersonP = ({ indP, deletePerson }) => {
  return (
    <div>
      <p>
        {indP.name} {indP.number}
      </p>
      <button onClick={() => deletePerson(indP.id)}>Delete</button>
    </div>
  );
};

export default PersonP;
