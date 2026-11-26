import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // 1. useState: on first load, read the saved value from localStorage
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue; // if the saved data is broken, start fresh
    }
  });

  // 2. useEffect: every time the value changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}