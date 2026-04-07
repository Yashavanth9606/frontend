import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './AdminDashboard.css'

const MY_COURSES = [
  {id:1,title:'Complete Web Development Bootcamp',students:124,revenue:11036,rating:4.9,status:'Published',emoji:'💻'},
  {id:2,title:'React Advanced Patterns',students:56,revenue:5544,rating:4.8,status:'Published',emoji:'⚛️'},
]

export default function InstructorDashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [showAdd, setShowAdd] = useState(false)
  const [courses, setCourses] = useState(MY_COURSES)
  const [newCourse, setNewCourse] = useState({ title:'', price:'', emoji:'📚' })
  const [tab, setTab] = useState('courses')

  const handleAdd = () => {
    if (!newCourse.title) return
    setCourses([...courses, { ...newCourse, id: Date.now(), students: 0, revenue: 0, rating: 0, status: 'Draft' }])
    setNewCourse({ title:'', price:'', emoji:'📚' })
    setShowAdd(false)
  }

  return (
    <div className="ad-page">
      <Navbar />
      <div className="ad-inner">
        <div className="ad-header">
          <div>
            <h1>📚 Instructor Dashboard</h1>
            <p style={{color:'var(--text2)'}}>Welcome, {user.name}</p>
          </div>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>+ Add Course</button>
        </div>

        <div className="ad-stats">
          {[
            {icon:'📚',val:courses.length,lbl:'My Courses'},
            {icon:'👥',val:courses.reduce((a,c)=>a+c.students,0),lbl:'Total Students'},
            {icon:'💰',val:'$'+courses.reduce((a,c)=>a+c.revenue,0).toLocaleString(),lbl:'Total Earnings'},
            {icon:'⭐',val:'4.85',lbl:'Avg Rating'},
          ].map((s,i)=>(
            <div className="ad-stat card" key={i}>
              <span>{s.icon}</span>
              <div className="ad-stat-val">{s.val}</div>
              <div className="ad-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>

        <div className="ad-tabs">
          {['courses','analytics'].map(t=>(
            <button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>
              {t==='courses'?'📚 My Courses':'📊 Analytics'}
            </button>
          ))}
        </div>

        {tab === 'courses' && (
          <div className="ad-table card">
            <table>
              <thead><tr><th>Course</th><th>Students</th><th>Revenue</th><th>Rating</th><th>Status</th></tr></thead>
              <tbody>
                {courses.map(c=>(
                  <tr key={c.id}>
                    <td><span style={{marginRight:8}}>{c.emoji}</span>{c.title}</td>
                    <td>{c.students}</td>
                    <td>${c.revenue.toLocaleString()}</td>
                    <td>{c.rating > 0 ? `⭐ ${c.rating}` : '-'}</td>
                    <td><span className={`badge ${c.status==='Published'?'badge-green':'badge-gold'}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'analytics' && (
          <div className="ad-overview">
            {[
              {msg:'124 students completed Web Development Bootcamp',time:'This month'},
              {msg:'New 5-star review on React Advanced Patterns',time:'2 days ago'},
              {msg:'Earnings milestone: $16,000 total revenue',time:'This week'},
            ].map((a,i)=>(
              <div className="activity-item card" key={i}>
                <span className="activity-dot" />
                <div><p>{a.msg}</p><span>{a.time}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={()=>setShowAdd(false)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <button className="modal-close" onClick={()=>setShowAdd(false)}>✕</button>
            <h2 style={{marginBottom:'20px'}}>Add New Course</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div className="field"><label>Course Title</label><input placeholder="Enter course title" value={newCourse.title} onChange={e=>setNewCourse({...newCourse,title:e.target.value})} /></div>
              <div className="field"><label>Price ($)</label><input type="number" placeholder="Course price" value={newCourse.price} onChange={e=>setNewCourse({...newCourse,price:e.target.value})} /></div>
              <div className="field"><label>Emoji</label><input placeholder="e.g. 💻" value={newCourse.emoji} onChange={e=>setNewCourse({...newCourse,emoji:e.target.value})} /></div>
              <div style={{display:'flex',gap:'10px'}}>
                <button className="btn-outline" style={{flex:1,justifyContent:'center'}} onClick={()=>setShowAdd(false)}>Cancel</button>
                <button className="btn-primary" style={{flex:1,justifyContent:'center'}} onClick={handleAdd}>+ Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
