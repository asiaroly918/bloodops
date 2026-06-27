import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } else {
      setError(data.message || "Invalid email or password");
    }
  } catch (error) {
    setError("Login failed");
  } finally {
    setLoading(false);
  }

  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-3xl font-bold text-center mb-4">
          Login
        </h2>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Email Address
              </span>
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Password
              </span>
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  </div>
);
};

export default Login;