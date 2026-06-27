import { useState, useEffect } from 'react';
import FilterBar from '../../component/donationReq/FilterBar';
import RequestCard from '../../component/donationReq/RequestCard';

// --- MAIN PAGE COMPONENT ---
export default function DonationRequestsPage() {
  // Simulating authentication state for demonstration
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for filtering
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // Fetch only 'pending' requests on mount
  useEffect(() => {
    const fetchPendingRequests = async () => {
      setLoading(true);
      try {
        // Mocking backend response where status === 'pending'
        const mockData = [
          { _id: "req_001", recipientName: "Rahim Uddin", district: "Dhaka", upazila: "Mirpur", bloodGroup: "A+", donationDate: "2026-07-01", donationTime: "10:30 AM", status: "pending" },
          { _id: "req_002", recipientName: "Sumaiya Akhter", district: "Chittagong", upazila: "Hathazari", bloodGroup: "O-", donationDate: "2026-06-28", donationTime: "02:15 PM", status: "pending" },
          { _id: "req_003", recipientName: "Asif Rahman", district: "Sylhet", upazila: "Sreemangal", bloodGroup: "B+", donationDate: "2026-06-30", donationTime: "09:00 AM", status: "pending" },
          { _id: "req_004", recipientName: "Fatema Tuz Zohra", district: "Dhaka", upazila: "Uttara", bloodGroup: "AB+", donationDate: "2026-07-05", donationTime: "11:00 AM", status: "pending" }
        ];
        setRequests(mockData);
      } catch (error) {
        console.error("Error loading donation requests", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingRequests();
  }, []);

  // Filter computation logic
  const filteredRequests = requests.filter(req => {
    const matchesBlood = selectedBloodGroup ? req.bloodGroup === selectedBloodGroup : true;
    const matchesDistrict = selectedDistrict ? req.district.toLowerCase().includes(selectedDistrict.toLowerCase()) : true;
    return matchesBlood && matchesDistrict;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased py-12">
      
      {/* Dev Switch to test Logged In / Logged Out redirect behavior */}
      <div className="fixed bottom-4 right-4 z-50 bg-white border border-rose-200 p-2 rounded-lg shadow-lg text-xs flex items-center gap-2">
        <span className="font-medium text-rose-600">Simulate Auth:</span>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="bg-rose-600 text-white px-2 py-1 rounded hover:bg-rose-700 transition">
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Segment */}
        <header className="relative bg-gradient-to-br from-rose-900 via-rose-800 to-red-950 text-white py-16 px-6 rounded-2xl overflow-hidden mb-10 shadow-md">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="relative max-w-3xl z-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">Active Donation Requests</h1>
            <p className="text-base sm:text-lg text-rose-100/90 leading-relaxed">
              Browse urgent requests verified on our platform. Your contribution can bridge a critical window for a patient today.
            </p>
          </div>
        </header>

        {/* Filter Toolbar */}
        <FilterBar 
          selectedBloodGroup={selectedBloodGroup} 
          setSelectedBloodGroup={setSelectedBloodGroup}
          selectedDistrict={selectedDistrict} 
          setSelectedDistrict={setSelectedDistrict}
        />

        {/* Dynamic Display Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80 shadow-sm max-w-xl mx-auto">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-bold text-slate-900">No requests found</h3>
            <p className="mt-2 text-sm text-slate-500">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRequests.map((request) => (
              <RequestCard key={request._id} request={request} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}