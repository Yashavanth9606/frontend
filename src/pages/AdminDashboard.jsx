import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './AdminDashboard.css'

const INIT_COURSES = [
  {id:1,title:'Complete Web Development Bootcamp',instructor:'John Smith',students:124,price:89,status:'Published',emoji:'💻'},
  {id:2,title:'UI/UX Design Masterclass',instructor:'Sarah Lee',students:87,price:79,status:'Published',emoji:'🎨'},
  {id:3,title:'Data Science & ML',instructor:'Dr. Raj Patel',students:156,price:99,status:'Published',emoji:'🤖'},
  {id:4,title:'Digital Marketing Guide',instructor:'Mike Johnson',students:43,price:69,status:'Draft',emoji:'📱'},
]

const STUDENTS = [
  {name:'Riya Sharma',email:'riya@demo.com',enrolled:3,joined:'Jan 2024',avatar:'👩'},
  {name:'Arjun Mehta',email:'arjun@demo.com',enrolled:1,joined:'Feb 2024',avatar:'👨'},
  {name:'Pooja Patel',email:'pooja@demo.com',enrolled:2,joined:'Mar 2024',avatar:'👩'},
  {name:'Karan Nair',email:'karan@demo.com',enrolled:4,joined:'Jan 2024',avatar:'👨'},
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [tab, setTab] = useState('overview')
  const [courses, setCourses] = useState(INIT_COURSES)
  const [showAdd, setShowAdd] = useState(false)
  const [newCourse, setNewCourse] = useState({ title:'', instructor:'', price:'', emoji:'📚' })

  const handleAdd = () => {
    if (!newCourse.title || !newCourse.instructor) return
    setCourses([...courses, { ...newCourse, id: Date.now(), students: 0, status: 'Draft', price: Number(newCourse.price) || 0 }])
    setNewCourse({ title:'', instructor:'', price:'', emoji:'📚' })
    setShowAdd(false)
  }

  const handleDelete = (id) => setCourses(courses.filter(c => c.id !== id))
  const toggleStatus = (id) => setCourses(courses.map(c => c.id===id ? {...c, status: c.status==='Published'?'Draft':'Published'} : c))

  return (
    <div className="ad-page">
      <Navbar />
      <div className="ad-inner">
        <div className="ad-header">
          <div>
            <h1>⚙️ Admin Dashboard</h1>
            <p style={{color:'var(--text2)'}}>Welcome back, {user.name}</p>
          </div>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>+ Add New Course</button>
        </div>

        {/* Stats */}
        <div className="ad-stats">
          {[
            {icon:'📚',val:courses.length,lbl:'Total Courses'},
            {icon:'👥',val:STUDENTS.length,lbl:'Total Students'},
            {icon:'💰',val:'$'+courses.reduce((a,c)=>a+c.students*c.price,0).toLocaleString(),lbl:'Total Revenue'},
            {icon:'✅',val:courses.filter(c=>c.status==='Published').length,lbl:'Published'},
          ].map((s,i)=>(
            <div className="ad-stat card" key={i}>
              <span>{s.icon}</span>
              <div className="ad-stat-val">{s.val}</div>
              <div className="ad-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="ad-tabs">
          {['overview','courses','students'].map(t=>(
            <button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>
              {t==='overview'?'📊 Overview':t==='courses'?'📚 Courses':'👥 Students'}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="ad-overview">
            <h3 style={{marginBottom:'16px'}}>Recent Activity</h3>
            {[
              {msg:'New student enrolled in Web Development Bootcamp',time:'2 min ago'},
              {msg:'Course "UI/UX Design" published',time:'1 hr ago'},
              {msg:'Payment received: $89 from Riya Sharma',time:'3 hr ago'},
              {msg:'New instructor registered: Tom Brown',time:'Yesterday'},
            ].map((a,i)=>(
              <div className="activity-item card" key={i}>
                <span className="activity-dot" />
                <div><p>{a.msg}</p><span>{a.time}</span></div>
              </div>
            ))}
          </div>
        )}

        {tab === 'courses' && (
          <div>
            <div className="ad-table card">
              <table>
                <thead><tr><th>Course</th><th>Instructor</th><th>Students</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {courses.map(c=>(
                    <tr key={c.id}>
                      <td><span style={{marginRight:8}}>{c.emoji}</span>{c.title}</td>
                      <td>{c.instructor}</td>
                      <td>{c.students}</td>
                      <td>${c.price}</td>
                      <td><span className={`badge ${c.status==='Published'?'badge-green':'badge-gold'}`}>{c.status}</span></td>
                      <td>
                        <div style={{display:'flex',gap:'8px'}}>
                          <button className="ad-act-btn" onClick={()=>toggleStatus(c.id)}>{c.status==='Published'?'Unpublish':'Publish'}</button>
                          <button className="ad-act-btn del" onClick={()=>handleDelete(c.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'students' && (
          <div className="ad-table card">
            <table>
              <thead><tr><th>Student</th><th>Email</th><th>Enrolled</th><th>Joined</th><th>Actions</th></tr></thead>
              <tbody>
                {STUDENTS.map((s,i)=>(
                  <tr key={i}>
                    <td><span style={{marginRight:8}}>{s.avatar}</span>{s.name}</td>
                    <td style={{color:'var(--text3)'}}>{s.email}</td>
                    <td>{s.enrolled} courses</td>
                    <td style={{color:'var(--text3)'}}>{s.joined}</td>
                    <td><button className="ad-act-btn">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD COURSE MODAL */}
      {showAdd && (
        <div className="modal-overlay" onClick={()=>setShowAdd(false)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <button className="modal-close" onClick={()=>setShowAdd(false)}>✕</button>
            <h2 style={{marginBottom:'20px'}}>Add New Course</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div className="field"><label>Course Title</label><input placeholder="Enter course title" value={newCourse.title} onChange={e=>setNewCourse({...newCourse,title:e.target.value})} /></div>
              <div className="field"><label>Instructor Name</label><input placeholder="Instructor name" value={newCourse.instructor} onChange={e=>setNewCourse({...newCourse,instructor:e.target.value})} /></div>
              <div className="field"><label>Price ($)</label><input type="number" placeholder="Course price" value={newCourse.price} onChange={e=>setNewCourse({...newCourse,price:e.target.value})} /></div>
              <div className="field"><label>Emoji Icon</label><input placeholder="e.g. 💻 🎨 🤖" value={newCourse.emoji} onChange={e=>setNewCourse({...newCourse,emoji:e.target.value})} /></div>
              <div style={{display:'flex',gap:'10px',marginTop:'6px'}}>
                <button className="btn-outline" style={{flex:1,justifyContent:'center'}} onClick={()=>setShowAdd(false)}>Cancel</button>
                <button className="btn-primary" style={{flex:1,justifyContent:'center'}} onClick={handleAdd}>+ Add Course</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
