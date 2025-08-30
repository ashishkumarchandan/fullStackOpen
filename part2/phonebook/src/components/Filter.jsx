import React from "react";

const Filter = ({ value, onchange }) => {
  return (
    <div>
      Filter show with
      <input value={value} onChange={onchange} />
    </div>
  );
};

export default Filter;
