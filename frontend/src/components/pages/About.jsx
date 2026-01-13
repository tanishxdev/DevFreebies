import { motion } from "framer-motion";
import { FiHeart, FiTarget, FiUsers, FiZap } from "react-icons/fi";

const About = () => {
  const values = [
    {
      icon: FiHeart,
      title: "Community driven",
      description:
        "Built by developers, for developers. The best tools surface naturally through real usage.",
    },
    {
      icon: FiUsers,
      title: "Open source spirit",
      description:
        "Anyone can contribute, submit tools, and help others discover what actually works.",
    },
    {
      icon: FiTarget,
      title: "Quality first",
      description:
        "We focus on real, useful tools — not SEO spam or fake free trials.",
    },
    {
      icon: FiZap,
      title: "Always free",
      description:
        "Every resource listed is free or has a meaningful free tier.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-text py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Built for developers who care about good tools
          </h1>
          <p className="text-text-soft text-lg">
            DevFreebies is an open-source, community-driven directory that helps
            developers discover high-quality free tools, APIs, and resources —
            without the noise.
          </p>
        </motion.div>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-28">
          <div>
            <h2 className="text-2xl font-medium mb-4">Our mission</h2>
            <p className="text-text-soft leading-relaxed">
              Developers waste too much time searching the internet for decent
              free tools. We built DevFreebies to create one clean place where
              useful resources are easy to find, trust, and share.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium mb-4">Why it exists</h2>
            <p className="text-text-soft leading-relaxed">
              Great tools shouldn’t be hidden behind SEO spam or paywalls.
              DevFreebies lets the community surface what actually helps.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-28">
          <h2 className="text-2xl font-medium mb-12">What we believe in</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-8 rounded-2xl bg-surface border border-border"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand/10 text-brand mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{v.title}</h3>
                  <p className="text-sm text-text-soft">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
