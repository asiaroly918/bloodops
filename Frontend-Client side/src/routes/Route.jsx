import { createBrowserRouter } from "react-router";
import Main from "../Layout/Main";
import Login from "../pages/Home/Login";
import Register from "../pages/Home/Register";
import Home from "../pages/Home/Home";
import DonationReq from "../pages/PublicPages/DonationReq";
import Search from "../pages/PublicPages/Search";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Profile from "../Pages/Dashboard/Profile/Profile";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequests from "../Pages/Dashboard/Donor/MyDonationRequests";
import DonationRequestDetail from "../Pages/Dashboard/Donor/DonationRequestDetail";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AdminABDR from "../Pages/Dashboard/AllBloodDonationReq/AdminView/AdminABDR";
import VolunteerABDR from "../Pages/Dashboard/AllBloodDonationReq/VolunteerView/VolunteerABDR";
import Payment from "../Pages/PrivatePages/Payment";
import PrivateRoute from "./PrivateRoute";



const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "donation-requests",
        Component: DonationReq,
      },
      {
        path: "search",
        Component: Search,
      },
      {
        path: "payment",
        Component: Payment,
      }
    ],
      },
      {
          path: "dashboard",
          element: (
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "profile",
        Component: Profile,
      },
      // Donor
      {
        path: "create-donation-request",
        Component: CreateDonationRequest,
      },
      {
        path: "my-donation-requests",
        Component: MyDonationRequests,
      },
      {
        path: "donation-requests/:id",
        Component: DonationRequestDetail,
      },

      // Admin
      {
        path: "all-users",
        Component: AllUsers,
      },
      {
        path: "admin-all-blood-donation-requests",
        Component: AdminABDR,
      },

      // Volunteer
      {
        path: "volunteer-all-blood-donation-requests",
        Component: VolunteerABDR,
      },
      
    ],
  },
]);

export default router;
