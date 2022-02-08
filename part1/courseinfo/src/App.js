import React from 'react';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ title, exercises }) => {
  return (
    <p>
      {' '}
      {title} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {' '}
      <Part title={parts[0].name} exercises={parts[0].exercises} />
      <Part title={parts[1].name} exercises={parts[1].exercises} />
      <Part title={parts[2].name} exercises={parts[2].exercises} />
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((prev, cur) => prev + cur.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
