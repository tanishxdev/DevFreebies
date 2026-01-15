// src/components/pages/Terms.jsx
const Terms = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using DevFreebies, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
      ],
    },
    {
      title: "Description of Service",
      content: [
        "DevFreebies is a platform for discovering and sharing free developer resources.",
        "The service includes browsing resources, submitting resources, bookmarking resources, and upvoting resources.",
        "We reserve the right to modify or discontinue the service at any time without notice.",
      ],
    },
    {
      title: "User Accounts",
      content: [
        "You must be at least 13 years old to create an account.",
        "You are responsible for maintaining the confidentiality of your account and password.",
        "You agree to accept responsibility for all activities that occur under your account.",
        "You must provide accurate and complete information when creating your account.",
      ],
    },
    {
      title: "User Content",
      content: [
        "Users may submit resources to the platform.",
        "By submitting content, you grant DevFreebies a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, and distribute the content.",
        "You are solely responsible for the content you submit and must ensure it does not violate any laws or third-party rights.",
        "We reserve the right to remove any content that violates these terms.",
      ],
    },
    {
      title: "Prohibited Activities",
      content: [
        "Submitting spam, misleading, or fraudulent content",
        "Attempting to circumvent any security measures",
        "Using the service for any illegal purpose",
        "Harassing, abusing, or harming another person",
        "Submitting content that infringes on intellectual property rights",
        "Attempting to gain unauthorized access to other users' accounts",
        "Using automated systems to access the service",
      ],
    },
    {
      title: "Resource Submission Guidelines",
      content: [
        "Resources must be completely free to use (no paid tiers required)",
        "No affiliate links or referral codes",
        "Resources must be relevant to software development",
        "No duplicate submissions",
        "Each user is limited to 3 resource submissions",
        "All submissions are subject to review and approval",
      ],
    },
    {
      title: "Intellectual Property",
      content: [
        "The DevFreebies platform and its original content, features, and functionality are owned by DevFreebies and are protected by international copyright, trademark, and other intellectual property laws.",
        "Submitted resources remain the property of their respective owners.",
      ],
    },
    {
      title: "Limitation of Liability",
      content: [
        "DevFreebies shall not be liable for any indirect, incidental, special, consequential or punitive damages.",
        "We do not guarantee the accuracy, completeness, or usefulness of any resources on the platform.",
        "We are not responsible for any damages resulting from the use of resources found on the platform.",
      ],
    },
    {
      title: "Termination",
      content: [
        "We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms.",
        "Upon termination, your right to use the service will immediately cease.",
      ],
    },
    {
      title: "Changes to Terms",
      content: [
        "We reserve the right to modify these terms at any time.",
        "We will provide notice of significant changes by posting the new terms on this page.",
        "Your continued use of the service after changes constitutes acceptance of the new terms.",
      ],
    },
    {
      title: "Contact Information",
      content: [
        "If you have any questions about these Terms, please contact us at terms@devfreebies.com.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-text mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-text-soft">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-surface border border-border rounded-2xl p-8">
            <p className="text-text-soft">
              Welcome to DevFreebies. These terms and conditions outline the
              rules and regulations for the use of DevFreebies' Website.
            </p>
          </div>

          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-2xl p-8"
            >
              <h2 className="text-2xl font-semibold text-text mb-6">
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="mt-1">•</div>
                    <span className="text-text-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-text-soft">
          <p>
            By using our service, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
