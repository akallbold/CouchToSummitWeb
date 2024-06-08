import React, { useEffect, useState } from 'react';
import useAI from '../hooks/useAI';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  browserLocalPersistence,
  setPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import useAuth from 'src/hooks/useAuth';
import { Alert } from './shad-ui/ui/alert';
import { Button } from '../components/shad-ui/ui/button';
import { Input } from '../components/shad-ui/ui/input';
import { Label } from '../components/shad-ui/ui/label';
import { Link } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import ronnie from '../assets/ronnie.png';
const Login = () => {
  const { tiredOfAI } = useAI();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, setLoadingAuth } = useAuth();
  const [alert, setAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoadingAuth(true);
      setAlert({ show: true, message: 'Logging you in...' });
      setPersistence(auth, browserLocalPersistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('Signed in:', userCredential.user);
      setAlert({ show: true, message: 'Login successful!' });
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error.message);
      if (error.message === 'INVALID_LOGIN_CREDENTIALS') {
        setAlert({
          show: true,
          message: 'Try again with a different email or password.',
        });
      } else {
        setAlert({
          show: true,
          message: error.message,
        });
      }
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoadingAuth(true);
      setAlert({ show: true, message: 'Signing you up...' });
      setPersistence(auth, browserLocalPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setAlert({ show: true, message: 'Signed up successfully!' });
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setAlert({ show: true, message: 'Error with signup' });
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();
    !isDesktop
      ? handleGoogleLoginMobile(provider)
      : handleGoogleLoginDesktop(provider);
  };

  const handleGoogleLoginDesktop = async (provider) => {
    setLoadingAuth(true);
    setAlert({ show: true, message: 'Logging you in...' });
    setPersistence(auth, browserLocalPersistence);
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log('Signed in:', user);
      setAlert({ show: true, message: 'Login successful!' });
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error.message);
      if (error.message === 'popup_closed_by_user') {
        setAlert({
          show: true,
          message: 'Error with login popup. Please try again.',
        });
      }
      if (error.message === 'redirect_cancelled_by_user') {
        setAlert({
          show: true,
          message: 'Error with login redirect. Please try again.',
        });
      }
      if (error.message === 'INVALID_LOGIN_CREDENTIALS') {
        setAlert({ show: true, message: 'Invalid credentials. Try again.' });
      }
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleGoogleLoginMobile = async (provider) => {
    setLoadingAuth(true);
    setAlert({ show: true, message: 'Logging you in...' });
    setPersistence(auth, browserLocalPersistence);
    try {
      const result = await signInWithRedirect(auth, provider);
      const redirectResult = await getRedirectResult(auth);
      const credential =
        GoogleAuthProvider.credentialFromResult(redirectResult);
      const token = credential.accessToken;
      const user = redirectResult.user;
      console.log('Signed in:', user);
      setAlert({ show: true, message: 'Login successful!' });
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error.message);
      if (error.message === 'popup_closed_by_user') {
        setAlert({
          show: true,
          message: 'Error with login popup. Please try again.',
        });
      }
      if (error.message === 'redirect_cancelled_by_user') {
        setAlert({
          show: true,
          message: 'Error with login redirect. Please try again.',
        });
      }
      if (error.message === 'INVALID_LOGIN_CREDENTIALS') {
        setAlert({ show: true, message: 'Invalid credentials. Try again.' });
      }
    } finally {
      setLoadingAuth(false);
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
        console.error(error);
        if (error.message === 'EMAIL_EXISTS') {
          setAlert({ show: true, message: 'Email already exists.' });
        }
        // ..
      });
  };

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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/login"
                  className="ml-auto inline-block text-sm underline"
                  onClick={handleSignUp}
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <Button type="button" className="w-full" onClick={handleLogin}>
              Login
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            <Link
              to="/login"
              className="underline"
              onClick={handlePasswordReset}
            >
              Forgot Password?
            </Link>
          </div>
          {alert.show && <Alert>{alert.message}</Alert>}
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={ronnie}
          alt="Mount Rainier"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
