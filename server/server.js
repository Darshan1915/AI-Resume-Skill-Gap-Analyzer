import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";
import connectDB from './config/db.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Adjust origin for your frontend URL
app.use(express.json()); // Body parser

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/analysis', analysisRoutes);

// Simple welcome route
app.get('/', (req, res) => {
  res.send('SkillBridge MERN Backend API is running.');
});

// Port listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));