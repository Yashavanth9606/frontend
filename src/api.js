const BASE = "https://backend-6znt.onrender.com/api";

const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...(localStorage.getItem('token')
    ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
    : {})
})

// ── AUTH ──────────────────────────────────────────────────────
export const registerUser = async (data) => {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
  return res.json()
}

export const loginUser = async (data) => {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
  return res.json()
}

// ── ENROLLMENTS ───────────────────────────────────────────────
export const enrollCourse = async (data) => {
  const res = await fetch(`${BASE}/enrollments`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
  return res.json()
}

export const getEnrollments = async () => {
  const res = await fetch(`${BASE}/enrollments`, { headers: getHeaders() })
  return res.json()
}

// ── PROGRESS ──────────────────────────────────────────────────
export const saveProgress = async (courseId, completedLessons) => {
  const res = await fetch(`${BASE}/progress`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ courseId, completedLessons })
  })
  return res.json()
}

export const getProgress = async (courseId) => {
  const res = await fetch(`${BASE}/progress/${courseId}`, { headers: getHeaders() })
  return res.json()
}