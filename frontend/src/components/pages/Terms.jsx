import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="min-h-screen bg-bg text-text py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl font-semibold mb-2">Terms of Service</h1>
            <p className="text-text-soft">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10 text-text-soft leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                1. Acceptance of terms
              </h2>
              <p>
                By accessing or using DevFreebies, you agree to follow these
                Terms of Service. If you do not agree, you should not use the
                platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                2. What DevFreebies provides
              </h2>
              <p>
                DevFreebies is a community-driven platform that lists free
                tools, APIs, libraries, and resources for developers. We do not
                own or operate the listed services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                3. User accounts
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>You are responsible for your account security.</li>
                <li>You must provide accurate information.</li>
                <li>You must not use the platform for illegal activities.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                4. Submissions
              </h2>
              <p>
                When you submit a resource, you confirm that it is legal, safe,
                and appropriate. We reserve the right to remove spam or harmful
                content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                5. Content ownership
              </h2>
              <p>
                You keep ownership of your submissions, but you grant
                DevFreebies permission to display and promote them on the
                platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                6. Platform availability
              </h2>
              <p>
                We try to keep DevFreebies online at all times, but we do not
                guarantee uninterrupted service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                7. Limitation of liability
              </h2>
              <p>
                DevFreebies is provided “as is.” We are not responsible for
                damages caused by third-party tools or links listed on the
                platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                8. Termination
              </h2>
              <p>
                We may suspend or terminate accounts that violate these terms or
                harm the community.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                9. Changes to terms
              </h2>
              <p>
                We may update these terms. Continued use of the platform means
                you accept the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text mb-3">
                10. Contact
              </h2>
              <p>
                If you have questions about these terms, contact us at{" "}
                <a
                  href="mailto:contact@devfreebies.com"
                  className="text-brand hover:underline"
                >
                  contact@devfreebies.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
