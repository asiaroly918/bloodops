import React from 'react';

export default function NotFoundPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background design accents matching the application blueprint canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Large faint background decorative element */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      <div className="relative z-10 max-w-md w-full text-center bg-white border border-slate-200/80 shadow-xl rounded-3xl p-8 sm:p-12">
        
        {/* Core Icon Branding Illustration Wrapper */}
        <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-rose-600 border border-rose-100/60 shadow-inner">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Large Status Identifier Header Text */}
        <h1 className="text-7xl font-black text-rose-600 tracking-tight mb-2">404</h1>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-3">Page Not Found</h2>
        
        <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto mb-8">
          The route or resource you are looking for doesn't exist, has been restricted, or was migrated elsewhere.
        </p>

        {/* Operational Flow Trigger Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition transform hover:-translate-y-0.5 text-center text-sm"
          >
            Back to Homepage
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-xl border border-slate-200 transition text-center text-sm"
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}