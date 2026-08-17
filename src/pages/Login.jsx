import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      
      const user = userCredential.user;
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, email: user.email, name: name || user.displayName || 'User' })
      });
      
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      const user = userCredential.user;
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, email: user.email, name: user.displayName || 'Google User' })
      });
      
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex antialiased w-full">
      {/* Main Container: Split Layout on Desktop */}
      <main className="flex-1 flex flex-col md:flex-row min-h-screen w-full">
        {/* Left Side: Image / Branding */}
        <section className="hidden md:flex flex-1 relative bg-deep-navy items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-vibrant-accent opacity-90 z-0"></div>
          
          <div className="relative z-10 p-12 text-surface-white max-w-xl text-center">
            <h2 className="text-headline-xl font-headline-xl mb-6">Discover Premium Products</h2>
            <p className="text-body-lg font-body-lg opacity-90 mb-8">Join thousands of shoppers and find everything you need at unbeatable prices. Fast shipping and secure checkout guaranteed.</p>
            
            {/* Decorative background shapes */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-surface-white rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
            <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-vibrant-accent rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
          </div>
        </section>
        {/* Right Side: Login Form */}
        <section className="flex-1 flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-surface-white relative z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.03)] md:px-24 w-full">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-stack-lg flex justify-center md:justify-start">
              <Link to="/">
                <img alt="Mds.com Logo" className="h-16 w-auto object-contain mix-blend-multiply" src="/images/mds-logo.jpg" />
              </Link>
            </div>
            {/* Header */}
            <div className="mb-stack-lg text-center md:text-left">
              <h1 className="font-headline-lg text-headline-lg text-deep-navy mb-2 tracking-tight">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h1>
              <p className="font-body-md text-body-md text-on-surface-variant opacity-80">{isSignUp ? 'Fill in your details to sign up.' : 'Please enter your details to sign in.'}</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-error text-surface-white text-sm rounded">
                {error}
              </div>
            )}

            {/* Form */}
            <form className="space-y-stack-md" onSubmit={handleSubmit}>
              {/* Name Field (Only for Sign Up) */}
              {isSignUp && (
                <div className="mb-4">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2" htmlFor="name">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline text-sm" data-icon="person" style={{ fontVariationSettings: '"FILL" 0' }}>person</span>
                    </div>
                    <input className="block w-full pl-10 pr-3 py-3 border border-outline-variant rounded-DEFAULT bg-surface-white text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-deep-navy focus:border-deep-navy transition-all duration-200" id="name" name="name" placeholder="John Doe" required type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>
              )}
              {/* Email Field */}
              <div className="mb-4">
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2" htmlFor="email">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-sm" data-icon="mail" style={{ fontVariationSettings: '"FILL" 0' }}>mail</span>
                  </div>
                  <input className="block w-full pl-10 pr-3 py-3 border border-outline-variant rounded-DEFAULT bg-surface-white text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-deep-navy focus:border-deep-navy transition-all duration-200" id="email" name="email" placeholder="name@company.com" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              {/* Password Field */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="password">Password</label>
                  {!isSignUp && <a className="font-label-sm text-label-sm text-secondary hover:text-vibrant-accent transition-colors duration-200" href="#">Forgot Password?</a>}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-sm" data-icon="lock" style={{ fontVariationSettings: '"FILL" 0' }}>lock</span>
                  </div>
                  <input className="block w-full pl-10 pr-10 py-3 border border-outline-variant rounded-DEFAULT bg-surface-white text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-deep-navy focus:border-deep-navy transition-all duration-200" id="password" name="password" placeholder="••••••••" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface transition-colors" type="button">
                    <span className="material-symbols-outlined text-sm" data-icon="visibility" style={{ fontVariationSettings: '"FILL" 0' }}>visibility</span>
                  </button>
                </div>
              </div>
              {/* Checkbox */}
              {!isSignUp && (
                <div className="flex items-center mb-6">
                  <input className="h-4 w-4 text-deep-navy focus:ring-deep-navy border-outline-variant rounded-sm cursor-pointer" id="remember-me" name="remember-me" type="checkbox" />
                  <label className="ml-2 block font-body-sm text-body-sm text-on-surface-variant cursor-pointer" htmlFor="remember-me">
                    Keep me signed in
                  </label>
                </div>
              )}
              {/* Submit Button */}
              <div className="pt-2">
                <button className="w-full flex justify-center py-4 px-4 border border-transparent rounded-DEFAULT shadow-sm font-label-md text-label-md text-surface-white bg-deep-navy hover:bg-primary transition-all duration-300 hover:shadow-lg" type="submit">
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </form>
            {/* Divider */}
            <div className="mt-stack-lg relative">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface-white text-on-surface-variant font-label-sm text-label-sm">
                  Or continue with
                </span>
              </div>
            </div>
            {/* Social Logins */}
            <div className="mt-stack-md flex justify-center">
              <button onClick={handleGoogleSignIn} className="w-full max-w-[200px] inline-flex justify-center items-center py-3 px-4 border border-outline-variant rounded-DEFAULT bg-surface-white font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low focus:outline-none focus:ring-1 focus:ring-deep-navy transition-all duration-200" type="button">
                <span className="sr-only">Sign in with Google</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="ml-2">Google</span>
              </button>
            </div>
            {/* Footer Sign Up Link */}
            <p className="mt-stack-lg text-center font-body-sm text-body-sm text-on-surface-variant">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button onClick={() => setIsSignUp(!isSignUp)} className="font-label-md text-label-md text-deep-navy hover:text-secondary hover:underline transition-colors focus:outline-none" type="button">
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
