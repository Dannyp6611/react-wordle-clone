import { useState } from 'react';

const keys = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0); // max turns is 6
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into an array of letter objects
  // e.g. [{ key: 'a', color: 'yellow' }]

  const formatGuess = (guess) => {
    guess.split().map((letter, idx) => {
      return {
        key: letter,
        color:
          guess[idx] === solution[idx]
            ? 'green'
            : solution.includes(letter)
            ? 'yellow'
            : 'grey',
      };
    });
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one turn to the turn state
  const addNewGuess = () => {};

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === 'Backspace') {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    // check if user enters a letter
    if (keys.includes(key.toLowerCase()) && currentGuess.length < 5) {
      setCurrentGuess((prev) => {
        return prev + key;
      });
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
