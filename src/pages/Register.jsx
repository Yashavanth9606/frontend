import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../api'
import './Auth.css'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await registerUser(form)
      if (res.token) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        if (res.user.role === 'admin') navigate('/admin')
        else if (res.user.role === 'instructor') navigate('/instructor')
        else navigate('/student')
      } else {
        setError(res.message || 'Registration failed')
      }
    } catch {
      setError('❌ Cannot connect to backend. Run: cd backend && node server.js')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-bg"><div className="ab1" /><div className="ab2" /></div>
      <div className="auth-card">
        <div className="auth-logo" onClick={() => navigate('/')}>🎓 <span>Edu<b>Learn</b></span></div>
        <h2>Join EduLearn</h2>
        <p className="auth-sub">Create your free account and start learning</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div style={{
              background: 'rgba(229,25,58,0.1)',
              border: '1px solid rgba(229,25,58,0.3)',
              color: '#ff6b6b',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.84rem'
            }}>
              ⚠️ {error}
            </div>
          )}

          <div className="field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div className="field">
            <label>Register As</label>
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="student">🎓 Student</option>
              <option value="instructor">📚 Instructor</option>
              <option value="admin">⚙️ Admin</option>
            </select>
          </div>

          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? '⏳ Creating Account...' : '🎓 Create Free Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')}>Login Here</button>
        </p>
      </div>
    </div>
  )
}