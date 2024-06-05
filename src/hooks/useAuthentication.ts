// src/hooks/useAuth.js
import { useState } from 'react';
import { GoogleUserObject, EmailUserObject } from 'src/utils/types';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from 'src/utils/firebase';

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<GoogleUserObject | EmailUserObject | null>(
    null,
  );
  const currentUser = auth.currentUser;
  const [loadingAuthentication, setLoadingAuthentication] =
    useState<boolean>(false);
  // this might have to live on the actual component pages
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setUser(user);
      setIsAuthenticated(true);
      // ...
    } else {
      // User is signed out
      // ...
      setIsAuthenticated(false);
    }
  });

  updateProfile(auth.currentUser, {
    displayName: 'Jane Q. User',
    photoURL: 'https://example.com/jane-q-user/profile.jpg',
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });

  return {
    isAuthenticated,
    loadingAuthentication,
    setIsAuthenticated,
    setLoadingAuthentication,
    user,
    currentUser,
    setUser,
  };
};

export default useAuthentication;
