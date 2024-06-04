import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCwiMCXw87Y7ZnH0udr_VO4S-CDlJV1_ew',
  authDomain: 'couchtosummit-ae27c.firebaseapp.com',
  projectId: 'couchtosummit-ae27c',
  storageBucket: 'couchtosummit-ae27c.appspot.com',
  messagingSenderId: '349620181168',
  appId: '1:349620181168:web:d53c7e765edac5aba24375',
  measurementId: 'G-XEJZ5JJP5B',
};
let app;
let db;
let analytics;
let auth;
if (!app) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  // auth = getAuth(app);

  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.error('Failed to enable offline persistence:', err);
    } else if (err.code === 'unimplemented') {
      console.error(
        'Offline persistence is not supported by this browser:',
        err,
      );
    }
  });
}

export { app, auth, db, analytics };
