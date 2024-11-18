import { useEffect, useState } from "react";
import { getItem, setItem } from "../components/utils/localStorage";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState(() => {
    const item = getItem(key);
    return (item as T) || initialValue;
  });

  useEffect(() => {
    setItem(key, value);
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
