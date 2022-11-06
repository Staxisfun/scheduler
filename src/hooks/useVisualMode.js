import { useState } from "react";



export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace = false) {
   if (replace) {
    setMode(newMode);
   }else {
    setMode(newMode); 
    setHistory([...history, newMode]);
  }
}

  function back() {
  let newHistory = [...history];
  if (newHistory.length > 1) {
   setMode((prev) => newHistory[(newHistory.length - 1)]);
   console.log("mode", mode)
   console.log("history", history)
  }
  newHistory.pop();
  setHistory((prev) => newHistory);
}

  return { mode, transition, back };
}

