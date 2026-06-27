import { Outlet } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useState } from "react";

export default function Main() {
  const [isLoggedIn] = useState(false);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Outlet />
      <Footer />
    </>
  );
}
