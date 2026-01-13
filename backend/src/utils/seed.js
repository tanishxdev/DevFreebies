const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Resource = require("../models/Resource");
const User = require("../models/User");
const connectDB = require("../config/database");

dotenv.config();

const seedResources = [
  {
    title: "Vercel",
    description:
      "Free hosting and deployment platform for frontend applications",
    url: "https://vercel.com",
    category: "hosting",
    tags: ["frontend", "deployment", "cloud"], // CHANGED: 'hosting' -> 'cloud'
    upvotes: 150,
    isVerified: true,
    isFeatured: true,
  },
  {
    title: "Netlify",
    description: "All-in-one platform for deploying modern web projects",
    url: "https://netlify.com",
    category: "hosting",
    tags: ["cloud", "deployment", "frontend"], // CHANGED
    upvotes: 120,
    isVerified: true,
  },
  {
    title: "MongoDB Atlas",
    description: "Free cloud database service for MongoDB",
    url: "https://mongodb.com/cloud/atlas",
    category: "databases",
    tags: ["database", "cloud"],
    upvotes: 95,
    isVerified: true,
  },
  {
    title: "freeCodeCamp",
    description: "Free coding bootcamp with certifications",
    url: "https://freecodecamp.org",
    category: "courses",
    tags: ["learning", "beginner", "javascript"],
    upvotes: 200,
    isVerified: true,
    isFeatured: true,
  },
  {
    title: "OpenWeather API",
    description: "Free weather API with current and forecast data",
    url: "https://openweathermap.org/api",
    category: "apis",
    tags: ["api", "free"],
    upvotes: 85,
    isVerified: true,
  },
  {
    title: "Figma",
    description: "Free UI/UX design tool for teams",
    url: "https://figma.com",
    category: "tools",
    tags: ["design", "ui-ux", "free"],
    upvotes: 180,
    isVerified: true,
    isFeatured: true,
  },
  {
    title: "React.js",
    description: "JavaScript library for building user interfaces",
    url: "https://reactjs.org",
    category: "libraries",
    tags: ["javascript", "frontend", "react"],
    upvotes: 300,
    isVerified: true,
  },
  {
    title: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 engine",
    url: "https://nodejs.org",
    category: "tools",
    tags: ["backend", "javascript", "nodejs"],
    upvotes: 250,
    isVerified: true,
  },
  {
    title: "GitHub Education",
    description: "Free developer tools for students",
    url: "https://education.github.com",
    category: "tools",
    tags: ["education", "students", "free"],
    upvotes: 110,
    isVerified: true,
  },
  {
    title: "Postman",
    description: "API platform for building and using APIs",
    url: "https://postman.com",
    category: "tools",
    tags: ["api", "testing", "tools"],
    upvotes: 160,
    isVerified: true,
  },
];

const seedUsers = [
  {
    username: "admin",
    email: "admin@devfreebies.com",
    password: "admin123",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Admin&background=2563eb",
  },
  {
    username: "johndoe",
    email: "john@example.com",
    password: "password123",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=059669",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Resource.deleteMany({});
    await User.deleteMany({});

    console.log("🗑️  Database cleared");

    // Create users
    const createdUsers = await User.create(seedUsers);
    console.log(`✅ ${createdUsers.length} users created`);

    // Assign submittedBy to resources
    const adminUser = createdUsers.find((user) => user.role === "admin");

    const resourcesWithUser = seedResources.map((resource) => ({
      ...resource,
      submittedBy: adminUser._id,
    }));

    // Create resources
    const createdResources = await Resource.create(resourcesWithUser);
    console.log(`✅ ${createdResources.length} resources created`);

    // Update admin user with submitted resources
    await User.findByIdAndUpdate(adminUser._id, {
      submittedResources: createdResources.map((r) => r._id),
      contributionScore: createdResources.length * 5,
    });

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
