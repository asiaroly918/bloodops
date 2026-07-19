import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import axiosSecure from "../../../utils/axiosSecure";

const MyDonationRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  };

  const fetchRequests = async () => {
    try {
      const user = getUser();
      if (!user?.email) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const res = await axiosSecure.get(`/donation-requests?email=${user.email}`);
      
      console.log("REQUEST DATA =", res.data);
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      alert("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // FILTER
  const filteredRequests = useMemo(() => {
    if (statusFilter === "all") {
      return requests;
    }
    return requests.filter((item) => item.status === statusFilter);
  }, [requests, statusFilter]);

  // PAGINATION
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // STATUS UPDATE (PATCH)
  const handleStatus = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/donation-requests/${id}`, { status });

      if (res.status === 200 || res.status === 204) {
        alert("Status Updated");
        fetchRequests();
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const res = await axiosSecure.delete(`/donation-requests/${id}`);

      if (res.status === 200 || res.status === 204) {
        alert("Deleted Successfully");
        fetchRequests();
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete request");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-black">Loading...</div>;
  }

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between mb-6 items-center">
        <h2 className="text-3xl font-bold text-black">
          My Donation Requests
        </h2>

        <select
          className="select select-bordered text-black bg-white"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {paginatedRequests.length === 0 ? (
        <h2 className="text-center text-xl font-medium mt-10">
          No Donation Requests Found
        </h2>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full">
            <thead className="bg-red-600 text-white">
              <tr>
                <th>#</th>
                <th>Recipient</th>
                <th>Location</th>
                <th>Blood</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedRequests.map((req, index) => (
                <tr key={req._id} className="border-b text-black">
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{req.recipient_name}</td>
                  <td>
                    {req.recipient_district}
                    <br />
                    <span className="text-xs text-gray-500">{req.recipient_upazila}</span>
                  </td>
                  <td>
                    <span className="badge badge-error text-white">
                      {req.blood_group}
                    </span>
                  </td>
                  <td>{req.donation_date}</td>
                  <td>{req.donation_time}</td>
                  <td>
                    <span className="capitalize font-semibold">{req.status}</span>
                  </td>
                  <td className="space-x-1">
                    {/* VIEW */}
                    <button
                      className="btn btn-xs btn-primary text-white"
                      onClick={() => navigate(`/dashboard/donation-requests/${req._id}`)}
                    >
                      View
                    </button>

                    {/* EDIT */}
                    {req.status === "pending" && (
                      <button
                        className="btn btn-xs btn-outline btn-neutral"
                        onClick={() => navigate(`/dashboard/edit-donation-request/${req._id}`)}
                      >
                        Edit
                      </button>
                    )}

                    {/* DELETE */}
                    {req.status === "pending" && (
                      <button
                        className="btn btn-xs btn-error text-white"
                        onClick={() => handleDelete(req._id)}
                      >
                        Delete
                      </button>
                    )}

                    {/* IN PROGRESS CONTROLS */}
                    {req.status === "inprogress" && (
                      <>
                        <button
                          className="btn btn-xs btn-success text-white"
                          onClick={() => handleStatus(req._id, "done")}
                        >
                          Done
                        </button>

                        <button
                          className="btn btn-xs btn-warning text-white"
                          onClick={() => handleStatus(req._id, "canceled")}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION PANEL */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 p-4 bg-gray-50 border-t">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={
                    currentPage === i + 1
                      ? "btn btn-sm btn-error text-white"
                      : "btn btn-sm text-black bg-white"
                  }
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;