import "dotenv/config";

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = 3000;

const startServer = async () => {
  try {
    console.log("Starting server...");

    await connectDB();

    console.log("MongoDB Connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("SERVER START ERROR:", error);
  }
};

startServer();