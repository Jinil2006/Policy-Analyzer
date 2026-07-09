import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Policy from './models/Policy.js';

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err.message));

// ─── JWT Auth Middleware ───────────────────────────────────────────────────────
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided. Please log in.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, name, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
  }
};

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

// ── Auth Routes ───────────────────────────────────────────────────────────────

// Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address format' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered. Please login instead.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already registered. Please login instead.' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login — returns JWT token
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT valid for 7 days
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ── Policy Routes (all protected by JWT) ──────────────────────────────────────

// POST /api/policies — Save analysis result
app.post('/api/policies', authMiddleware, async (req, res) => {
  try {
    const { policyName, summary, covered, notCovered, conditions, risks } = req.body;
    if (!policyName) {
      return res.status(400).json({ message: 'policyName is required' });
    }

    const policy = new Policy({
      userId: req.user.id,
      userEmail: req.user.email,
      policyName,
      summary: summary || '',
      covered: covered || [],
      notCovered: notCovered || [],
      conditions: conditions || [],
      risks: risks || []
    });
    await policy.save();

    res.status(201).json({ message: 'Policy saved successfully', policy });
  } catch (error) {
    console.error('Save policy error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/policies/recent — Fetch last 3 policies for logged-in user
app.get('/api/policies/recent', authMiddleware, async (req, res) => {
  try {
    const policies = await Policy.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('policyName summary covered notCovered conditions risks createdAt');

    res.status(200).json(policies);
  } catch (error) {
    console.error('Fetch recent policies error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/policies/:id — Fetch specific policy by ID
app.get('/api/policies/:id', authMiddleware, async (req, res) => {
  try {
    const policy = await Policy.findOne({ _id: req.params.id, userId: req.user.id });
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.status(200).json(policy);
  } catch (error) {
    console.error('Fetch policy by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Prevent crashes from unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

