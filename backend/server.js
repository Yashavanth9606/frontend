const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(express.json())

const JWT_SECRET = 'edulearn_secret_key_2024'

// ─── CONNECT TO MONGODB ──────────────────────────────────────
mongoose.connect('mongodb://localhost:27017/e-learn')
  .then(() => console.log('✅ MongoDB Connected → e-learn database'))
  .catch(err => console.error('❌ MongoDB Error:', err))

// ─── USER SCHEMA ─────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },
  role:      { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
  createdAt: { type: Date, default: Date.now }
})
const User = mongoose.model('User', userSchema)

// ─── ENROLLMENT SCHEMA ───────────────────────────────────────
const enrollmentSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId:    { type: Number, required: true },
  courseTitle: { type: String },
  courseEmoji: { type: String },
  price:       { type: Number },
  enrolledAt:  { type: Date, default: Date.now }
})
const Enrollment = mongoose.model('Enrollment', enrollmentSchema)

// ─── PROGRESS SCHEMA ─────────────────────────────────────────
const progressSchema = new mongoose.Schema({
  userId:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId:         { type: Number, required: true },
  completedLessons: { type: [String], default: [] },
  updatedAt:        { type: Date, default: Date.now }
})
const Progress = mongoose.model('Progress', progressSchema)

// ─── AUTH MIDDLEWARE ─────────────────────────────────────────
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token' })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// ─── REGISTER ────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required' })
    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters' })

    const exists = await User.findOne({ email })
    if (exists)
      return res.status(400).json({ message: 'Email already registered. Please login.' })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, role: role || 'student' })

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET, { expiresIn: '7d' }
    )

    console.log(`✅ Registered: ${name} | ${email} | role: ${user.role}`)
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// ─── LOGIN ───────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' })

    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ message: 'No account found with this email' })

    const match = await bcrypt.compare(password, user.password)
    if (!match)
      return res.status(400).json({ message: 'Incorrect password' })

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET, { expiresIn: '7d' }
    )

    console.log(`✅ Logged in: ${user.name} | ${user.role}`)
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// ─── GET ALL USERS (for admin) ───────────────────────────────
app.get('/api/users', auth, async (req, res) => {
  try {
    const users = await User.find({}, '-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ─── ENROLL IN COURSE ────────────────────────────────────────
app.post('/api/enrollments', auth, async (req, res) => {
  try {
    const { courseId, courseTitle, courseEmoji, price } = req.body
    const exists = await Enrollment.findOne({ userId: req.user.id, courseId })
    if (exists)
      return res.status(400).json({ message: 'Already enrolled in this course' })

    const enrollment = await Enrollment.create({
      userId: req.user.id, courseId, courseTitle, courseEmoji, price
    })
    console.log(`✅ Enrolled: ${req.user.name} → ${courseTitle}`)
    res.status(201).json(enrollment)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ─── GET MY ENROLLMENTS ──────────────────────────────────────
app.get('/api/enrollments', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.id })
    res.json(enrollments)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ─── SAVE PROGRESS ───────────────────────────────────────────
app.post('/api/progress', auth, async (req, res) => {
  try {
    const { courseId, completedLessons } = req.body
    const prog = await Progress.findOneAndUpdate(
      { userId: req.user.id, courseId },
      { completedLessons, updatedAt: new Date() },
      { upsert: true, new: true }
    )
    console.log(`✅ Progress: ${req.user.name} | course ${courseId} | ${completedLessons.length} lessons done`)
    res.json(prog)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ─── GET PROGRESS ────────────────────────────────────────────
app.get('/api/progress/:courseId', auth, async (req, res) => {
  try {
    const prog = await Progress.findOne({ userId: req.user.id, courseId: req.params.courseId })
    res.json(prog ? prog.completedLessons : [])
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ─── START ───────────────────────────────────────────────────
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000')
  console.log('📦 Routes: POST /api/auth/register | POST /api/auth/login')
  console.log('📦 Routes: GET/POST /api/enrollments | GET/POST /api/progress')
})