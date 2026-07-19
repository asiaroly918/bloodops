import { useState } from "react";
import axiosSecure from "../../../utils/axiosSecure";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    blood_group: user?.blood_group || "",
    district: user?.district || "",
    upazila: user?.upazila || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosSecure.put(`/users/${user?._id}`, formData);

      // Assuming backend updates successfully and returns the updated user object
      if (response.status === 200 || response.status === 204) {
        const updatedUser = response.data?.user || response.data || { ...user, ...formData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        alert("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || "Failed to update profile";
      alert(errMsg);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow text-black">
      <h2 className="text-2xl font-bold mb-6 text-black">My Profile</h2>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="label font-semibold text-black">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full text-black bg-white disabled:bg-gray-100 disabled:text-gray-500"
            placeholder="Your Name"
            required
          />
        </div>

        <div>
          <label className="label font-semibold text-black">Email Address</label>
          <input
            name="email"
            value={formData.email}
            disabled
            className="input input-bordered w-full bg-gray-100 text-gray-500"
            placeholder="Your Email"
          />
        </div>

        <div>
          <label className="label font-semibold text-black">Avatar URL</label>
          <input
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full text-black bg-white disabled:bg-gray-100 disabled:text-gray-500"
            placeholder="Avatar Image URL"
          />
        </div>

        <div>
          <label className="label font-semibold text-black">Blood Group</label>
          <input
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full text-black bg-white disabled:bg-gray-100 disabled:text-gray-500"
            placeholder="e.g. A+"
          />
        </div>

        <div>
          <label className="label font-semibold text-black">District</label>
          <input
            name="district"
            value={formData.district}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full text-black bg-white disabled:bg-gray-100 disabled:text-gray-500"
            placeholder="District"
          />
        </div>

        <div>
          <label className="label font-semibold text-black">Upazila</label>
          <input
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full text-black bg-white disabled:bg-gray-100 disabled:text-gray-500"
            placeholder="Upazila"
          />
        </div>

        <div className="pt-4">
          {!isEditing ? (
            <button
              type="button"
              className="btn btn-primary text-white"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button type="submit" className="btn btn-success text-white">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user?.name || "",
                    email: user?.email || "",
                    avatar: user?.avatar || "",
                    blood_group: user?.blood_group || "",
                    district: user?.district || "",
                    upazila: user?.upazila || "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}