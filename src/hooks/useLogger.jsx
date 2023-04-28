/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export default function useLogger(key) {
  const [value, setValue] = useState(null);

  const setValueAndPersist = (newValue) => {
    //console.log('newValue', newValue)
    if (newValue !== undefined && newValue !== value) {
      setValue(newValue);
      return localStorage.setItem(key, JSON.stringify(newValue));
    }
    return value;
  };

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem(key));
    if (item) {
      setValue(item);
    }
  }, []);

  return [value, setValueAndPersist];
}