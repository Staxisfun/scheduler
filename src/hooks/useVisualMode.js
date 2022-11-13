import { useState } from "react";



export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
    } else {
      setMode(newMode);

      setHistory(prev => ([...prev, newMode]));
    }
  }

  function back() {
    let newHistory = [...history];
    if (newHistory.length > 1) {
      setMode(() => newHistory[(newHistory.length - 2)]);
      newHistory.pop();
    }
    setHistory(() => newHistory);

  }

  return { mode, transition, back };
}

