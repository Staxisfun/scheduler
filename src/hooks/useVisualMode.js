import { useState } from "react";



export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  //for transitioning to a new mode
  const transition = (stateMode, replace = false) => {

    setMode(stateMode);

    setHistory((prev) => {
      const newhistory = [...prev];
      if (replace) {
        newhistory[newhistory.length - 1] = stateMode;
      } else {
        newhistory.push(stateMode);
      }
      return newhistory;
    });
  };

  //for returning to a previous mode
  const back = () => {
    const prevMode = [...history][(history.length - 2)];

    if (history.length > 1) {
      setMode(prevMode);
    }
    setHistory((prev) => {
      const newhistory = [...prev];
      newhistory.pop();
      return newhistory;
    });
  };


  return { mode, transition, back };
}

