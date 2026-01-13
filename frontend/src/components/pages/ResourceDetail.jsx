import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiUpvote } from "react-icons/bi";
import {
  FiArrowLeft,
  FiBookmark,
  FiCalendar,
  FiExternalLink,
  FiEye,
} from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as resourcesService from "../../services/resources";
import * as usersService from "../../services/users";
import Button from "../ui/Button";

/*
  DevFreebies Resource Detail
  - Token based
  - Dark / light safe
  - Product focused
*/

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upvoted, setUpvoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    fetchResource();
  }, [id]);

  const fetchResource = async () => {
    try {
      const res = await resourcesService.getResource(id);
      setResource(res.data);
    } catch {
      toast.error("Resource not found");
      navigate("/resources");
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async () => {
    if (!isAuthenticated) return toast.error("Login first");
    const res = await resourcesService.upvoteResource(id);
    setUpvoted(res.data.upvoted);
    setResource((r) => ({ ...r, upvotes: res.data.upvotes }));
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) return toast.error("Login first");
    const res = await usersService.toggleBookmark(id);
    setBookmarked(res.bookmarked);
  };

  if (loading)
    return (
      <div className="h-screen grid place-items-center bg-bg text-text-soft">
        Loading...
      </div>
    );

  if (!resource) return null;

  return (
    <div className="bg-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          to="/resources"
          className="text-text-soft hover:text-text flex items-center gap-2 mb-8"
        >
          <FiArrowLeft /> Back to resources
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-brand-soft text-brand text-sm">
              {resource.category}
            </span>

            <h1 className="text-4xl font-bold text-text mb-4">
              {resource.title}
            </h1>

            <p className="text-text-soft max-w-2xl mb-6">
              {resource.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {resource.tags?.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-md bg-bg-soft text-text-soft text-sm"
                >
                  #{t}
                </span>
              ))}
            </div>

            {resource.image && (
              <img
                src={resource.image}
                alt=""
                className="w-full rounded-2xl border border-border shadow-soft"
              />
            )}
          </div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-border rounded-2xl p-6 shadow-soft h-fit"
          >
            <a href={resource.url} target="_blank" rel="noreferrer">
              <Button size="lg" className="w-full mb-4">
                Visit Resource <FiExternalLink />
              </Button>
            </a>

            <div className="grid grid-cols-2 gap-4 text-text-soft text-sm mb-4">
              <div className="flex items-center gap-2">
                <BiUpvote /> {resource.upvotes}
              </div>
              <div className="flex items-center gap-2">
                <FiEye /> {resource.visits}
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <FiCalendar /> {new Date(resource.createdAt).toDateString()}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant={upvoted ? "primary" : "outline"}
                className="flex-1"
                onClick={handleUpvote}
              >
                <BiUpvote /> Upvote
              </Button>
              <Button
                variant={bookmarked ? "primary" : "outline"}
                className="flex-1"
                onClick={handleBookmark}
              >
                <FiBookmark /> Save
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
