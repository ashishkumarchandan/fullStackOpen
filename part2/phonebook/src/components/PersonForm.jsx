import React from "react";

const PersonForm = ({
  onsubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <div>
      <form onSubmit={onsubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>

            <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
