import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthScreen from './components/AuthScreen';
import OnboardingWizard from './components/OnboardingWizard';
import AppShell from './components/AppShell';
import { ViewType } from './types';

export default function App() {
  // Check localStorage for session state on initial mount
  const getInitialView = (): ViewType => {
    try {
      const storedProfile = localStorage.getItem('userProfile');
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser && storedProfile) {
        return 'app';
      }
      if (currentUser) {
        return 'onboarding';
      }
    } catch (e) {
      console.error('Failed reading storage:', e);
    }
    return 'landing';
  };

  const [currentView, setCurrentView] = useState<ViewType>(getInitialView());
  const [sessionUser, setSessionUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleStartApp = () => {
    try {
      const storedProfile = localStorage.getItem('userProfile');
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser && storedProfile) {
        setCurrentView('app');
      } else if (currentUser) {
        setCurrentView('onboarding');
      } else {
        setCurrentView('auth');
      }
    } catch {
      setCurrentView('auth');
    }
  };

  const handleAuthSuccess = (user: { name: string; email: string }) => {
    setSessionUser(user);
    try {
      const storedProfile = localStorage.getItem('userProfile');
      if (storedProfile) {
        setCurrentView('app');
      } else {
        setCurrentView('onboarding');
      }
    } catch {
      setCurrentView('onboarding');
    }
  };

  const handleOnboardingComplete = (profile: any) => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (err) {
      console.error('Failed writing user profile:', err);
    }
    setCurrentView('app');
  };

  const handleLogOut = () => {
    try {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userProfile');
    } catch (err) {
      console.error('Failed clearing current sessions:', err);
    }
    setSessionUser(null);
    setCurrentView('landing');
  };

  return (
    <div className="w-full min-h-screen transition-all duration-300">
      {currentView === 'landing' && (
        <LandingPage onStartApp={handleStartApp} />
      )}
      {currentView === 'auth' && (
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      )}
      {currentView === 'onboarding' && (
        <OnboardingWizard 
          initialName={sessionUser?.name || 'Guest Traveller'} 
          onOnboardingComplete={handleOnboardingComplete} 
        />
      )}
      {currentView === 'app' && (
        <AppShell onLogOut={handleLogOut} />
      )}
    </div>
  );
}
