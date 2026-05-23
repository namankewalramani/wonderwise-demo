import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess: (user: { name: string; email: string }) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  // Sign up fields
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  // Sign in fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Toast notifications state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'error' | 'success'>('error');

  const showToast = (message: string, type: 'error' | 'success' = 'error') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      showToast('Please fill out all required fields.');
      return;
    }

    try {
      const storedUsers = localStorage.getItem('users');
      const usersList = storedUsers ? JSON.parse(storedUsers) : [];
      const user = usersList.find((u: any) => u.email.toLowerCase() === signInEmail.toLowerCase().trim());

      if (!user) {
        showToast('No user account found with this email. Please Sign Up.');
        return;
      }

      if (user.password !== signInPassword) {
        showToast('Incorrect password entered. Please try again.');
        return;
      }

      // Successful login
      localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
      showToast('Welcome back to WanderWise!', 'success');
      setTimeout(() => {
        onAuthSuccess({ name: user.name, email: user.email });
      }, 800);

    } catch (err) {
      showToast('Encountered an authentication error. Please retry.');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpPassword || !signUpConfirmPassword) {
      showToast('Please populate all registration fields.');
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      showToast('Passwords do not match. Please verify.');
      return;
    }

    if (signUpPassword.length < 5) {
      showToast('Password should contain at least 5 characters.');
      return;
    }

    try {
      const storedUsers = localStorage.getItem('users');
      const usersList = storedUsers ? JSON.parse(storedUsers) : [];
      
      const emailExists = usersList.some((u: any) => u.email.toLowerCase() === signUpEmail.toLowerCase().trim());
      if (emailExists) {
        showToast('An account already exists with this email address.');
        return;
      }

      const newUser = {
        name: signUpName.trim(),
        email: signUpEmail.trim().toLowerCase(),
        password: signUpPassword
      };

      usersList.push(newUser);
      localStorage.setItem('users', JSON.stringify(usersList));
      localStorage.setItem('currentUser', JSON.stringify({ name: newUser.name, email: newUser.email }));

      showToast('Account generated successfully!', 'success');
      setTimeout(() => {
        onAuthSuccess({ name: newUser.name, email: newUser.email });
      }, 800);

    } catch (err) {
      showToast('Could not finalize Sign Up model. Verify browser storage constraints.');
    }
  };

  const handleContinueAsGuest = () => {
    const guestUser = { name: 'Guest Traveller', email: 'guest@wanderwise.ai' };
    localStorage.setItem('currentUser', JSON.stringify(guestUser));
    showToast('Continuing session as Guest Traveller.', 'success');
    setTimeout(() => {
      onAuthSuccess(guestUser);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-slate-100 flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans selection:bg-teal-primary selection:text-navy-dark">
      {/* Visual Sky Graphics Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#114B5F]/40 to-[#1A1A2E] pointer-events-none z-0" />
      
      {/* Decorative Moon Orbs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-teal-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-coral-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Slide-in Toast Notice */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 z-50 px-5 py-3.5 rounded-xl shadow-xl flex items-center space-x-3 border ${
              toastType === 'success' 
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-950/90 border-rose-500/30 text-rose-300'
            }`}
          >
            {toastType === 'success' ? (
              <Icons.CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <Icons.AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand App Branding Row */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-teal-primary/15 rounded-2xl border border-teal-primary/35 shadow-lg shadow-teal-primary/5 mb-3.5">
            <Icons.Sparkles className="w-7 h-7 text-teal-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white block">
            Wander<span className="text-teal-primary">Wise</span>
          </h1>
          <span className="text-xs font-mono tracking-widest text-[#FF8E72] uppercase font-semibold block mt-1">Your AI Travel Companion</span>
        </div>

        {/* Core Form Card */}
        <div className="bg-[#1D1D35]/90 border border-slate-700/60 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative">
          
          {/* Custom Tabs */}
          <div className="grid grid-cols-2 p-1.5 bg-[#121226] rounded-xl mb-6 shadow-inner border border-slate-800">
            <button
              onClick={() => setActiveTab('signin')}
              className={`py-2 px-4 rounded-lg font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-teal-primary text-navy-dark shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`py-2 px-4 rounded-lg font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-teal-primary text-navy-dark shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'signin' ? (
              <motion.form
                key="signin-form"
                onSubmit={handleSignIn}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">EMAIL ADDRESS</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="alex@wanderwise.ai"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-700 bg-[#121226]/80 text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-primary focus:ring-1 focus:ring-teal-primary transition-all pl-9"
                    />
                    <Icons.Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">PASSWORD</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-700 bg-[#121226]/80 text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-primary focus:ring-1 focus:ring-teal-primary transition-all pl-9"
                    />
                    <Icons.Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-teal-primary to-teal-light text-[#1A1A2E] font-bold text-xs tracking-wider uppercase rounded-xl transition-all hover:shadow-lg hover:shadow-teal-primary/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    Authenticate Account &rarr;
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="signup-form"
                onSubmit={handleSignUp}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">FULL NAME</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Alexander Mercer"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-700 bg-[#121226]/80 text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-primary focus:ring-1 focus:ring-teal-primary transition-all pl-9"
                    />
                    <Icons.User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">EMAIL ADDRESS</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="alex@wanderwise.ai"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-700 bg-[#121226]/80 text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-primary focus:ring-1 focus:ring-teal-primary transition-all pl-9"
                    />
                    <Icons.Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">PASSWORD (MIN 5 CHARS)</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-700 bg-[#121226]/80 text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-primary focus:ring-1 focus:ring-teal-primary transition-all pl-9"
                    />
                    <Icons.Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">CONFIRM PASSWORD</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={signUpConfirmPassword}
                      onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-700 bg-[#121226]/80 text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-primary focus:ring-1 focus:ring-teal-primary transition-all pl-9"
                    />
                    <Icons.Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-teal-primary to-teal-light text-[#1A1A2E] font-bold text-xs tracking-wider uppercase rounded-xl transition-all hover:shadow-lg hover:shadow-teal-primary/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    Generate Account &rarr;
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Divider Segment */}
          <div className="relative my-6 select-none">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs font-mono">
              <span className="px-3 bg-[#1D1D35] text-slate-500 lowercase tracking-widest font-black">or</span>
            </div>
          </div>

          {/* Access as Guest */}
          <div>
            <button
              type="button"
              id="btn-auth-guest"
              onClick={handleContinueAsGuest}
              className="w-full py-3.5 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs tracking-wider uppercase rounded-xl border border-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Icons.UserMinus className="w-4 h-4 text-teal-primary" />
              <span>Continue as Guest</span>
            </button>
          </div>

        </div>

        {/* Back Link block */}
        <p className="text-center text-slate-500 text-[11px] mt-6">
          WanderWise stores all credential digests locally inside persistent key-value states.
          We will never transmit secrets to cloud databases.
        </p>

      </div>
    </div>
  );
}
