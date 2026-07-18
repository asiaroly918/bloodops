import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import bdGeocode from "../../data/bdGeocode";

const Register = () => {
  console.log("API KEY =", import.meta.env.VITE_IMGBB_API_KEY);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    blood_group: '',
    district: '',
    upazila: '',
    password: '',
    confirmPassword: ''
  });

  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Handle District Change to filter Upazilas dynamically
  useEffect(() => {
    if (formData.district) {
      const filtered = bdGeocode.upazilas.filter(u => u.district_id === formData.district);
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
    setFormData(prev => ({ ...prev, upazila: '' })); // Reset upazila on district change
  }, [formData.district]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Avatar Upload to ImgBB
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (!apiKey) {
      setError("ImgBB API Key missing in environment variables.");
      setUploading(false);
      return;
    }

    const imageData = new FormData();
    imageData.append("image", file);

    try {
      // ImgBB অফিশিয়াল আপলোড API-তে রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: imageData,
      });

      const result = await response.json();

      console.log("ImgBB Response:", result);
      if (result.success) {
        setAvatarUrl(result.data.url);
      } else {
        setError("Failed to upload image to ImgBB.");
      }
    } catch (err) {
      console.log(err);
      setError("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Password Match Check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!avatarUrl) {
      setError("Please upload avatar first");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      avatar: avatarUrl,
      blood_group: formData.blood_group,
      district: formData.district,
      upazila: formData.upazila,
      password: formData.password,
    };

    try {
      // এখানে বাড়তি সেমিকোলনটি (;) ফেলে দিয়ে ঠিক করা হয়েছে
      const response = await fetch(
        "https://bloodops-ktf81tmxw-asiaroly918s-projects.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful");
        navigate("/login");
      } else {
        setError(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error(error);
      setError("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-4">Register</h2>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Avatar</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="file-input file-input-bordered w-full"
                />

                {uploading && (
                  <span className="text-warning mt-1">Uploading image...</span>
                )}

                {avatarUrl && (
                  <>
                    <span className="text-success mt-1 block">✓ Uploaded</span>
                    <img
                      src={avatarUrl}
                      alt="Avatar Preview"
                      className="w-24 h-24 rounded-full mt-2 border"
                    />
                  </>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <select
                  name="blood_group"
                  required
                  value={formData.blood_group}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <select
                  name="district"
                  required
                  value={formData.district}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select District</option>
                  {bdGeocode.districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upazila</span>
                </label>
                <select
                  name="upazila"
                  required
                  value={formData.upazila}
                  onChange={handleChange}
                  disabled={!formData.district}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Upazila</option>
                  {filteredUpazilas.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="join">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input input-bordered join-item w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn join-item"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="btn btn-primary w-full mt-6"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;