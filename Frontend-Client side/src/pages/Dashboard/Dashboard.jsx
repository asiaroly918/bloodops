import { useState } from "react";
import Admin from "./Admin/Admin";
import Donor from "./Donor/Donor";

const Dashboard = () => {
  const [user] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });
  
  const [loading] = useState(false);

  if (loading) {
    return <p className="text-center mt-10 text-black">Loading...</p>;
  }

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500 font-medium">
        Please login first
      </p>
    );
  }

  return (
    <div className="text-black">
      {user.role === "admin" ? (
        <Admin user={user} />
      ) : (
        <Donor user={user} />
      )}
    </div>
  );
};

export default Dashboard;