import React from 'react';
import Part from './Part';

const Content = ({ content }) => {
  return content.map((part, index) => (
    <Part key={index} name={part.name} exercises={part.exercises} />
  ));
};

export default Content;
