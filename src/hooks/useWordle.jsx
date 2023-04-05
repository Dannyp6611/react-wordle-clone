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
  const [turn, setTurn] = useState(0); // max turns is 5
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]); // add each guess as a string
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into an array of letter objects
  // e.g. [{ key: 'a', color: 'yellow' }]

  const formatGuess = () => {
    let solutionArray = [...solution];

    let formattedGuess = [...currentGuess].map((letter) => {
      return {
        key: letter,
        color: 'grey',
      };
    });

    // find any green
    formattedGuess.forEach((l, idx) => {
      if (solutionArray[idx] === l.key) {
        formattedGuess[idx].color = 'green';
        solutionArray[idx] = null;
      }
    });

    // find any yellow colors
    formattedGuess.forEach((l, idx) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[idx].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one turn to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => prevTurn + 1);
    setCurrentGuess('');
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === 'Enter') {
      // only add guess if turn is less than 5
      if (turn > 5) {
        console.log('you used all your guesses');
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log('you already tried that word');
        return;
      }
      // current guess is 5 characters long
      if (currentGuess.length !== 5) {
        console.log('word must be 5 chars long');
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

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
