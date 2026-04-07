import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './CourseDetail.css'

const COURSES = {
  1:{id:1,title:'Complete Web Development Bootcamp',emoji:'💻',cat:'Development',rating:4.9,students:'12.4k',duration:'42h',price:89,instructor:'John Smith',desc:'Master HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and become a full-stack developer ready for industry.',totalLessons:18,modules:[{title:'Introduction',lessons:['Welcome to the Course','Setup & Installation','How the Web Works'],videos:3},{title:'C Programming / HTML & CSS',lessons:['Data Types','Arrays & Pointers','Functions','CSS Styling'],videos:4},{title:'JavaScript Fundamentals',lessons:['JS Basics','Data Types & Variables','Arrays & Objects','Functions & Loops'],videos:4},{title:'React Framework',lessons:['React Introduction','Components & Props','State & Hooks'],videos:3},{title:'Node.js Backend',lessons:['Node.js Intro','Express.js','REST APIs','MongoDB Integration','Final Project'],videos:5}]},
  2:{id:2,title:'UI/UX Design Masterclass',emoji:'🎨',cat:'Design',rating:4.8,students:'8.2k',duration:'28h',price:79,instructor:'Sarah Lee',desc:'Learn UX research, wireframing, prototyping and visual design. Master Figma and build a professional portfolio.',totalLessons:9,modules:[{title:'Design Principles',lessons:['Color Theory','Typography Basics','Layout & Grid'],videos:3},{title:'User Research',lessons:['User Interviews','Creating Personas','User Flows'],videos:3},{title:'Figma',lessons:['Figma Basics','Prototyping','Auto Layout'],videos:3}]},
  3:{id:3,title:'Data Science & Machine Learning',emoji:'🤖',cat:'Data Science',rating:4.9,students:'15.1k',duration:'55h',price:99,instructor:'Dr. Raj Patel',desc:'Deep dive into Python, Pandas, NumPy, Matplotlib, Scikit-learn and TensorFlow. Build real ML models from scratch.',totalLessons:8,modules:[{title:'Python Basics',lessons:['Python Introduction','Data Types','Functions & OOP'],videos:3},{title:'Data Analysis',lessons:['Pandas Basics','NumPy Arrays'],videos:2},{title:'ML Models',lessons:['Linear Regression','Neural Networks'],videos:2}]},
  4:{id:4,title:'Digital Marketing Complete Guide',emoji:'📱',cat:'Marketing',rating:4.7,students:'6.8k',duration:'24h',price:69,instructor:'Mike Johnson',desc:'Master SEO, social media marketing, email campaigns, and paid advertising.',totalLessons:8,modules:[{title:'SEO Basics',lessons:['Keyword Research','On-Page SEO','Link Building'],videos:3},{title:'Social Media',lessons:['Instagram Strategy','Facebook Ads','Content Creation'],videos:3},{title:'Analytics',lessons:['Google Analytics','Reporting'],videos:2}]},
  5:{id:5,title:'Python for Beginners to Advanced',emoji:'🐍',cat:'Development',rating:4.8,students:'20.3k',duration:'38h',price:84,instructor:'Anna White',desc:'Complete Python course from scratch to advanced concepts including OOP, file handling, and web scraping.',totalLessons:10,modules:[{title:'Python Basics',lessons:['Setup','Variables','Data Types','Loops'],videos:4},{title:'Intermediate',lessons:['Functions','OOP','Modules','File I/O'],videos:4},{title:'Advanced',lessons:['Web Scraping','APIs'],videos:2}]},
}

