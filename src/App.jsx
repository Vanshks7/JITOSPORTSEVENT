import React, { useEffect } from 'react';
import { TournamentProvider } from './context/TournamentContext';
import { useTournament } from './hooks/useTournament';
import BrandStripe from './components/common/BrandStripe';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomeView from './components/home/HomeView';
import AuthView from './components/auth/AuthView';
import BookingView from './components/booking/BookingView';
import AdminView from './components/admin/AdminView';
import ResetPasswordModal from './components/auth/ResetPasswordModal';
import SignupSuccessModal from './components/auth/SignupSuccessModal';
import AdminAuthModal from './components/admin/AdminAuthModal';

function AppContent() {
  const {
    activeView,
    isAdminAuthenticated,
    setIsAdminAuthModalOpen,
    navigateTo
  } = useTournament();

  useEffect(() => {
    if (window.location.hash === '#admin') {
      if (isAdminAuthenticated) {
        navigateTo('admin');
      } else {
        setIsAdminAuthModalOpen(true);
      }
    }
  }, [isAdminAuthenticated, navigateTo, setIsAdminAuthModalOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 font-sans antialiased">
      {/* 4-Color JITO Brand Stripe */}
      <BrandStripe />

      {/* Main Navigation Header */}
      <Header />

      {/* Dynamic Views */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex-1">
        {activeView === 'home' && <HomeView />}
        {activeView === 'auth' && <AuthView />}
        {activeView === 'booking' && <BookingView />}
        {activeView === 'admin' && <AdminView />}
      </main>

      {/* Global Modals */}
      <ResetPasswordModal />
      <SignupSuccessModal />
      <AdminAuthModal />



      {/* Public Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <TournamentProvider>
      <AppContent />
    </TournamentProvider>
  );
}
