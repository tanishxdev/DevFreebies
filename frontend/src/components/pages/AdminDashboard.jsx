// src/components/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiCheckCircle,
  FiXCircle,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiPackage,
  FiAlertCircle,
} from "react-icons/fi";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import * as adminService from "../../services/admin";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalResources: 0,
    pendingResources: 0,
    totalUsers: 0,
    featuredResources: 0,
  });
  const [pendingResources, setPendingResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      // In a real app, you would have admin API endpoints
      // For now, we'll simulate with timeouts
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulated data
      setStats({
        totalResources: 156,
        pendingResources: 12,
        totalUsers: 89,
        featuredResources: 8,
      });

      setPendingResources([
        {
          id: 1,
          title: "React Component Library",
          category: "libraries",
          submittedBy: "user1",
          submittedAt: "2 hours ago",
        },
        {
          id: 2,
          title: "Free API for Weather",
          category: "apis",
          submittedBy: "user2",
          submittedAt: "5 hours ago",
        },
        {
          id: 3,
          title: "CSS Framework",
          category: "tools",
          submittedBy: "user3",
          submittedAt: "1 day ago",
        },
      ]);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (resourceId) => {
    setActionLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPendingResources((prev) => prev.filter((r) => r.id !== resourceId));
      toast.success("Resource approved successfully");
    } catch (error) {
      toast.error("Failed to approve resource");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (resourceId) => {
    setActionLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPendingResources((prev) => prev.filter((r) => r.id !== resourceId));
      toast.success("Resource rejected");
    } catch (error) {
      toast.error("Failed to reject resource");
    } finally {
      setActionLoading(false);
    }
  };

  const handleFeature = async (resourceId) => {
    setActionLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Resource featured successfully");
    } catch (error) {
      toast.error("Failed to feature resource");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-surface rounded w-1/4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-surface rounded-2xl p-6 h-32"></div>
              ))}
            </div>
            <div className="bg-surface rounded-2xl p-8 h-96"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-brand/10">
              <FiShield className="w-8 h-8 text-brand" />
            </div>
            <div>
              <h1 className="text-4xl font-semibold text-text">
                Admin Dashboard
              </h1>
              <p className="text-lg text-text-soft">
                Manage resources, users, and platform settings
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm">
            <FiShield className="w-4 h-4" />
            Admin Access • {user?.email}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Resources"
            value={stats.totalResources}
            icon={<FiPackage className="w-6 h-6" />}
            color="brand"
          />
          <StatCard
            title="Pending Review"
            value={stats.pendingResources}
            icon={<FiAlertCircle className="w-6 h-6" />}
            color="warning"
          />
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<FiUsers className="w-6 h-6" />}
            color="success"
          />
          <StatCard
            title="Featured"
            value={stats.featuredResources}
            icon={<FiStar className="w-6 h-6" />}
            color="warning"
          />
        </div>

        {/* Pending Resources Section */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden mb-10">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-text">
              Pending Resources ({pendingResources.length})
            </h2>
            <p className="text-text-soft text-sm mt-1">
              Resources waiting for approval
            </p>
          </div>

          {pendingResources.length > 0 ? (
            <div className="divide-y divide-border">
              {pendingResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 hover:bg-bg-soft transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-text">
                          {resource.title}
                        </h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-bg-soft text-text-soft">
                          {resource.category}
                        </span>
                      </div>
                      <div className="text-sm text-text-soft">
                        Submitted by {resource.submittedBy} •{" "}
                        {resource.submittedAt}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="success"
                        size="sm"
                        icon={<FiCheckCircle />}
                        onClick={() => handleApprove(resource.id)}
                        loading={actionLoading}
                        disabled={actionLoading}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<FiXCircle />}
                        onClick={() => handleReject(resource.id)}
                        loading={actionLoading}
                        disabled={actionLoading}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<FiStar />}
                        onClick={() => handleFeature(resource.id)}
                        loading={actionLoading}
                        disabled={actionLoading}
                      >
                        Feature
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-lg font-medium text-text mb-2">
                All caught up!
              </h3>
              <p className="text-text-soft">No resources pending review</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-surface border border-border rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-text mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="secondary"
              className="justify-start h-auto py-4"
              onClick={() => toast.success("Coming soon!")}
            >
              <div className="text-left">
                <div className="font-medium text-text">Manage Users</div>
                <div className="text-sm text-text-soft">
                  View and manage user accounts
                </div>
              </div>
            </Button>
            <Button
              variant="secondary"
              className="justify-start h-auto py-4"
              onClick={() => toast.success("Coming soon!")}
            >
              <div className="text-left">
                <div className="font-medium text-text">Site Settings</div>
                <div className="text-sm text-text-soft">
                  Update platform configuration
                </div>
              </div>
            </Button>
            <Button
              variant="secondary"
              className="justify-start h-auto py-4"
              onClick={() => toast.success("Coming soon!")}
            >
              <div className="text-left">
                <div className="font-medium text-text">Analytics</div>
                <div className="text-sm text-text-soft">
                  View platform statistics
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color = "brand" }) => (
  <div className="bg-surface border border-border rounded-2xl p-6">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl bg-${color}/10`}>
        <div className={`text-${color}`}>{icon}</div>
      </div>
      <div className="text-3xl font-semibold text-text">{value}</div>
    </div>
    <div className="text-sm text-text-soft">{title}</div>
  </div>
);

export default AdminDashboard;
