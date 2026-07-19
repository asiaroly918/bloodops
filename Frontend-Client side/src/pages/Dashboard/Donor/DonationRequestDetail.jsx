import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosSecure from "../../../utils/axiosSecure";

const DonationRequestDetails = () => {
  const { id } = useParams();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axiosSecure
      .get(`/donation-requests/${id}`)
      .then((res) => {
        setRequest(res.data.donationRequest);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching request details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleDonate = async () => {
    try {
      const res = await axiosSecure.patch(`/donation-requests/${id}/status`, {
        donor_name: user?.name,
        donor_email: user?.email,
      });

      if (res.data.success) {
        setRequest(res.data.request);
        setShowModal(false);
        alert("Donation Confirmed");
      }
    } catch (error) {
      console.error("Error confirming donation:", error);
      alert(error.response?.data?.message || "Failed to confirm donation");
    }
  };

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (!request) return <h2 className="text-center mt-10 text-error">Request not found</h2>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-black">
      <div className="card bg-base-100 shadow-xl bg-white">
        <div className="card-body">
          <h2 className="text-3xl font-bold mb-4">
            Donation Request Details
          </h2>

          <p><b>Requester :</b> {request.requester_name}</p>
          <p><b>Recipient :</b> {request.recipient_name}</p>
          <p><b>District :</b> {request.recipient_district}</p>
          <p><b>Upazila :</b> {request.recipient_upazila}</p>
          <p><b>Hospital :</b> {request.hospital_name}</p>
          <p><b>Address :</b> {request.full_address}</p>
          <p><b>Blood Group :</b> {request.blood_group}</p>
          <p><b>Date :</b> {request.donation_date}</p>
          <p><b>Time :</b> {request.donation_time}</p>
          <p><b>Message :</b> {request.request_message}</p>
          <p><b>Status :</b> <span className="badge badge-secondary">{request.status}</span></p>

          {request.status === "pending" && (
            <button
              className="btn btn-primary mt-5"
              onClick={() => setShowModal(true)}
            >
              Donate
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-xl mb-5">
              Confirm Donation
            </h3>

            <input
              className="input input-bordered w-full mb-4 bg-gray-100"
              value={user?.name || ""}
              readOnly
            />

            <input
              className="input input-bordered w-full mb-4 bg-gray-100"
              value={user?.email || ""}
              readOnly
            />

            <div className="modal-action">
              <button
                className="btn btn-success text-white"
                onClick={handleDonate}
              >
                Confirm
              </button>

              <button
                className="btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;