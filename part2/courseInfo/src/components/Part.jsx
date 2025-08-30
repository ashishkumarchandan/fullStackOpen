import React from "react";

const Part = ({ specificElement }) => {
  return (
    <div>
      <p>
        {" "}
        {specificElement.name} {specificElement.exercises}{" "}
      </p>
    </div>
  );
};

export default Part;
