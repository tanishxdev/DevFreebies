import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import * as resourcesService from "../../services/resources";
import Button from "../ui/Button";
import Card from "../ui/Card";

/*
  DevFreebies Resources
  - Token based
  - Dark / light safe
  - SaaS UI
*/

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "-createdAt",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  useEffect(() => {
    fetchResources();
  }, [filters, pagination.currentPage]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.currentPage,
        ...filters,
      };
      Object.keys(params).forEach((k) => params[k] === "" && delete params[k]);

      const res = await resourcesService.getResources(params);
      setResources(res.data || []);
      setPagination({
        currentPage: res.currentPage,
        totalPages: res.totalPages,
        total: res.total,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await resourcesService.getCategories();
      setCategories(res.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFilterChange = (k, v) => {
    setFilters({ ...filters, [k]: v });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handlePageChange = (p) => {
    setPagination({ ...pagination, currentPage: p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-semibold mb-3"
          >
            Discover developer tools
          </motion.h1>
          <p className="text-text-soft">
            Browse {pagination.total}+ curated free resources
          </p>
        </div>

        {/* Search & sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-soft" />
            <input
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              placeholder="Search tools, APIs, templates..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface border border-border text-text placeholder-text-soft focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="px-4 py-3 rounded-xl bg-surface border border-border text-text focus:outline-none"
          >
            <option value="-createdAt">Newest</option>
            <option value="-upvotes">Most Upvoted</option>
            <option value="-visits">Most Visited</option>
          </select>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => handleFilterChange("category", "")}
            className={`px-4 py-2 rounded-full text-sm transition ${
              filters.category === ""
                ? "bg-brand text-brand-foreground"
                : "bg-bg-soft text-text-soft hover:text-text"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => handleFilterChange("category", c.name)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                filters.category === c.name
                  ? "bg-brand text-brand-foreground"
                  : "bg-bg-soft text-text-soft hover:text-text"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-bg-soft animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((r) => (
                <Card key={r._id} resource={r} onUpdate={fetchResources} />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-16">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.currentPage === 1}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                >
                  Prev
                </Button>

                {[...Array(pagination.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      pagination.currentPage === i + 1
                        ? "bg-brand text-brand-foreground"
                        : "bg-bg-soft text-text-soft hover:text-text"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.currentPage === pagination.totalPages}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Resources;
