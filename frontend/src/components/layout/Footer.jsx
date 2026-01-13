import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  const footerSections = [
    {
      title: "Project",
      links: [
        { name: "Resources", path: "/resources" },
        { name: "Submit Tool", path: "/submit" },
        { name: "Featured", path: "/resources?featured=true" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "About", path: "/about" },
        { name: "FAQ", path: "/faq" },
        { name: "Feedback", path: "/feedback" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", path: "/policy" },
        { name: "Terms", path: "/terms" },
      ],
    },
  ];

  const socials = [
    { icon: FiGithub, path: "https://github.com/tanishxdev" },
    { icon: FiTwitter, path: "https://twitter.com" },
    { icon: FiLinkedin, path: "https://linkedin.com" },
    { icon: FiMail, path: "mailto:contact@devfreebies.com" },
  ];

  return (
    <footer className="bg-bg border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center">
                <span className="text-brand-foreground font-bold text-lg">
                  D
                </span>
              </div>
              <span className="text-lg font-semibold text-text">
                DevFreebies
              </span>
            </Link>

            <p className="text-text-soft text-sm max-w-md">
              An open-source directory of high-quality free tools and resources
              for developers. Built and maintained by Tanish.
            </p>

            <div className="flex gap-3 mt-6">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.path}
                  target="_blank"
                  whileHover={{ y: -2 }}
                  className="p-2 rounded-lg bg-bg-soft text-text-soft hover:text-brand hover:bg-bg-soft transition"
                >
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm text-text font-medium mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-text-soft hover:text-text transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-soft flex items-center gap-1">
            © {year} DevFreebies. Open source project by{" "}
            <a
              href="https://github.com/tanishxdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              Tanish
            </a>
          </p>

          <div className="flex gap-6 text-sm text-text-soft">
            <Link to="/policy" className="hover:text-text">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-text">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
