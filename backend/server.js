const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const rideRoutes = require("./routes/rides");

dotenv.config();

const app = express();

// --- CORS (VERY IMPORTANT) ---
const corsOptions = {
  origin: [
    "https://cabontiet.netlify.app", // your Netlify frontend
    "http://localhost:5173"          // for local dev
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight

app.use(express.json());

// --- DB CONNECT ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// --- ROUTES ---
app.get("/", (req, res) => {
  res.send("CampusCab Backend Running");
});

app.use("/auth", authRoutes);
app.use("/rides", rideRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
