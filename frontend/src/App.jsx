// src/App.jsx
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import AdminDashboard from "./components/pages/AdminDashboard";
import Bookmarks from "./components/pages/Bookmarks";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/Register";
import ResourceDetail from "./components/pages/ResourceDetail";
import Resources from "./components/pages/Resources";
import SubmitResource from "./components/pages/SubmitResource";

// Static Pages
import About from "./components/pages/About";
import FAQ from "./components/pages/FAQ";
import Feedback from "./components/pages/Feedback";
import Policy from "./components/pages/Policy";
import Terms from "./components/pages/Terms";

// Protected Route Component
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:id" element={<ResourceDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected User Routes */}
              <Route
                path="/submit"
                element={
                  <ProtectedRoute>
                    <SubmitResource />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookmarks"
                element={
                  <ProtectedRoute>
                    <Bookmarks />
                  </ProtectedRoute>
                }
              />

              {/* Admin Only Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            gutter={12}
            containerStyle={{
              top: "88px",
              right: "20px",
            }}
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--surface)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "14px 18px",
                fontSize: "14px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              },
              success: {
                iconTheme: {
                  primary: "var(--success)",
                  secondary: "var(--surface)",
                },
              },
              error: {
                iconTheme: {
                  primary: "var(--danger)",
                  secondary: "var(--surface)",
                },
              },
            }}
          />

          <Analytics />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
