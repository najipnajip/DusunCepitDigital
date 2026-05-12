/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

// Types
import { Page } from './types';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FeedbackModal from './components/FeedbackModal';

// Pages
import HomePage from './views/HomePage';
import MapPage from './views/MapPage';
import NewsPage from './views/NewsPage';
import ProfilePage from './views/ProfilePage';
import GalleryPage from './views/GalleryPage';
import ContactPage from './views/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [feedbackModal, setFeedbackModal] = useState<{ isOpen: boolean, type: 'aduan' | 'saran' }>({
    isOpen: false,
    type: 'aduan'
  });

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Listen for navigation events from children
  useEffect(() => {
    const handleNavigate = (e: CustomEvent<Page>) => {
      if (e.detail) setCurrentPage(e.detail);
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': 
        return (
          <HomePage 
            onNavigate={setCurrentPage} 
            onOpenFeedback={(type) => setFeedbackModal({ isOpen: true, type })} 
          />
        );
      case 'map': 
        return <MapPage />;
      case 'news': 
        return <NewsPage />;
      case 'profile': 
        return <ProfilePage />;
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage />;
      default: 
        return (
          <HomePage 
            onNavigate={setCurrentPage} 
            onOpenFeedback={(type) => setFeedbackModal({ isOpen: true, type })} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfc] font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        <AnimatePresence mode="wait">
          <React.Fragment key={currentPage}>
            {renderPage()}
          </React.Fragment>
        </AnimatePresence>
      </main>

      <Footer />

      <AnimatePresence>
        {feedbackModal.isOpen && (
          <FeedbackModal 
            isOpen={feedbackModal.isOpen} 
            type={feedbackModal.type} 
            onClose={() => setFeedbackModal({ ...feedbackModal, isOpen: false })} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
