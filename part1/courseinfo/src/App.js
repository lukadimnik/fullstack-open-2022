import React from 'react';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ content }) => {
  return (
    <>
      {' '}
      <p>
        {content.part1.title} {content.part1.exercises}
      </p>
      <p>
        {content.part2.title} {content.part2.exercises}
      </p>
      <p>
        {content.part3.title} {content.part3.exercises}
      </p>
    </>
  );
};

const Total = ({ exercises }) => {
  const total = exercises.reduce((prev, cur) => prev + cur);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const courseContent = {
    part1: {
      title: 'Fundamentals of React',
      exercises: 10,
    },
    part2: {
      title: 'Using props to pass data',
      exercises: 7,
    },
    part3: {
      title: 'State of a component',
      exercises: 14,
    },
  };

  const exercises = [10, 7, 14];

  return (
    <div>
      <Header course={course} />
      <Content content={courseContent} />
      <Total exercises={exercises} />
    </div>
  );
};

export default App;
