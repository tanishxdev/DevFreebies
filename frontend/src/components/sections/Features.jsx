import { motion } from "framer-motion";
import {
  FiBookmark,
  FiSearch,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";

const Features = () => {
  const features = [
    {
      icon: FiSearch,
      title: "Fast discovery",
      description:
        "Find the best developer tools instantly using powerful filters and search.",
    },
    {
      icon: FiBookmark,
      title: "Save & organize",
      description:
        "Bookmark and manage all your favorite resources in one place.",
    },
    {
      icon: FiZap,
      title: "Always free",
      description:
        "Every resource on DevFreebies is free and curated for developers.",
    },
    {
      icon: FiUsers,
      title: "Built by developers",
      description:
        "The community helps surface the most useful tools and libraries.",
    },
    {
      icon: FiTrendingUp,
      title: "Trending tools",
      description:
        "See what other developers are using and recommending right now.",
    },
    {
      icon: FiShield,
      title: "Quality first",
      description:
        "Every resource is reviewed to ensure it provides real value.",
    },
  ];

  return (
    <section id="features" className="py-28 bg-bg scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-text mb-4"
          >
            Built for modern developers
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-soft max-w-2xl mx-auto"
          >
            DevFreebies helps you discover, save, and share the best free tools
            — without the noise.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative p-8 rounded-2xl bg-surface border border-border hover:shadow-soft transition-all"
              >
                {/* Subtle glow */}
                <div className="absolute inset-0 rounded-2xl bg-brand/5 opacity-0 group-hover:opacity-100 transition pointer-events-none" />

                {/* Icon */}
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Text */}
                <h3 className="text-lg font-medium text-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-soft leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
