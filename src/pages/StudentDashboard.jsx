import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './StudentDashboard.css'

const ACTUAL_TOTAL_LESSONS = { 1: 17, 2: 6, 3: 5 }

const DEFAULT_ENROLLED = [
  { id: 1, title: 'Complete Web Development Bootcamp', emoji: '💻', progress: 0, totalLessons: 17, completedLessons: 0 },
]

export default function StudentDashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Student"}')
  const savedEnrolled = JSON.parse(localStorage.getItem('enrolled') || 'null')
  const enrolled = savedEnrolled || DEFAULT_ENROLLED

  const getProgress = (courseId) => {
    const saved = JSON.parse(localStorage.getItem(`completed_${courseId}`) || '[]')
    const total = ACTUAL_TOTAL_LESSONS[courseId] || 1
    return Math.round((saved.length / total) * 100)
  }

  const completedCourses = enrolled.filter(e => getProgress(e.id) === 100)

  return (
    <div className="sd-page">
      <Navbar />
      <div className="sd-inner">
        <div className="sd-header">
          <div>
            <h1>Welcome back, {user.name}! 👋</h1>
            <p style={{color:'var(--text2)'}}>Continue your learning journey</p>
          </div>
          <button className="btn-primary" onClick={() => navigate('/courses')}>+ Explore Courses</button>
        </div>

        {/* Stats */}
        <div className="sd-stats">
          {[
            {icon:'📚', val: enrolled.length, lbl:'Enrolled Courses'},
            {icon:'✅', val: completedCourses.length, lbl:'Completed'},
            {icon:'🏆', val: completedCourses.length, lbl:'Certificates'},
            {icon:'🔥', val:'7', lbl:'Day Streak'},
          ].map((s, i) => (
            <div className="sd-stat card" key={i}>
              <span>{s.icon}</span>
              <div className="sd-stat-val">{s.val}</div>
              <div className="sd-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>

        <h2 style={{marginBottom:'18px'}}>My Courses</h2>
        {enrolled.length === 0 ? (
          <div className="empty-state card">
            <div>📚</div>
            <h3>No courses yet!</h3>
            <p>Enroll in a course to start learning</p>
            <button className="btn-primary" onClick={() => navigate('/courses')}>Browse Courses</button>
          </div>
        ) : (
          <div className="sd-courses">
            {enrolled.map(course => {
              const prog = getProgress(course.id)
              const done = prog === 100
              return (
                <div className="sd-course card" key={course.id}>
                  <div className="sd-course-thumb">{course.emoji}</div>
                  <div className="sd-course-info">
                    <h3>{course.title}</h3>
                    <div style={{display:'flex',alignItems:'center',gap:'10px',margin:'10px 0'}}>
                      <div className="prog-bar" style={{flex:1}}>
                        <div className="prog-fill" style={{width:`${prog}%`}} />
                      </div>
                      <span style={{fontSize:'0.82rem',color:'var(--text3)',whiteSpace:'nowrap'}}>{prog}%</span>
                    </div>
                    <p style={{fontSize:'0.82rem',color:'var(--text3)'}}>
                      {done ? '🎉 Course completed!' : `${ACTUAL_TOTAL_LESSONS[course.id] || course.totalLessons} lessons total`}
                    </p>
                  </div>
                  <div className="sd-course-actions">
                    {done ? (
                      <button className="btn-green" onClick={() => navigate(`/student/course/${course.id}`)}>🏆 View Certificate</button>
                    ) : (
                      <button className="btn-primary" onClick={() => navigate(`/student/course/${course.id}`)}>
                        {prog > 0 ? 'Continue →' : 'Start Course →'}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div style={{marginTop:'32px',textAlign:'center'}}>
          <button className="btn-outline" onClick={() => navigate('/courses')}>🔍 Browse More Courses</button>
        </div>
      </div>
    </div>
  )
}