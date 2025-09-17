import { useEffect } from 'react';

export const useAutoUpdate = (func) => {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(`Auto update every 5 seconds`);
      func();
    }, 5000);

    return () => clearInterval(interval);
  }, [func]);
};