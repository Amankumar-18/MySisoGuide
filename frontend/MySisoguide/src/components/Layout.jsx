import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="app-shell">
      {!hideNavbar && <Navbar />}

      <main className="main-content">
        <Outlet />
      </main>

      {!hideNavbar && <Footer />}
    </div>
  );
}