const validateCard = (num, exp, cvv, name) => {
  if (!name.trim()) return 'Please enter cardholder name'
  const cleanNum = num.replace(/\s/g, '')
  if (!/^\d{16}$/.test(cleanNum)) return 'Card number must be 16 digits'
  if (!/^\d{2}\/\d{2}$/.test(exp)) return 'Expiry must be MM/YY format'
  const [month, year] = exp.split('/').map(Number)
  if (month < 1 || month > 12) return 'Invalid expiry month'
  const now = new Date()
  const expDate = new Date(2000 + year, month - 1)
  if (expDate < now) return 'Card has expired'
  if (!/^\d{3,4}$/.test(cvv)) return 'CVV must be 3 or 4 digits'
  return null
}

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = COURSES[id] || COURSES[1]
  const [showPay, setShowPay] = useState(false)
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)
  const [payErr, setPayErr] = useState('')
  const [card, setCard] = useState({ num: '', exp: '', cvv: '', name: '' })

  const formatCardNum = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const handleEnroll = () => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    // check already enrolled
    const enrolled = JSON.parse(localStorage.getItem('enrolled') || '[]')
    if (enrolled.find(e => e.id === course.id)) {
      navigate('/student')
      return
    }
    setShowPay(true)
  }

  const handlePay = () => {
    setPayErr('')
    const err = validateCard(card.num, card.exp, card.cvv, card.name)
    if (err) { setPayErr(err); return }
    setPaying(true)
    setTimeout(() => {
      const enrolled = JSON.parse(localStorage.getItem('enrolled') || '[]')
      enrolled.push({
        id: course.id,
        title: course.title,
        emoji: course.emoji,
        price: course.price,
        totalLessons: course.totalLessons,
        enrolledAt: new Date().toISOString()
      })
      localStorage.setItem('enrolled', JSON.stringify(enrolled))
      setPaying(false)
      setPaid(true)
      setTimeout(() => { setShowPay(false); setPaid(false); navigate('/student') }, 2200)
    }, 2000)
  }

  const alreadyEnrolled = JSON.parse(localStorage.getItem('enrolled') || '[]').find(e => e.id === course.id)

  return (
    <div className="cd-page">
      <Navbar />
      <div className="cd-hero">
        <div className="container cd-hero-inner">
          <div className="cd-left">
            <div className="tag" style={{marginBottom:'12px'}}>{course.cat}</div>
            <h1>{course.title}</h1>
            <p>{course.desc}</p>
            <div className="cd-meta">
              <span>⭐ {course.rating}</span>
              <span>👥 {course.students} students</span>
              <span>⏱ {course.duration}</span>
              <span>📚 {course.totalLessons} lessons</span>
              <span>👨‍🏫 {course.instructor}</span>
            </div>
          </div>
          <div className="cd-card card">
            <div className="cd-emoji">{course.emoji}</div>
            <div className="cd-price">${course.price}</div>
            {alreadyEnrolled ? (
              <button className="btn-green" style={{width:'100%',justifyContent:'center',marginBottom:'10px'}} onClick={() => navigate(`/student/course/${course.id}`)}>
                ▶ Continue Learning
              </button>
            ) : (
              <button className="btn-primary" style={{width:'100%',justifyContent:'center',marginBottom:'10px'}} onClick={handleEnroll}>
                🎓 Enroll Now
              </button>
            )}
            <button className="btn-outline" style={{width:'100%',justifyContent:'center'}}>▶ Free Preview</button>
            <p style={{textAlign:'center',fontSize:'0.78rem',color:'var(--text3)',marginTop:'12px'}}>✅ 30-Day Money-Back Guarantee</p>
            <div className="cd-includes">
              <p>This course includes:</p>
              <span>📹 {course.duration} on-demand video</span>
              <span>📚 {course.totalLessons} lessons</span>
              <span>📱 Mobile & desktop access</span>
              <span>♾️ Lifetime access</span>
              <span>🏆 Certificate of completion</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{padding:'50px 24px 60px'}}>
        <h2 style={{marginBottom:'22px'}}>Course Curriculum</h2>
        <p style={{color:'var(--text2)',marginBottom:'24px',fontSize:'0.9rem'}}>{course.totalLessons} lessons • {course.duration} total</p>
        <div className="modules-list">
          {course.modules.map((mod, mi) => (
            <div className="module-item card" key={mi}>
              <div className="mod-header">
                <div>
                  <h3>Module {mi+1}: {mod.title}</h3>
                  <span style={{fontSize:'0.78rem',color:'var(--text3)'}}>{mod.lessons.length} lessons • {mod.videos} videos</span>
                </div>
                <span style={{opacity:0.4,fontSize:'1.1rem'}}>{alreadyEnrolled ? '🔓' : '🔒'}</span>
              </div>
              <div className="mod-lessons">
                {mod.lessons.map((l,li)=>(
                  <div className="lesson-row" key={li}>
                    <span style={{color:'var(--text3)',fontSize:'0.75rem'}}>▶</span>
                    <span style={{flex:1}}>{l}</span>
                    <span style={{fontSize:'0.72rem',color:alreadyEnrolled?'var(--green)':'var(--text3)'}}>
                      {alreadyEnrolled ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="btn-outline" style={{marginTop:'28px'}} onClick={() => navigate('/courses')}>← Back to Courses</button>
      </div>

      {/* PAYMENT MODAL */}
      {showPay && (
        <div className="modal-overlay" onClick={() => !paying && !paid && setShowPay(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            {!paid ? (
              <>
                <button className="modal-close" onClick={() => setShowPay(false)}>✕</button>
                <h2 style={{marginBottom:'4px'}}>Complete Payment</h2>
                <p style={{color:'var(--text2)',fontSize:'0.85rem',marginBottom:'20px'}}>🔒 Secure payment • SSL encrypted</p>

                {/* Order summary */}
                <div style={{background:'var(--surface2)',borderRadius:'10px',padding:'14px 16px',marginBottom:'18px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                      <p style={{fontSize:'0.85rem',fontWeight:600}}>{course.emoji} {course.title}</p>
                      <p style={{fontSize:'0.75rem',color:'var(--text3)',marginTop:'2px'}}>Lifetime access • Certificate included</p>
                    </div>
                    <span style={{fontFamily:'Syne',fontSize:'1.4rem',fontWeight:800}}>${course.price}</span>
                  </div>
                </div>

                {payErr && (
                  <div style={{background:'rgba(229,25,58,0.1)',border:'1px solid rgba(229,25,58,0.3)',color:'#ff6b6b',padding:'10px 14px',borderRadius:'8px',fontSize:'0.83rem',marginBottom:'14px'}}>
                    ⚠️ {payErr}
                  </div>
                )}

                <div style={{display:'flex',flexDirection:'column',gap:'13px',marginBottom:'18px'}}>
                  <div className="field">
                    <label>Card Number</label>
                    <input
                      placeholder="1234 5678 9012 3456"
                      value={card.num}
                      maxLength={19}
                      onChange={e => setCard({...card, num: formatCardNum(e.target.value)})}
                    />
                  </div>
                  <div className="field">
                    <label>Cardholder Name</label>
                    <input placeholder="Name as on card" value={card.name} onChange={e => setCard({...card, name: e.target.value})} />
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                    <div className="field">
                      <label>Expiry (MM/YY)</label>
                      <input
                        placeholder="MM/YY"
                        value={card.exp}
                        maxLength={5}
                        onChange={e => {
                          let v = e.target.value.replace(/\D/g,'').slice(0,4)
                          if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2)
                          setCard({...card, exp: v})
                        }}
                      />
                    </div>
                    <div className="field">
                      <label>CVV</label>
                      <input placeholder="•••" type="password" maxLength={4} value={card.cvv} onChange={e => setCard({...card, cvv: e.target.value.replace(/\D/g,'')})} />
                    </div>
                  </div>
                </div>

                <button className="btn-primary" style={{width:'100%',justifyContent:'center',padding:'14px',fontSize:'1rem'}} onClick={handlePay} disabled={paying}>
                  {paying ? '⏳ Processing...' : `💳 Pay $${course.price}`}
                </button>
                <p style={{textAlign:'center',fontSize:'0.75rem',color:'var(--text3)',marginTop:'10px'}}>🔒 256-bit SSL • Your data is safe</p>
              </>
            ) : (
              <div style={{textAlign:'center',padding:'24px 0'}}>
                <div style={{fontSize:'4rem',marginBottom:'14px'}}>🎉</div>
                <h2 style={{marginBottom:'8px',color:'var(--green)'}}>Payment Successful!</h2>
                <p style={{color:'var(--text2)',marginBottom:'6px'}}>{course.title}</p>
                <p style={{color:'var(--text3)',fontSize:'0.85rem'}}>Redirecting to your dashboard...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
