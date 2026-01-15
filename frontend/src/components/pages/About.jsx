// src/components/pages/About.jsx
import { motion } from "framer-motion";
import { FiCode, FiGithub, FiHeart, FiUsers } from "react-icons/fi";
import Button from "../ui/Button";

const About = () => {
  const team = [
    {
      name: "Tanish",
      role: "Founder & Developer",
      bio: "Full-stack developer passionate about open source and developer tools.",
      github: "https://github.com/tanishxdev",
    },
    // Add more team members as needed
  ];

  const stats = [
    { label: "Resources", value: "150+", icon: FiCode },
    { label: "Active Users", value: "1k+", icon: FiUsers },
    { label: "Contributors", value: "25+", icon: FiGithub },
    { label: "Upvotes", value: "2.5k+", icon: FiHeart },
  ];

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-semibold text-text mb-6">
            About DevFreebies
          </h1>
          <p className="text-lg text-text-soft mb-8">
            A community-driven platform for developers to discover, share, and
            save the best free tools and resources.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-surface border border-border"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand/10 text-brand mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-semibold text-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-soft">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border rounded-2xl p-8 mb-16"
        >
          <h2 className="text-2xl font-semibold text-text mb-6">Our Mission</h2>
          <div className="space-y-4 text-text-soft">
            <p>
              DevFreebies was born from a simple idea: developers shouldn't have
              to spend hours searching for quality free tools. Whether you're
              building your next startup, learning a new technology, or working
              on a personal project, finding the right resources should be easy.
            </p>
            <p>
              We're building a community-curated directory where developers can
              discover, review, and share their favorite free tools, APIs,
              libraries, and resources. Every resource is verified by our
              community to ensure quality and relevance.
            </p>
            <p>
              Our goal is to save developers time and help them build better
              products by providing easy access to the best free resources
              available.
            </p>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-text mb-8 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-surface border border-border rounded-2xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand to-brand-soft" />
                  <div>
                    <h3 className="text-lg font-semibold text-text">
                      {member.name}
                    </h3>
                    <p className="text-sm text-text-soft">{member.role}</p>
                  </div>
                </div>
                <p className="text-text-soft mb-4">{member.bio}</p>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand/80"
                >
                  <FiGithub className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-brand/10 to-brand-soft/30 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              Join Our Community
            </h2>
            <p className="text-text-soft mb-6 max-w-2xl mx-auto">
              Help us build the best resource directory for developers. Submit
              resources, upvote your favorites, and connect with other
              developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/tanishxdev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" icon={<FiGithub />}>
                  Star on GitHub
                </Button>
              </a>
              <a href="/submit">
                <Button variant="outline">Submit a Resource</Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
