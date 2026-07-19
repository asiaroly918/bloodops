import { createBrowserRouter } from "react-router";

import Main from "../Layout/Main";

import Login from "../pages/Home/Login";
import Register from "../pages/Home/Register";
import Home from "../pages/Home/Home";

import DonationReq from "../pages/PublicPages/DonationReq";
import Search from "../pages/PublicPages/Search";
import Payment from "../pages/PrivatePages/Payment";

import DashboardLayout from "../Layout/DashboardLayout";

import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Profile from "../pages/Dashboard/Profile/Profile";

import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest/CreateDonationRequest";

import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests";

import DonationRequestDetail from "../pages/Dashboard/Donor/DonationRequestDetail";

import AllUsers from "../pages/Dashboard/Admin/AllUsers";

import AllBloodDonationRequests from "../pages/Dashboard/AllBloodDonationReq/AllBloodDonationRequests";

import PrivateRoute from "./PrivateRoute";
import EditDonationRequest from "../pages/Dashboard/Donor/EditDonationRequest";
import Funding from "../pages/Funding/funding";
import AdminRoute from "./AdminRoute";
import VolunteerRoute from "./VolunteerRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "register",
        Component: Register
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "donation-requests",
        Component: DonationReq
      },
      {
        path: "search",
        Component: Search
      },
      {
        path: "funding",
        element: (
          <PrivateRoute>
            <Funding />
          </PrivateRoute>
        )
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        )
      }
    ]
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
        Component: DashboardHome
      },
      {
        path: "profile",
        Component: Profile
      },
      {
        path: "create-donation-request",
        Component: CreateDonationRequest
      },
      {
        path: "my-donation-requests",
        Component: MyDonationRequests
      },
      {
        path: "donation-requests/:id",
        Component: DonationRequestDetail
      },
      {
        path: "edit-donation-request/:id",
        Component: EditDonationRequest
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        )
      },
      {
        path: "all-blood-donation-requests",
        element: (
          <VolunteerRoute>
            <AllBloodDonationRequests />
          </VolunteerRoute>
        )
      }
    ]
  }
]);

export default router;