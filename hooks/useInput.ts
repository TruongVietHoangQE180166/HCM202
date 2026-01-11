
import { useEffect, useRef } from 'react';

export const useInput = () => {
  const keysRef = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const hkd = (e: KeyboardEvent) => keysRef.current[e.key.toLowerCase()] = true;
    const hku = (e: KeyboardEvent) => keysRef.current[e.key.toLowerCase()] = false;
    
    window.addEventListener('keydown', hkd);
    window.addEventListener('keyup', hku);
    
    return () => {
      window.removeEventListener('keydown', hkd);
      window.removeEventListener('keyup', hku);
    };
  }, []);

  return keysRef;
};
