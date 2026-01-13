import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as resourcesService from "../../services/resources";
import Button from "../ui/Button";

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    categories: 0,
    loading: true,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [resourcesRes, categoriesRes] = await Promise.all([
        resourcesService.getResources({ limit: 1 }),
        resourcesService.getCategories(),
      ]);

      setStats({
        total: resourcesRes?.total || 0,
        categories: categoriesRes?.data?.length || 0,
        loading: false,
      });
    } catch (e) {
      console.error("Hero stats error", e);
      setStats({ total: 0, categories: 0, loading: false });
    }
  };

  const handleSubmitClick = () => {
    navigate("/login?redirect=/submit");
  };

  return (
    <section className="relative bg-bg overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand/10 blur-[120px]" />
        <div className="absolute top-40 -right-40 w-96 h-96 bg-brand/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            {stats.loading ? (
              "Loading..."
            ) : (
              <>
                <CountUp end={stats.total} duration={1} /> free developer
                resources
              </>
            )}
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-text mb-6 leading-tight"
          >
            Discover better tools
            <br />
            <span className="text-brand">for modern developers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-soft mb-12"
          >
            A curated directory of high-quality free APIs, libraries, templates
            and tools — without the noise.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/resources">
              <Button size="lg" variant="primary" icon={<FiSearch />}>
                Browse resources
              </Button>
            </Link>

            {/* Only visitors see submit CTA */}
            {!isAuthenticated && (
              <Button
                size="lg"
                variant="outline"
                icon={<FiArrowRight />}
                iconPosition="right"
                onClick={handleSubmitClick}
              >
                Submit a tool
              </Button>
            )}
          </motion.div>

          {/* Live stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center"
          >
            <Stat value={stats.total} label="Resources" />
            <Stat value={stats.categories} label="Categories" />
            <Stat value="Live" label="Updates" />
            <Stat value="100%" label="Free" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ value, label }) => (
  <div>
    <div className="text-2xl sm:text-3xl font-semibold text-text">{value}</div>
    <div className="text-sm text-text-soft">{label}</div>
  </div>
);

export default Hero;
