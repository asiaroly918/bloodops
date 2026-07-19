import { useEffect, useState } from "react";
import axiosSecure from "../../../utils/axiosSecure";

const AllBloodDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");

  const user = JSON.parse(localStorage.getItem("user"));

  // =========================
  // LOAD ALL REQUESTS
  // =========================
  const loadRequests = async () => {
    try {
      const res = await axiosSecure.get("/admin/all-donation-request");
      console.log("REQUEST DATA:", res.data);
      setRequests(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/donation-request-status/${id}`, {
        status,
      });

      console.log(res.data);
      loadRequests();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredRequests = requests.filter((request) => {
    if (filter === "all") {
      return true;
    }
    return request.status === filter;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Blood Donation Requests</h1>

      {/* FILTER */}
      <select
        className="select select-bordered text-black mb-6"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
        <option value="canceled">Canceled</option>
      </select>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full text-black">
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Requester</th>
              <th>District</th>
              <th>Hospital</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.recipient_name}</td>
                <td>{request.requester_name}</td>
                <td>{request.recipient_district}</td>
                <td>{request.hospital_name}</td>
                <td>{request.donation_date}</td>

                <td>
                  <span className="badge badge-success">{request.status}</span>
                </td>

                <td>
                  {user?.role === "admin" && (
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-info">View</button>
                      <button className="btn btn-sm btn-warning">Edit</button>
                      <button className="btn btn-sm btn-error">Delete</button>
                    </div>
                  )}

                  {user?.role === "volunteer" && (
                    <select
                      className="select select-sm select-bordered"
                      onChange={(e) => updateStatus(request._id, e.target.value)}
                      defaultValue="Update Status"
                    >
                      <option disabled>Update Status</option>
                      <option value="inprogress">In Progress</option>
                      <option value="done">Done</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBloodDonationRequests;