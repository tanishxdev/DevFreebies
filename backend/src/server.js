// server.js
// Entry point of the application
// Responsible for:
// 1. Connecting to the database
// 2. Starting the Express server
// 3. Handling fatal runtime errors

import app from "./app.js";
import connectDB from "./config/database.js";

// Render / Railway inject PORT dynamically
// Fallback is only for local development
const PORT = Number(process.env.PORT) || 5000;

// Async wrapper to ensure DB connects BEFORE server starts
const startServer = async () => {
  try {
    // Connect to MongoDB
    // If this fails, server should NOT start
    await connectDB();

    // Start Express server
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle unhandled promise rejections (critical in production)
    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Rejection:", err.message);

      // Gracefully shutdown server before exiting
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    // If DB connection fails, crash immediately
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

// Bootstraps the application
startServer();
