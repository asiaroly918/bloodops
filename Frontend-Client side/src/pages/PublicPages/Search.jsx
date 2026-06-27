import React, { useState, useEffect } from 'react';

// Embedded BD Geocode Matrix for synchronous cascade selection
const bdGeocodeData = {
  districts: [
    { id: "d1", name: "Dhaka" },
    { id: "d2", name: "Chittagong" },
    { id: "d3", name: "Sylhet" }
  ],
  upazilas: {
    "d1": ["Mirpur", "Uttara", "Dhanmondi", "Gulshan"],
    "d2": ["Hathazari", "Patiya", "Raozan", "Sitakunda"],
    "d3": ["Sreemangal", "Beanibazar", "Golapganj", "Fenchuganj"]
  }
};

export default function SearchDonorsPage() {
  const [searchParams, setSearchParams] = useState({
    blood_group: '',
    districtId: '',
    districtName: '',
    upazila: ''
  });

  const [availableUpazilas, setAvailableUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Cascade upazila array when selected district changes
  useEffect(() => {
    if (searchParams.districtId) {
      setAvailableUpazilas(bdGeocodeData.upazilas[searchParams.districtId] || []);
    } else {
      setAvailableUpazilas([]);
    }
  }, [searchParams.districtId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'district') {
      const selectedDist = bdGeocodeData.districts.find(d => d.id === value);
      setSearchParams(prev => ({
        ...prev,
        districtId: value,
        districtName: selectedDist ? selectedDist.name : '',
        upazila: '' // Reset child select
      }));
    } else {
      setSearchParams(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchParams.blood_group || !searchParams.districtName || !searchParams.upazila) {
      setError('Please select all three query fields to begin filtering.');
      return;
    }

    setError('');
    setLoading(true);
    setHasSearched(true);

    try {
      // Build dynamic API string matching your filtering requirements
      const queryParams = new URLSearchParams({
        blood_group: searchParams.blood_group,
        district: searchParams.districtName,
        upazila: searchParams.upazila
      });

      const response = await fetch(`/api/donors/search?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Could not complete donor evaluation database search.');
      }
      
      const result = await response.json();
      setDonors(result);
    } catch (err) {
      // Falling back to functional Mock Data for rapid developer view rendering
      console.warn("API not accessible, initializing offline matching dataset.");
      const mockMatches = [
        { _id: "u1", name: "Tanvir Rahman", blood_group: searchParams.blood_group, district: searchParams.districtName, upazila: searchParams.upazila, contact: "+880 1711-223344", email: "tanvir@example.com" },
        { _id: "u2", name: "Nabila Yasmin", blood_group: searchParams.blood_group, district: searchParams.districtName, upazila: searchParams.upazila, contact: "+880 1911-556677", email: "nabila@example.com" }
      ];
      setDonors(mockMatches);
    } finally {
      setLoading(false);
    }
  };

  // Bonus Option: Client side HTML-to-PDF compiler pipeline execution
  const handleDownloadPDF = () => {
    const element = document.getElementById('pdf-report-target');
    if (!element) return;

    // Direct dynamic imports ensures runtime compilation works seamlessly without configuration bloat
    import('html2pdf.js').then((html2pdf) => {
      const options = {
        margin: 10,
        filename: `donors-${searchParams.blood_group}-${searchParams.districtName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf.default().from(element).set(options).save();
    }).catch(err => {
      alert("Make sure to install html2pdf.js package (npm i html2pdf.js)");
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Segment Search Module Bar Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xl mb-10">
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Find Blood Donors</h1>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Filter matching records across standard geopolitical regions</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Blood Group Option field selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Blood Group</label>
              <select
                name="blood_group"
                value={searchParams.blood_group}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition text-slate-700"
              >
                <option value="">Select Group</option>
                {bloodGroups.map(group => <option key={group} value={group}>{group}</option>)}
              </select>
            </div>

            {/* Geocode District option selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">District</label>
              <select
                name="district"
                value={searchParams.districtId}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition text-slate-700"
              >
                <option value="">Select District</option>
                {bdGeocodeData.districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>

            {/* Geocode Upazila conditional child option selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Upazila</label>
              <select
                name="upazila"
                disabled={!searchParams.districtId}
                value={searchParams.upazila}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition text-slate-700 disabled:opacity-50"
              >
                <option value="">Select Upazila</option>
                {availableUpazilas.map(up => <option key={up} value={up}>{up}</option>)}
              </select>
            </div>

            {/* Execution trigger */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm transition transform hover:-translate-y-0.5 text-center text-sm"
            >
              {loading ? 'Searching...' : 'Search Donors'}
            </button>
          </form>
        </div>

        {/* Dynamic Display Presentation Interface Layer */}
        {!hasSearched ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-rose-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Begin Your Search</h3>
            <p className="mt-1.5 text-sm text-slate-500 max-w-xs mx-auto">
              Select a blood type along with a target district location parameters to scan available matched profiles.
            </p>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          </div>
        ) : donors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto">
            <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-bold text-slate-900">No compatible donors found</h3>
            <p className="mt-1 text-sm text-slate-500">Consider exploring adjacent matching regional parameters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Control Panel Download Options row toolbar */}
            <div className="flex justify-between items-center bg-slate-100 p-4 rounded-2xl">
              <span className="text-sm font-semibold text-slate-600">
                Found {donors.length} compatible match{donors.length > 1 ? 'es' : ''}
              </span>
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-1.5 px-4 rounded-xl border border-slate-200 transition shadow-sm text-xs"
              >
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download List as PDF
              </button>
            </div>

            {/* Container mapping matching node matrix (Target Node reference element compiled for PDF conversion generation) */}
            <div id="pdf-report-target" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
              {donors.map((donor) => (
                <div key={donor._id} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base tracking-tight truncate max-w-[150px]">
                          {donor.name}
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registered Volunteer</p>
                      </div>
                      <span className="inline-flex items-center justify-center bg-rose-50 text-rose-700 font-extrabold px-2.5 py-1 rounded-lg border border-rose-100 text-sm">
                        {donor.blood_group}
                      </span>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                      {/* Regional distribution data line */}
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="truncate">{donor.upazila}, {donor.district}</span>
                      </div>

                      {/* Direct contact line */}
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${donor.contact}`} className="text-rose-600 hover:underline font-medium">{donor.contact}</a>
                      </div>

                      {/* Email address reference info line */}
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate text-slate-500">{donor.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}