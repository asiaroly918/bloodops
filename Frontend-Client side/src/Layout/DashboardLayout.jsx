import { Outlet } from "react-router";
import Sidebar from "../component/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
        {/* Mobile Button */}
        <div className="lg:hidden p-4">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-primary drawer-button"
          >
            Menu
          </label>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}