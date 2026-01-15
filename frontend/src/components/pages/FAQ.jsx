// src/components/pages/FAQ.jsx
const FAQ = () => {
  const faqs = [
    {
      question: "What is DevFreebies?",
      answer:
        "DevFreebies is a community-driven platform where developers can discover, share, and save free tools, APIs, libraries, and resources for software development.",
    },
    {
      question: "How do I submit a resource?",
      answer:
        "Click on 'Submit' in the navigation menu (you need to be logged in). Fill out the form with the resource details, and our team will review it before it appears publicly.",
    },
    {
      question: "Is there a limit to how many resources I can submit?",
      answer:
        "Yes, each user can submit up to 3 resources to prevent spam and ensure quality submissions.",
    },
    {
      question: "How are resources verified?",
      answer:
        "Resources are reviewed by our admin team to ensure they are actually free, relevant to developers, and provide real value before being marked as verified.",
    },
    {
      question: "Can I bookmark resources?",
      answer:
        "Yes! When logged in, you can bookmark any resource by clicking the bookmark icon. You can access all your bookmarks from your profile page.",
    },
    {
      question: "How do I become an admin?",
      answer:
        "Admin roles are currently managed by the platform maintainers. If you're interested in helping moderate the community, contact us through the feedback page.",
    },
    {
      question: "Is this platform open source?",
      answer:
        "Yes! DevFreebies is open source. You can find the code on GitHub and contribute to the project.",
    },
    {
      question: "How can I report an issue with a resource?",
      answer:
        "If you find a resource that is no longer free, broken, or inappropriate, please use the feedback form to let us know.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-text mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-text-soft">
            Everything you need to know about DevFreebies
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-text mb-3">
                {faq.question}
              </h3>
              <p className="text-text-soft">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-surface border border-border rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-text mb-4">
              Still have questions?
            </h3>
            <p className="text-text-soft mb-6">
              Feel free to reach out to us through our feedback form.
            </p>
            <a href="/feedback">
              <Button variant="primary">Contact Us</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Button component for FAQ
const Button = ({ variant = "primary", children, ...props }) => (
  <button
    className={`px-6 py-3 rounded-xl font-medium transition-colors ${
      variant === "primary"
        ? "bg-brand text-brand-foreground hover:bg-brand/90"
        : "bg-bg-soft text-text hover:bg-bg"
    }`}
    {...props}
  >
    {children}
  </button>
);

export default FAQ;
