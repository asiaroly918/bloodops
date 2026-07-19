import { useState } from 'react';
import HeroSection from '../../component/HeroSection';
import FeaturedSection from '../../component/FeaturedSection';
import ContactSection from '../../component/ContactSection';
import axiosSecure from "../../utils/axiosSecure";


// --- MAIN HOME PAGE COMPONENT ---
export default function HomePage() {
  // Simulating authentication state for demonstration
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* Dev Toggle Button - Remove this in production */}
      <div className="fixed bottom-4 right-4 z-50 bg-white border border-rose-200 p-2 rounded-lg shadow-lg text-xs flex items-center gap-2">
        <span className="font-medium text-rose-600">Simulate Auth:</span>
        <button 
          onClick={() => setIsLoggedIn(!isLoggedIn)} 
          className="bg-rose-600 text-white px-2 py-1 rounded hover:bg-rose-700 transition"
        >
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>

      <HeroSection />
      <FeaturedSection />
      <ContactSection />
    </div>
  );
}