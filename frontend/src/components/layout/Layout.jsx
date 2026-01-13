import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    // This wrapper is the theme root for the whole app
    <div className="min-h-screen flex flex-col bg-bg text-text">
      {/* Toasts must live here so they inherit theme variables */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--toast-bg)",
            color: "var(--toast-color)",
            borderRadius: "12px",
            border: "1px solid var(--border)",
          },
        }}
      />

      {/* Sticky navbar */}
      <Navbar />

      {/* 
        Main must:
        - push below sticky navbar
        - be scroll container for hash links
      */}
      <main className="flex-1 bg-bg scroll-smooth">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
