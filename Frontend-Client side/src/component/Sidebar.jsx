import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

      <aside className="w-64 min-h-full bg-base-100 border-r">

        {/* Logo */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-red-600">
            BlooDrops
          </h2>
        </div>

        {/* Menu */}
        <ul className="menu p-4 text-base-content">

          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "active font-semibold" : ""
              }
            >
              Dashboard Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/my-donation-requests"
              className={({ isActive }) =>
                isActive ? "active font-semibold" : ""
              }
            >
              My Donation Requests
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/create-donation-request"
              className={({ isActive }) =>
                isActive ? "active font-semibold" : ""
              }
            >
              Create Donation Request
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive ? "active font-semibold" : ""
              }
            >
              Profile
            </NavLink>
          </li>

        </ul>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-0 w-full px-4">
          <button className="btn btn-error w-full">
            Logout
          </button>
        </div>

      </aside>
    </div>
  );
};

export default Sidebar;