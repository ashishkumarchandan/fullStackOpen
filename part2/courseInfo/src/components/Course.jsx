import React from "react";
import Header from "./Header";
import Content from "./Content";
const Course = (courseProp) => {
  const { course } = courseProp;

  return (
    <div>
      <div>
        <Header name={course.name} />
      </div>
      <div>
        <Content parts={course.parts}  />
      </div>
    </div>
  );
};

export default Course;
