import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await loginUser(form)
      if (res.token) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        if (res.user.role === 'admin') navigate('/admin')
        else if (res.user.role === 'instructor') navigate('/instructor')
        else navigate('/student')
      } else {
        setError(res.message || 'Login failed')
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
        <h2>Welcome Back!</h2>
        <p className="auth-sub">Login to continue your learning journey</p>

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
            <label>Email Address</label>
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
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? '⏳ Logging in...' : '🔑 Login'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <button onClick={() => navigate('/register')}>Register Free</button>
        </p>
      </div>
    </div>
  )
}