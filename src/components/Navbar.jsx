import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const handleLogout = () => { localStorage.clear(); navigate('/') }

  const getDashLink = () => {
    if (!user) return '/'
    if (user.role === 'admin') return '/admin'
    if (user.role === 'instructor') return '/instructor'
    return '/student'
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <span className="logo-icon">🎓</span>
          <span className="logo-text">Edu<span>Learn</span></span>
        </div>

        <div className="nav-search">
          <span>🔍</span>
          <input placeholder="Search for courses..." onKeyDown={e => e.key === 'Enter' && navigate('/courses')} />
        </div>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <button className={isActive('/') ? 'active' : ''} onClick={() => navigate('/')}>Home</button>
          <button className={isActive('/courses') ? 'active' : ''} onClick={() => navigate('/courses')}>Courses</button>
          <button className={isActive('/about') ? 'active' : ''} onClick={() => navigate('/about')}>About</button>
          <button className={isActive('/blog') ? 'active' : ''} onClick={() => navigate('/blog')}>Blog</button>
        </div>

        <div className="nav-cta">
          {user ? (
            <>
              <button className="btn-purple nav-dash" onClick={() => navigate(getDashLink())}>
                {user.role === 'admin' ? '⚙️' : user.role === 'instructor' ? '📚' : '🎓'} Dashboard
              </button>
              <button className="btn-outline nav-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn-outline" onClick={() => navigate('/login')}>Login</button>
              <button className="btn-primary" onClick={() => navigate('/register')}>Join Free</button>
            </>
          )}
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
