import express from "express";
import mongoose from "./db/mongoose.js";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import protectRoute from "./middleware/auth.js";
dotenv.config();

const app = express();


app.post("/api/v1/getallcourses", protectRoute,(req, res) => {
    console.log("req hit");
    return res.status(200).json({ message: "Courses fetched successfully" });  
})

app.use(express.json());
app.use("/api/v1/auth", authRoutes);


async function main() {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is missing from .env");
  }

  await mongoose.connect(process.env.MONGODB_URL);
  console.log("MongoDB connected");

  app.listen(3003, () => {
    console.log("Server is running on port 3003");
  });
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exitCode = 1;
});
