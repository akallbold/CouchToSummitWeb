import React, { useState } from 'react';
import useAI from '../hooks/useAI';
import {
  createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
// import { ui } from 'src/utils/firebaseUi';
// import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import { uiConfig } from 'src/utils/firebaseUi';
const Login = () => {
  const { tiredOfAI } = useAI();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

  // signInWithEmailAndPassword(auth, email, password)
  //   .then(() => {
  //     console.log('is this function being triggered');
  //   })
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });

  return (
    <div className="bg-gradient-to-b from-skyBlue to-waterBlue h-screen flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Mountain Range */}
        {tiredOfAI ? (
          <div className="absolute inset-x-0 bottom-0 h-1/2 flex justify-center items-end">
            <div className="mountain w-1/3 h-full bg-mountainGray"></div>
            <div className="mountain w-1/4 h-3/4 bg-forestGreen"></div>
            <div className="mountain w-1/3 h-full bg-earthyBrown"></div>
          </div>
        ) : (
          <div className=""></div>
        )}

        {/* Login Form */}
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
              />
            </div>
            {/* <StyledFirebaseAuth
              uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
            /> */}

            <button className="w-full bg-forestGreen text-coolWhite py-2 rounded hover:bg-leafyGreen">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
