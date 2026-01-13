import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as resourcesService from "../../services/resources";
import Features from "../sections/Features";
import Hero from "../sections/Hero";
import Button from "../ui/Button";
import Card from "../ui/Card";

const Home = () => {
  const [featuredResources, setFeaturedResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedResources();
  }, []);

  const fetchFeaturedResources = async () => {
    try {
      const response = await resourcesService.getResources({
        featured: "true",
        limit: 6,
      });
      setFeaturedResources(response.data || []);
    } catch (error) {
      console.error("Error fetching featured resources:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Hero */}
      <Hero />

      {/* Features */}
      <Features />

      {/* Featured resources */}
      <section className="py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-semibold mb-4"
            >
              Featured resources
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-soft max-w-xl mx-auto"
            >
              A curated selection of tools and platforms developers actually use
            </motion.p>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 rounded-2xl bg-bg-soft animate-pulse"
                />
              ))}
            </div>
          ) : featuredResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResources.map((resource) => (
                <Card
                  key={resource._id}
                  resource={resource}
                  onUpdate={fetchFeaturedResources}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-text-soft">
              No featured resources yet
            </div>
          )}

          {/* View all */}
          <div className="text-center mt-16">
            <Link to="/resources">
              <Button
                variant="primary"
                size="lg"
                icon={<FiArrowRight />}
                iconPosition="right"
              >
                Explore all resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-border bg-bg-soft">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold mb-6"
          >
            Discover better tools, faster
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-soft mb-10"
          >
            Join developers who use DevFreebies to find high-quality free tools
            without the noise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register">
              <Button size="lg" variant="primary">
                Get started
              </Button>
            </Link>
            <Link to="/resources">
              <Button size="lg" variant="outline">
                Browse resources
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
