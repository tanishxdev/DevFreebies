// src/components/pages/Policy.jsx
const Policy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "When you register for an account, we collect your username, email address, and password.",
        "When you submit resources, we collect the resource details including title, description, URL, and category.",
        "We collect usage data such as pages visited, resources viewed, and interactions with the platform.",
        "We may collect device information and IP addresses for security and analytics purposes.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our service",
        "To notify you about changes to our service",
        "To allow you to participate in interactive features of our service",
        "To provide customer support",
        "To gather analysis or valuable information so that we can improve our service",
        "To monitor the usage of our service",
        "To detect, prevent and address technical issues",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We use encryption to protect sensitive information transmitted online.",
        "We also protect your information offline. Only employees who need the information to perform a specific job are granted access to personally identifiable information.",
        "The computers/servers in which we store personally identifiable information are kept in a secure environment.",
      ],
    },
    {
      title: "Sharing Your Information",
      content: [
        "We do not sell, trade, or rent users' personal identification information to others.",
        "We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers.",
        "We may use third-party service providers to help us operate our business and the Site or administer activities on our behalf, such as sending out newsletters or surveys.",
      ],
    },
    {
      title: "Your Rights",
      content: [
        "You have the right to access, update, or delete your personal information.",
        "You can update your profile information through your account settings.",
        "You can delete your account by contacting us.",
        "You can opt out of receiving promotional emails by following the unsubscribe instructions in those emails.",
      ],
    },
    {
      title: "Cookies",
      content: [
        "We use cookies to improve user experience, analyze site traffic, and personalize content.",
        "Cookies are small files stored on your device that help us remember your preferences.",
        "You can choose to disable cookies through your browser settings, but this may affect some functionality of the site.",
      ],
    },
    {
      title: "Changes to This Policy",
      content: [
        "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
        "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.",
      ],
    },
    {
      title: "Contact Us",
      content: [
        "If you have any questions about this Privacy Policy, please contact us at privacy@devfreebies.com.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-text mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-text-soft">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-surface border border-border rounded-2xl p-8">
            <p className="text-text-soft mb-6">
              At DevFreebies, we take your privacy seriously. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website and use our services.
            </p>
            <p className="text-text-soft">
              Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the
              site.
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
            By using our site, you acknowledge that you have read and understand
            this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
