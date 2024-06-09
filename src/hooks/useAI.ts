// src/hooks/useAuth.js
import { useState } from 'react';

const useAI = () => {
  const [tiredOfAI, setTiredOfAI] = useState<boolean>(true);

  return {
    tiredOfAI,
    setTiredOfAI,
  };
};

export default useAI;
