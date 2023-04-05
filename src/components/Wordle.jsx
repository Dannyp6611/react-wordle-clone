import React, { useEffect } from 'react';
import Grid from './Grid';
import useWordle from '../hooks/useWordle';

const Wordle = ({ solution }) => {
  const { handleKeyup, currentGuess, guesses, isCorrect, turn } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [handleKeyup]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <>
      <div>solution - {solution}</div>
      <div>current guess - {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
    </>
  );
};

export default Wordle;
