import { useEffect, useState } from "react";
import axiosSecure from "../../../utils/axiosSecure";

const Admin = () => {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    pendingRequests: 0,
    completedDonations: 0,
    totalFunding: 0,
  });

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetches stats and recent requests at the same time securely
    Promise.all([
      axiosSecure.get("/admin/stats"),
      axiosSecure.get("/admin/recent-requests")
    ])
      .then(([statsRes, requestsRes]) => {
        setStats(statsRes.data);
        setRequests(Array.isArray(requestsRes.data) ? requestsRes.data : []);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500">Total Donors</h3>
          <p className="text-3xl font-bold text-red-600">{stats.totalDonors}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500">Total Requests</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalRequests}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500">Pending Requests</h3>
          <p className="text-3xl font-bold text-yellow-500">{stats.pendingRequests}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500">Completed Donations</h3>
          <p className="text-3xl font-bold text-green-600">{stats.completedDonations}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500">Total Funding</h3>
          <p className="text-3xl font-bold text-purple-600">${stats.totalFunding}</p>
        </div>
      </div>

      {/* Recent Blood Requests */}
      <div className="mt-10 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-black">Recent Blood Requests</h2>

        <div className="overflow-x-auto">
          <table className="table w-full text-black">
            <thead>
              <tr className="text-black">
                <th>Recipient</th>
                <th>Blood Group</th>
                <th>District</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Donation Request Found
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request._id}>
                    <td className="text-black">{request.recipient_name}</td>
                    <td>
                      <span className="badge badge-error text-white">
                        {request.blood_group}
                      </span>
                    </td>
                    <td>{request.recipient_district}</td>
                    <td>
                      <span className="badge">{request.status}</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-primary">View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;