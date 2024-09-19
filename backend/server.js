import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
// MongoDB Connection
connectDB();

const app = express();

// Middlewares
app.use(morgan("dev"))

// Importing Routes

import userRoutes from "./routes/userRoutes.js"

// http://localhost:8080/
// http://localhost:8080/api/v1/users
app.use("/api/v1/users", userRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`.bgMagenta);
});
