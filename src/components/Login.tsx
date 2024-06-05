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
import { Alert } from './shad-ui/ui/alert';
import { Button } from '../components/shad-ui/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/shad-ui/ui/card';
import { Input } from '../components/shad-ui/ui/input';
import { Label } from '../components/shad-ui/ui/label';
import { Link } from 'react-router-dom';

const Login = () => {
  const { tiredOfAI } = useAI();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setIsAuthenticated, setLoadingAuthentication } =
    useAuthentication();
  const [alert, setAlert] = useState({ show: false, message: '' });

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoadingAuthentication(true);
      setAlert({ show: true, message: 'Signing you up...' });
      setPersistence(auth, browserSessionPersistence);
      // setPersistence(auth, browserLocalPersistence)

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setAlert({ show: true, message: 'Signed up successfully!' });
      setUser(userCredential.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error signing up:', error.message);
      setAlert({ show: true, message: 'Error with signup' });
    } finally {
      setLoadingAuthentication(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoadingAuthentication(true);
      setAlert({ show: true, message: 'Logging you in...' });

      setPersistence(auth, browserSessionPersistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('Signed in:', userCredential.user);
      setAlert({ show: true, message: 'Login successful!' });
    } catch (error) {
      console.error('Error signing in:', error.message);
      setAlert({ show: true, message: 'Error with login' });
    } finally {
      setLoadingAuthentication(false);
    }
  };
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setAlert({ show: true, message: 'Check your email for password reset' });
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
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
