import React from 'react';
import Row from './Row';

const Grid = ({ currentGuess, guesses, turn }) => {
  return (
    <div>
      {guesses.map((guess, idx) => (
        <Row key={idx} />
      ))}
    </div>
  );
};

export default Grid;
