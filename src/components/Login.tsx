import React, { useState } from 'react';
import useAI from '../hooks/useAI';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  browserSessionPersistence,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import useAuthentication from 'src/hooks/useAuthentication';

const Login = () => {
  const { tiredOfAI } = useAI();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setIsAuthenticated, setLoadingAuthentication } =
    useAuthentication();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoadingAuthentication(true);
      setPersistence(auth, browserSessionPersistence);
      // setPersistence(auth, browserLocalPersistence)

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('Signed up:', userCredential.user);
      setUser(userCredential.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error signing up:', error.message);
    } finally {
      setLoadingAuthentication(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoadingAuthentication(true);
      setPersistence(auth, browserSessionPersistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('Signed in:', userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error.message);
    } finally {
      setLoadingAuthentication(false);
    }
  };
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // do a toaster or something one day
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

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

  return (
    <div className="bg-gradient-to-b from-skyBlue to-waterBlue h-screen flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {tiredOfAI ? (
          <div className="absolute inset-x-0 bottom-0 h-1/2 flex justify-center items-end">
            <div className="mountain w-1/3 h-full bg-mountainGray"></div>
            <div className="mountain w-1/4 h-3/4 bg-forestGreen"></div>
            <div className="mountain w-1/3 h-full bg-earthyBrown"></div>
          </div>
        ) : (
          <div className=""></div>
        )}

        <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-bold mb-4 text-forestGreen">Login</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                New to the app? Sign up!
              </label>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border rounded"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 border rounded"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              className="w-full bg-forestGreen text-coolWhite py-2 rounded hover:bg-leafyGreen"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="w-full bg-forestGreen text-coolWhite py-2 rounded hover:bg-leafyGreen mt-2"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <div
              onClick={() => {
                handlePasswordReset;
              }}
            >
              <p>Reset Password</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
