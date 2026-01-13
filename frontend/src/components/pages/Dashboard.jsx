import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiAward, FiBookmark, FiTrendingUp, FiUpload } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import * as usersService from "../../services/users";
import Card from "../ui/Card";

/*
  DevFreebies Dashboard
  - Token based
  - Dark / light safe
  - SaaS-grade layout
*/

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookmarks");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [profileData, bookmarksData] = await Promise.all([
        usersService.getMyProfile(),
        usersService.getBookmarks(),
      ]);

      setProfile(profileData.data);
      setBookmarks(bookmarksData.data || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand"></div>
      </div>
    );
  }

  const stats = [
    {
      icon: FiBookmark,
      label: "Bookmarks",
      value: profile?.bookmarks?.length || 0,
    },
    {
      icon: FiUpload,
      label: "Submitted",
      value: profile?.submittedResources?.length || 0,
    },
    {
      icon: FiAward,
      label: "Score",
      value: profile?.contributionScore || 0,
    },
    {
      icon: FiTrendingUp,
      label: "Upvotes",
      value:
        profile?.submittedResources?.reduce(
          (sum, r) => sum + (r.upvotes || 0),
          0
        ) || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-2xl p-8 mb-10 flex items-center gap-6"
        >
          <img
            src={
              user?.avatar ||
              "https://ui-avatars.com/api/?background=6366f1&color=fff&name=U"
            }
            className="w-20 h-20 rounded-full ring-2 ring-brand/40"
          />

          <div>
            <h1 className="text-2xl font-semibold text-text">
              {user?.username}
            </h1>
            <p className="text-text-soft">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-brand-soft text-brand border border-brand/20">
              {user?.role}
            </span>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-surface border border-border rounded-xl p-6 hover:border-brand/30 transition"
              >
                <div className="w-10 h-10 mb-4 rounded-lg bg-brand-soft text-brand flex items-center justify-center">
                  <Icon />
                </div>
                <p className="text-3xl font-semibold text-text">{s.value}</p>
                <p className="text-sm text-text-soft">{s.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-surface border border-border rounded-2xl">
          <div className="flex border-b border-border">
            {["bookmarks", "submitted"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm transition ${
                  activeTab === tab
                    ? "text-brand border-b-2 border-brand"
                    : "text-text-soft hover:text-text"
                }`}
              >
                {tab === "bookmarks"
                  ? `Bookmarks (${bookmarks.length})`
                  : `Submitted (${profile?.submittedResources?.length || 0})`}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "bookmarks" &&
              (bookmarks.length ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarks.map((r) => (
                    <Card key={r._id} resource={r} onUpdate={fetchUserData} />
                  ))}
                </div>
              ) : (
                <p className="text-text-soft text-center py-16">
                  No bookmarks yet
                </p>
              ))}

            {activeTab === "submitted" &&
              (profile?.submittedResources?.length ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profile.submittedResources.map((r) => (
                    <Card key={r._id} resource={r} onUpdate={fetchUserData} />
                  ))}
                </div>
              ) : (
                <p className="text-text-soft text-center py-16">
                  No resources submitted yet
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
