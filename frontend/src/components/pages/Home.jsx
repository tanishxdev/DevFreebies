// src/components/pages/Home.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowRight, FiSearch, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as resourcesService from "../../services/resources";
import Features from "../sections/Features";
import Hero from "../sections/Hero";
import Button from "../ui/Button";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [featuredResources, setFeaturedResources] = useState([]);
  const [trendingResources, setTrendingResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const [featuredRes, trendingRes] = await Promise.all([
        resourcesService.getResources({ featured: true, limit: 4 }),
        resourcesService.getResources({ sort: "-upvotes", limit: 6 }),
      ]);

      setFeaturedResources(featuredRes?.data || []);
      setTrendingResources(trendingRes?.data || []);
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero />

      {/* Featured Section */}
      <section className="py-20 bg-bg-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-text mb-4">
              Featured Resources
            </h2>
            <p className="text-text-soft max-w-2xl mx-auto">
              Hand-picked tools that our community loves
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-surface rounded-2xl p-6 animate-pulse"
                >
                  <div className="h-4 bg-bg rounded mb-4"></div>
                  <div className="h-20 bg-bg rounded mb-4"></div>
                  <div className="h-8 bg-bg rounded"></div>
                </div>
              ))}
            </div>
          ) : featuredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredResources.map((resource) => (
                <motion.div
                  key={resource._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="bg-surface border border-border rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs px-2 py-1 rounded-lg bg-brand/10 text-brand">
                      {resource.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-text-soft">
                      <FiTrendingUp className="w-4 h-4" />
                      {resource.upvotes}
                    </div>
                  </div>
                  <h3 className="font-semibold text-text mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-text-soft mb-4 line-clamp-2">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/resources/${resource._id}`}
                      className="text-sm text-brand hover:text-brand/80 transition-colors"
                    >
                      View details →
                    </Link>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-text-soft hover:text-text transition-colors"
                    >
                      Visit
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-soft">No featured resources yet</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/resources?featured=true">
              <Button variant="outline" icon={<FiArrowRight />}>
                View all featured
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-semibold text-text mb-2">
                Trending Now
              </h2>
              <p className="text-text-soft">Most upvoted resources this week</p>
            </div>
            <Link to="/resources?sort=-upvotes">
              <Button variant="ghost">View all</Button>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-surface rounded-2xl p-6 animate-pulse"
                >
                  <div className="h-4 bg-bg rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-bg rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-bg rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : trendingResources.length > 0 ? (
            <div className="space-y-4">
              {trendingResources.map((resource, index) => (
                <motion.div
                  key={resource._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-surface border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-text-soft">
                          #{index + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-text group-hover:text-brand transition-colors">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-text-soft line-clamp-1">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-text">
                          {resource.upvotes}
                        </div>
                        <div className="text-xs text-text-soft">Upvotes</div>
                      </div>
                      <Link
                        to={`/resources/${resource._id}`}
                        className="text-sm text-brand hover:text-brand/80 transition-colors"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-soft">No trending resources yet</p>
            </div>
          )}
        </div>
      </section>

      <Features />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand/10 to-brand-soft/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-text mb-4">
              Ready to explore?
            </h2>
            <p className="text-lg text-text-soft mb-8 max-w-2xl mx-auto">
              Join thousands of developers discovering and sharing the best free
              tools and resources.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/resources">
                <Button size="lg" variant="primary" icon={<FiSearch />}>
                  Browse All Resources
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link to="/register">
                  <Button size="lg" variant="outline">
                    Join Community
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
