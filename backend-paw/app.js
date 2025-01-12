const express = require("express");
const dotenv = require("dotenv");
const { connectToDb } = require("./db");
const petRoutes = require("./routes/pets");
const cors = require('cors');

dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies with increased payload size limit
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase payload size limit to 50MB
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Increase payload size limit for URL-encoded data

// Route setup
app.use("/pets", petRoutes);

// Connect to MongoDB and start the server when successful
connectToDb((err) => {
  if (err) {
    console.log("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if DB connection fails
  }

  console.log("Connected to MongoDB");

  // Start server only after DB connection
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
