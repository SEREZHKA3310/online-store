import { useCallback, useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T | object) => {
  const data = localStorage.getItem(key)

  const [value, setValue] = useState<T>(
    () => data ? JSON.parse(data) : initialValue
  );

  const setItem = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  const handleStorage = useCallback(
    (event: StorageEvent) => {
      if (event.key === key && event.storageArea === localStorage) {
        const newValue = event.newValue
        setValue(newValue ? JSON.parse(newValue) : initialValue);
      }
    },
    [key, initialValue],
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [handleStorage]);

  return [value, setItem] as const;
};

export default useLocalStorage;