// src/components/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiShield } from "react-icons/fi";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import * as adminService from "../../services/admin";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { user } = useAuth();

  const [pendingResources, setPendingResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchPendingResources();
    }
  }, [user]);

  // 🔒 Fetch pending (admin-only)
  const fetchPendingResources = async () => {
    try {
      setLoading(true);

      const res = await adminService.getPendingResources();

      if (!res.success) {
        toast.error(res.message || "Failed to load pending resources");
        setPendingResources([]);
        return;
      }

      setPendingResources(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to load pending resources");
      setPendingResources([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ APPROVE
  const handleApprove = async (id) => {
    setActionLoading(true);
    try {
      const res = await adminService.approveResource(id);

      if (!res.success) {
        toast.error(res.message || "Approve failed");
        return;
      }

      setPendingResources((prev) =>
        prev.filter((resource) => resource._id !== id),
      );
      toast.success("Resource approved");
    } catch {
      toast.error("Approve failed");
    } finally {
      setActionLoading(false);
    }
  };

  // ❌ REJECT
  const handleReject = async (id) => {
    setActionLoading(true);
    try {
      const res = await adminService.rejectResource(id);

      if (!res.success) {
        toast.error(res.message || "Reject failed");
        return;
      }

      setPendingResources((prev) =>
        prev.filter((resource) => resource._id !== id),
      );
      toast.success("Resource rejected");
    } catch {
      toast.error("Reject failed");
    } finally {
      setActionLoading(false);
    }
  };

  // ⭐ FEATURE
  const handleFeature = async (id) => {
    setActionLoading(true);
    try {
      const res = await adminService.featureResource(id);

      if (!res.success) {
        toast.error(res.message || "Feature failed");
        return;
      }

      await fetchPendingResources();
      toast.success("Resource featured");
    } catch {
      toast.error("Feature failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading admin data...</div>;
  }

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2">
          <FiShield /> Admin Dashboard
        </h1>

        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">
              Pending Resources ({pendingResources.length})
            </h2>
          </div>

          {pendingResources.length > 0 ? (
            pendingResources.map((resource) => (
              <motion.div
                key={resource._id}
                className="p-6 border-b border-border flex justify-between"
              >
                <div>
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-sm text-text-soft">
                    Submitted by {resource.submittedBy?.username}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleApprove(resource._id)}
                    disabled={actionLoading}
                  >
                    Approve
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleReject(resource._id)}
                    disabled={actionLoading}
                  >
                    Reject
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeature(resource._id)}
                    disabled={actionLoading}
                  >
                    Feature
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-10 text-center text-text-soft">
              No pending resources
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
