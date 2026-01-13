import { motion } from "framer-motion";

const Policy = () => {
  return (
    <div className="min-h-screen bg-bg text-text py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl font-semibold mb-2">Privacy Policy</h1>
            <p className="text-text-soft">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10 text-text-soft leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                1. Information we collect
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Account data (email, username, password)</li>
                <li>Profile information</li>
                <li>Submitted resources and feedback</li>
                <li>Usage data (views, bookmarks, votes)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                2. How we use your data
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide and improve the platform</li>
                <li>To process user actions and submissions</li>
                <li>To provide support and communication</li>
                <li>To maintain platform security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                3. Information sharing
              </h2>
              <p>
                We never sell your data. We only share information when required
                by law or to protect the platform and its users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                4. Security
              </h2>
              <p>
                We use industry-standard security practices to protect your
                personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                5. Your rights
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access your data</li>
                <li>Correct or delete your data</li>
                <li>Export your information</li>
                <li>Close your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">6. Cookies</h2>
              <p>
                We use cookies only to improve user experience and maintain
                sessions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                7. Children’s privacy
              </h2>
              <p>DevFreebies is not intended for users under 13 years old.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                8. Policy updates
              </h2>
              <p>
                We may update this policy and will reflect changes on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">9. Contact</h2>
              <p>
                If you have any questions, contact us at{" "}
                <a
                  href="mailto:privacy@devfreebies.com"
                  className="text-brand hover:opacity-80"
                >
                  privacy@devfreebies.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Policy;
