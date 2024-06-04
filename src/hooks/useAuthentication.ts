// src/hooks/useAuth.js
import { useState } from 'react';
import { UserObject } from 'src/utils/types';

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState<UserObject | null>(null);
  const [loadingAuthentication, setLoadingAuthentication] =
    useState<boolean>(false);

  return {
    isAuthenticated,
    loadingAuthentication,
    user,
  };
};

export default useAuthentication;
