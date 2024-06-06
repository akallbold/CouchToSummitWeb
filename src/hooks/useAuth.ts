import { useState, useEffect } from 'react';
import {
  GoogleUserObject,
  EmailUserObject,
  AppUserObject,
} from 'src/utils/types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'src/utils/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  limit,
} from 'firebase/firestore';
import { db } from 'src/utils/firebase';
import { idGenerator } from '../utils/utils';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [appUser, setAppUser] = useState<AppUserObject | null>(null);

  const currentUser = auth.currentUser;
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (currentUser) {
        setIsAuthenticated(true);
        getOrCreateNewAppUser();
      } else {
        setIsAuthenticated(false);
      }
    });
    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [currentUser]);

  const updateUserFavorites = async (
    type: 'hike' | 'stair',
    userId: string,
    hikeId: string,
  ) => {
    console.log('Need to implement this');
    // how to update arrays to add or remove
    // try {
    //   const res = await setDoc(doc(db, 'user', userId), {
    //     favoriteHikes,
    //     favoriteStairs,
    //   });
    //   console.log({ res });
    // } catch (e) {
    //   console.error({ e });
    // }
  };

  const getOrCreateNewAppUser = async () => {
    setLoadingAuth(true);

    const q = query(
      collection(db, 'user'),
      where('deletedAt', '==', null),
      where('email', '==', currentUser.email),
      limit(1),
    );

    try {
      const querySnapshot = await getDocs(q);
      let user = null;

      if (!querySnapshot.empty) {
        // If user exists, set the user data
        querySnapshot.forEach((doc) => {
          user = { id: doc.id, ...doc.data() };
        });
        console.log('Fetched user:', user);
      } else {
        const newUser = {
          email: currentUser.email,
          displayName: currentUser.displayName,
          createdAt: new Date(),
          deletedAt: null,
          id: idGenerator('user'),
          favoriteHikes: [],
          favoriteStairs: [],
          profilePhotoUrl: currentUser.photoURL,
          units: 'imperial',
        };

        const userRef = await addDoc(collection(db, 'user'), newUser);
        user = { id: userRef.id, ...newUser };
        console.log('Created new user:', user);
        return user;
      }

      setAppUser(user);
    } catch (e) {
      console.error('Error fetching or creating user:', e);
      setAppUser(null);
    } finally {
      setLoadingAuth(false);
    }
  };

  return {
    appUser,
    currentUser,
    isAuthenticated,
    loadingAuth,
    setAppUser,
    setIsAuthenticated,
    setLoadingAuth,
    updateUserFavorites,
  };
};

export default useAuth;
