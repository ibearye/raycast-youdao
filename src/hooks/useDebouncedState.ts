import { useState, useEffect } from "react";

export default <T>(initial: T, delay: number): [T, (v: T) => void] => {
  const [value, setValue] = useState(initial);
  const [debouncedValue, setDebouncedValue] = useState(initial);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return [debouncedValue, setValue];
};
