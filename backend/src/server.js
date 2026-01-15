import app from "./app.js";
import connectDB from "./config/database.js";

// Connect to database
connectDB();

// Railway / Render injects PORT
const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

// Crash on unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`❌ Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
