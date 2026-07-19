import Admin from "../Admin/Admin";

const DashboardHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // ADMIN DASHBOARD
  if (user?.role === "admin") {
    return <Admin />;
  }

  // DONOR DASHBOARD
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-5">
        Welcome to BloodDrops Dashboard
      </h1>

      <div className="bg-white shadow rounded-lg p-6 text-black">
        <h2 className="text-xl font-bold">
          Hello, {user?.name}
        </h2>
        <p className="mt-2 text-gray-600">
          Manage your blood donation activities from here.
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;