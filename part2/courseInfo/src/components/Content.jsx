import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  const totalSum = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);


  return (
    <div>
      <div>
        {parts.map((part) => {
          return <Part key={part.id} specificElement={part} />;
        })}
      </div>
      <div>total of {totalSum} exercises</div>
    </div>
  );
};

export default Content;
