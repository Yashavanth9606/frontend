import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './CoursePlayer.css'

const COURSE_DATA = {
  1: {
    title: 'Complete Web Development Bootcamp', emoji: '💻',
    modules: [
      { title: 'Introduction', lessons: [
        { title: 'Welcome to the Course', duration: '5:20', videoId: 'ysEN5RaKOlA' },
        { title: 'Setup & Installation', duration: '12:45', videoId: 'UB1O30fR-EE' },
        { title: 'How the Web Works', duration: '8:30', videoId: 'hJHvdBlSxug' },
      ]},
      { title: 'C Programming / HTML & CSS', lessons: [
        { title: 'Data Types', duration: '14:10', videoId: 'KJgsSFOSQv0' },
        { title: 'Arrays & Pointers', duration: '18:22', videoId: 'zuegQmMdy8M' },
        { title: 'Functions', duration: '11:05', videoId: 'j-_s8f5K30I' },
        { title: 'CSS Styling', duration: '16:40', videoId: 'yfoY53QXEnI' },
      ]},
      { title: 'JavaScript Fundamentals', lessons: [
        { title: 'JS Basics', duration: '9:15', videoId: 'W6NZfCO5SIk' },
        { title: 'Data Types & Variables', duration: '13:30', videoId: 'edlFjlzxkSI' },
        { title: 'Arrays & Objects', duration: '17:00', videoId: '7W4pQQ20nJg' },
        { title: 'Functions & Loops', duration: '20:10', videoId: 'xUI5Tsl2JpY' },
      ]},
      { title: 'React Framework', lessons: [
        { title: 'React Introduction', duration: '8:45', videoId: 'Tn6-PIqc4UM' },
        { title: 'Components & Props', duration: '15:20', videoId: 'DLX62G4lc44' },
        { title: 'State & Hooks', duration: '22:10', videoId: 'O6P86uwfdR0' },
      ]},
      { title: 'Node.js Backend', lessons: [
        { title: 'Node.js Intro', duration: '10:30', videoId: 'TlB_eWDSMt4' },
        { title: 'Express.js', duration: '18:15', videoId: 'L72fhGm1tfE' },
        { title: 'REST APIs', duration: '24:00', videoId: 'pKd0Rpw7O48' },
        { title: 'MongoDB Integration', duration: '20:45', videoId: 'vjf774RKrLc' },
        { title: 'Final Project', duration: '35:00', videoId: 'nu_pCVPKzTk' },
      ]},
    ]
  },
  2: {
    title: 'UI/UX Design Masterclass', emoji: '🎨',
    modules: [
      { title: 'Design Principles', lessons: [
        { title: 'Color Theory', duration: '10:20', videoId: 'AvgCkHrcj8w' },
        { title: 'Typography Basics', duration: '12:45', videoId: 'hnBMTq_bVDU' },
        { title: 'Layout & Grid', duration: '9:30', videoId: 'HF-6N1iD_oI' },
      ]},
      { title: 'Figma', lessons: [
        { title: 'Figma Basics', duration: '16:40', videoId: 'FTFaQWZBqQ8' },
        { title: 'Prototyping', duration: '18:15', videoId: 'iBkXf6u8htI' },
        { title: 'Auto Layout', duration: '14:00', videoId: 'NrKX46DzkGQ' },
      ]},
    ]
  },
  3: {
    title: 'Data Science & Machine Learning', emoji: '🤖',
    modules: [
      { title: 'Python Basics', lessons: [
        { title: 'Python Introduction', duration: '11:20', videoId: '_uQrJ0TkZlc' },
        { title: 'Data Types', duration: '14:45', videoId: 'khKv-8q7YmY' },
        { title: 'Functions & OOP', duration: '18:30', videoId: 'Ej_02ICOIgs' },
      ]},
      { title: 'ML Models', lessons: [
        { title: 'Linear Regression', duration: '19:40', videoId: 'nk2CQITm_eo' },
        { title: 'Neural Networks', duration: '28:00', videoId: 'aircAruvnKk' },
      ]},
    ]
  }
}

const parseDuration = (dur) => {
  const [m, s] = dur.split(':').map(Number)
  return m * 60 + (s || 0)
}

const downloadCertificate = (userName, courseTitle, courseEmoji, total, courseId) => {
  const certId = `EDU-${courseId}-${Date.now()}`
  const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>EduLearn Certificate - ${userName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0f0a1e; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: 'Lato', sans-serif; }
    .cert-wrap { width: 900px; background: linear-gradient(135deg, #1a0533 0%, #0f0a1e 50%, #1a0533 100%); border: 2px solid #7c3aed; border-radius: 24px; padding: 60px; position: relative; box-shadow: 0 0 80px rgba(124,58,237,0.4), inset 0 0 80px rgba(0,0,0,0.3); overflow: hidden; }
    .cert-wrap::before { content: ''; position: absolute; inset: 10px; border: 1px solid rgba(124,58,237,0.3); border-radius: 18px; pointer-events: none; }
    .blob1 { position: absolute; width: 400px; height: 400px; background: radial-gradient(circle, rgba(124,58,237,0.15), transparent); top: -100px; right: -100px; border-radius: 50%; }
    .blob2 { position: absolute; width: 300px; height: 300px; background: radial-gradient(circle, rgba(229,25,58,0.1), transparent); bottom: -80px; left: -80px; border-radius: 50%; }
    .stars { text-align: center; font-size: 1.2rem; letter-spacing: 12px; margin-bottom: 18px; color: #f59e0b; opacity: 0.7; }
    .logo { text-align: center; margin-bottom: 8px; }
    .logo-text { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 900; background: linear-gradient(135deg, #e5193a, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: 4px; }
    .logo-sub { font-size: 0.75rem; letter-spacing: 6px; color: rgba(255,255,255,0.35); text-transform: uppercase; margin-top: 2px; }
    .divider { display: flex; align-items: center; gap: 16px; margin: 22px 0; }
    .divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #7c3aed, transparent); }
    .divider-diamond { width: 8px; height: 8px; background: #f59e0b; transform: rotate(45deg); }
    .cert-title { text-align: center; font-size: 0.75rem; letter-spacing: 6px; text-transform: uppercase; color: rgba(167,139,250,0.8); margin-bottom: 16px; }
    .headline { font-family: 'Playfair Display', serif; font-size: 3.2rem; font-weight: 900; text-align: center; background: linear-gradient(135deg, #fff 0%, #a78bfa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 30px; line-height: 1.1; }
    .certifies-text { text-align: center; font-size: 1rem; color: rgba(255,255,255,0.55); letter-spacing: 2px; margin-bottom: 8px; }
    .student-name { text-align: center; font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #f59e0b; margin-bottom: 14px; text-shadow: 0 0 40px rgba(245,158,11,0.4); }
    .student-name::after { content: ''; display: block; width: 120px; height: 2px; background: linear-gradient(90deg, transparent, #f59e0b, transparent); margin: 8px auto 0; }
    .has-completed { text-align: center; font-size: 1rem; color: rgba(255,255,255,0.55); letter-spacing: 2px; margin: 16px 0 10px; }
    .course-name { text-align: center; font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: #a78bfa; margin-bottom: 6px; }
    .course-emoji { text-align: center; font-size: 2.5rem; margin-bottom: 10px; }
    .badge-row { display: flex; justify-content: center; gap: 20px; margin: 28px 0; flex-wrap: wrap; }
    .badge-item { background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.35); border-radius: 50px; padding: 8px 20px; font-size: 0.82rem; color: #a78bfa; letter-spacing: 1px; }
    .badge-item span { color: #10b981; font-weight: 700; }
    .bottom-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 32px; padding-top: 28px; border-top: 1px solid rgba(124,58,237,0.25); }
    .info-block { text-align: center; }
    .info-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.3); margin-bottom: 6px; }
    .info-value { font-size: 0.9rem; font-weight: 700; color: rgba(255,255,255,0.85); }
    .seal { position: absolute; bottom: 55px; right: 60px; width: 90px; height: 90px; border-radius: 50%; background: linear-gradient(135deg, #7c3aed, #e5193a); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.55rem; letter-spacing: 1px; text-transform: uppercase; color: #fff; font-weight: 700; box-shadow: 0 0 30px rgba(124,58,237,0.6); border: 2px solid rgba(255,255,255,0.2); }
    .seal-icon { font-size: 1.6rem; margin-bottom: 2px; }
    .print-btn { display: block; margin: 40px auto 0; background: linear-gradient(135deg, #7c3aed, #e5193a); color: #fff; border: none; padding: 14px 40px; border-radius: 50px; font-size: 1rem; font-weight: 700; cursor: pointer; letter-spacing: 1px; box-shadow: 0 8px 30px rgba(124,58,237,0.4); }
    @media print { body { background: white; } .print-btn { display: none; } }
  </style>
</head>
<body>
  <div>
    <div class="cert-wrap">
      <div class="blob1"></div>
      <div class="blob2"></div>
      <div class="stars">★ ★ ★ ★ ★</div>
      <div class="logo">
        <div class="logo-text">EDULEARN</div>
        <div class="logo-sub">Learn Without Limits</div>
      </div>
      <div class="divider">
        <div class="divider-line"></div>
        <div class="divider-diamond"></div>
        <div class="divider-line"></div>
      </div>
      <div class="cert-title">Certificate of Completion</div>
      <div class="headline">Achievement<br/>Unlocked</div>
      <div class="certifies-text">T H I S &nbsp; C E R T I F I E S &nbsp; T H A T</div>
      <div class="student-name">${userName}</div>
      <div class="has-completed">H A S &nbsp; S U C C E S S F U L L Y &nbsp; C O M P L E T E D</div>
      <div class="course-emoji">${courseEmoji}</div>
      <div class="course-name">${courseTitle}</div>
      <div class="badge-row">
        <div class="badge-item">✅ <span>${total}/${total}</span> Lessons Completed</div>
        <div class="badge-item">🏆 <span>100%</span> Score</div>
        <div class="badge-item">🎓 Verified Certificate</div>
      </div>
      <div class="bottom-grid">
        <div class="info-block"><div class="info-label">Issue Date</div><div class="info-value">${date}</div></div>
        <div class="info-block"><div class="info-label">Certificate ID</div><div class="info-value">${certId}</div></div>
        <div class="info-block"><div class="info-label">Platform</div><div class="info-value">EduLearn</div></div>
      </div>
      <div class="seal"><div class="seal-icon">🏅</div><div>Verified</div><div>EduLearn</div></div>
    </div>
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `EduLearn_Certificate_${userName.replace(/\s+/g, '_')}.html`
  a.click()
  URL.revokeObjectURL(url)
}

export default function CoursePlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = COURSE_DATA[id] || COURSE_DATA[1]
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const timerRef = useRef(null)

  const allLessons = course.modules.flatMap((m, mi) =>
    m.lessons.map((l, li) => ({ ...l, moduleIdx: mi, lessonIdx: li, moduleTitle: m.title }))
  )
  const total = allLessons.length

  const [completed, setCompleted] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(`completed_${id}`) || '[]')) }
    catch { return new Set() }
  })
  const [current, setCurrent] = useState(0)
  const [showComplete, setShowComplete] = useState(false)
  const [showCert, setShowCert] = useState(false)
  const [watchTime, setWatchTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const progress = Math.round((completed.size / total) * 100)
  const currentLesson = allLessons[current]
  const getLessonKey = (mi, li) => `${mi}-${li}`
  const isLessonDone = (mi, li) => completed.has(getLessonKey(mi, li))
  const isCurrentDone = isLessonDone(currentLesson.moduleIdx, currentLesson.lessonIdx)
  const lessonDuration = parseDuration(currentLesson.duration)
  const required = Math.floor(lessonDuration * 0.8)
  const watchPct = Math.min(100, Math.round((watchTime / lessonDuration) * 100))

  useEffect(() => {
    setWatchTime(0)
    setIsPlaying(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [current])

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setIsPlaying(true)
    timerRef.current = setInterval(() => {
      setWatchTime(prev => {
        const next = prev + 1
        if (next >= required && !isCurrentDone) {
          clearInterval(timerRef.current)
          doMarkComplete(currentLesson.moduleIdx, currentLesson.lessonIdx)
        }
        return next
      })
    }, 1000)
  }

  const stopTimer = () => {
    setIsPlaying(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const doMarkComplete = (mi, li) => {
    const key = getLessonKey(mi, li)
    setCompleted(prev => {
      if (prev.has(key)) return prev
      const next = new Set(prev)
      next.add(key)
      localStorage.setItem(`completed_${id}`, JSON.stringify([...next]))
      if (next.size === total) setTimeout(() => setShowCert(true), 700)
      return next
    })
    setShowComplete(false)
  }

  const handleManualComplete = () => {
    doMarkComplete(currentLesson.moduleIdx, currentLesson.lessonIdx)
    stopTimer()
    if (current < total - 1) setTimeout(() => setCurrent(c => c + 1), 300)
  }

  const jumpToLesson = (idx) => { stopTimer(); setCurrent(idx) }

  return (
    <div className="player-page">
      <div className="player-topbar">
        <button className="player-back" onClick={() => navigate('/student')}>← Dashboard</button>
        <div className="player-title">{course.emoji} {course.title}</div>
        <div className="player-prog-wrap">
          <div className="prog-bar" style={{width:130}}><div className="prog-fill" style={{width:`${progress}%`}} /></div>
          <span>{progress}%</span>
        </div>
      </div>

      <div className="player-layout">
        <div className="player-main">
          <div className="video-wrapper">
            <iframe
              key={currentLesson.videoId}
              src={`https://www.youtube.com/embed/${currentLesson.videoId}?rel=0&modestbranding=1`}
              title={currentLesson.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-iframe"
            />
          </div>

          {!isCurrentDone && (
            <div className="watch-bar">
              <div className="watch-fill" style={{width:`${watchPct}%`}} />
              <span className="watch-label">
                {watchPct < 80 ? `Watch ${80 - watchPct}% more to auto-complete` : '✅ Ready to complete!'}
              </span>
            </div>
          )}

          <div className="lesson-actions">
            <div>
              <h3 style={{marginBottom:'3px'}}>{currentLesson.title}</h3>
              <p style={{fontSize:'0.8rem',color:'var(--text3)'}}>{currentLesson.moduleTitle} • {currentLesson.duration}</p>
            </div>
            <div style={{display:'flex',gap:'9px',flexWrap:'wrap',alignItems:'center'}}>
              {current > 0 && <button className="btn-outline" onClick={() => jumpToLesson(current - 1)}>← Prev</button>}
              {isCurrentDone
                ? <span className="done-tag">✅ Completed</span>
                : <button className="btn-primary" onClick={() => setShowComplete(true)}>Mark Complete ✓</button>
              }
              {current < total - 1 && <button className="btn-outline" onClick={() => jumpToLesson(current + 1)}>Next →</button>}
            </div>
          </div>

          {!isCurrentDone && (
            <div className="sim-box card">
              <p className="sim-title">⚡ Track Watch Progress</p>
              <div style={{display:'flex',gap:'9px',flexWrap:'wrap'}}>
                <button className={`sim-btn ${isPlaying?'playing':''}`} onClick={isPlaying ? stopTimer : startTimer}>
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
                <button className="sim-btn" onClick={() => {
                  stopTimer(); setWatchTime(required)
                  doMarkComplete(currentLesson.moduleIdx, currentLesson.lessonIdx)
                }}>⏩ Skip to End</button>
                <button className="sim-btn" onClick={() => { stopTimer(); setWatchTime(0) }}>⏮ Reset</button>
              </div>
              {isPlaying && <p style={{fontSize:'0.75rem',color:'var(--green)',marginTop:'8px'}}>🟢 {watchTime}s / {lessonDuration}s ({watchPct}%)</p>}
            </div>
          )}

          <div className="prog-summary card">
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{fontWeight:600}}>Course Progress</span>
              <span style={{color:'var(--purple-light)',fontWeight:700}}>{completed.size}/{total} lessons</span>
            </div>
            <div className="prog-bar"><div className="prog-fill" style={{width:`${progress}%`}} /></div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:'8px',fontSize:'0.8rem',color:'var(--text3)'}}>
              <span>{progress}% Complete</span>
              {progress === 100 && (
                <button className="btn-green" style={{padding:'5px 14px',fontSize:'0.8rem'}} onClick={() => setShowCert(true)}>
                  🏆 Get Certificate
                </button>
              )}
            </div>
          </div>
        </div>

        <aside className="player-sidebar">
          <div className="sidebar-header">
            <h3>Course Content</h3>
            <span style={{fontSize:'0.78rem',color:'var(--text3)'}}>{completed.size}/{total}</span>
          </div>
          {course.modules.map((mod, mi) => {
            const modDone = mod.lessons.filter((_, li) => isLessonDone(mi, li)).length
            return (
              <div key={mi} className="mod-section">
                <div className="mod-sec-header">
                  <span>{mod.title}</span>
                  <span className="mod-count">{modDone}/{mod.lessons.length}</span>
                </div>
                {mod.lessons.map((lesson, li) => {
                  const gi = allLessons.findIndex(l => l.moduleIdx === mi && l.lessonIdx === li)
                  const done = isLessonDone(mi, li)
                  const isCur = current === gi
                  return (
                    <div key={li} className={`lesson-item-player ${isCur?'current':''} ${done?'done':''}`} onClick={() => jumpToLesson(gi)}>
                      <span className="lesson-status">{done ? '✅' : isCur ? '▶' : '○'}</span>
                      <div style={{flex:1}}>
                        <p>{lesson.title}</p>
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </aside>
      </div>

      {showComplete && (
        <div className="modal-overlay" onClick={() => setShowComplete(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowComplete(false)}>✕</button>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:'3rem',marginBottom:'12px'}}>✅</div>
              <h2 style={{marginBottom:'8px'}}>Mark as Complete?</h2>
              <p style={{color:'var(--text2)',marginBottom:'6px',fontSize:'0.9rem'}}>"{currentLesson.title}"</p>
              {watchPct < 80
                ? <p style={{color:'var(--gold)',fontSize:'0.82rem',marginBottom:'20px'}}>⚠️ You've watched {watchPct}% — recommended to watch at least 80%</p>
                : <p style={{color:'var(--green)',fontSize:'0.82rem',marginBottom:'20px'}}>✅ Great! You've watched enough.</p>
              }
              <div style={{display:'flex',gap:'12px',justifyContent:'center'}}>
                <button className="btn-outline" onClick={() => setShowComplete(false)}>Cancel</button>
                <button className="btn-green" onClick={handleManualComplete}>✅ Complete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCert && (
        <div className="modal-overlay" onClick={() => setShowCert(false)}>
          <div className="modal-box cert-modal" onClick={e => e.stopPropagation()} style={{maxWidth:'560px'}}>
            <button className="modal-close" onClick={() => setShowCert(false)}>✕</button>
            <div style={{background:'linear-gradient(135deg,#1a0533,#0f0a1e)',border:'1px solid #7c3aed',borderRadius:'16px',padding:'32px 28px',textAlign:'center',position:'relative',overflow:'hidden',marginBottom:'20px'}}>
              <div style={{position:'absolute',top:-60,right:-60,width:200,height:200,background:'radial-gradient(circle,rgba(124,58,237,0.2),transparent)',borderRadius:'50%'}} />
              <div style={{fontSize:'0.65rem',letterSpacing:'5px',color:'rgba(167,139,250,0.6)',textTransform:'uppercase',marginBottom:'10px'}}>Certificate of Completion</div>
              <div style={{fontFamily:'serif',fontSize:'1.8rem',fontWeight:900,background:'linear-gradient(135deg,#e5193a,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',marginBottom:'16px',letterSpacing:'3px'}}>EDULEARN</div>
              <div style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.45)',letterSpacing:'2px',marginBottom:'6px'}}>THIS CERTIFIES THAT</div>
              <div style={{fontFamily:'serif',fontSize:'2rem',fontWeight:700,color:'#f59e0b',marginBottom:'6px',textShadow:'0 0 20px rgba(245,158,11,0.3)'}}>{user.name || 'Student'}</div>
              <div style={{width:'80px',height:'2px',background:'linear-gradient(90deg,transparent,#f59e0b,transparent)',margin:'0 auto 14px'}} />
              <div style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.4)',letterSpacing:'1px',marginBottom:'8px'}}>HAS SUCCESSFULLY COMPLETED</div>
              <div style={{fontSize:'1.1rem',color:'#a78bfa',fontWeight:700,marginBottom:'6px'}}>{course.emoji} {course.title}</div>
              <div style={{display:'flex',justifyContent:'center',gap:'12px',marginTop:'16px',flexWrap:'wrap'}}>
                <span style={{background:'rgba(16,185,129,0.15)',border:'1px solid rgba(16,185,129,0.3)',color:'#10b981',padding:'4px 12px',borderRadius:'50px',fontSize:'0.72rem'}}>✅ {total}/{total} Lessons</span>
                <span style={{background:'rgba(124,58,237,0.15)',border:'1px solid rgba(124,58,237,0.3)',color:'#a78bfa',padding:'4px 12px',borderRadius:'50px',fontSize:'0.72rem'}}>🏆 100% Score</span>
                <span style={{background:'rgba(245,158,11,0.12)',border:'1px solid rgba(245,158,11,0.25)',color:'#f59e0b',padding:'4px 12px',borderRadius:'50px',fontSize:'0.72rem'}}>🎓 Verified</span>
              </div>
              <div style={{marginTop:'18px',paddingTop:'14px',borderTop:'1px solid rgba(124,58,237,0.2)',fontSize:'0.72rem',color:'rgba(255,255,255,0.3)'}}>
                {new Date().toLocaleDateString('en-IN',{year:'numeric',month:'long',day:'numeric'})}
              </div>
            </div>
            <button className="btn-primary" style={{width:'100%',justifyContent:'center',padding:'14px',fontSize:'1rem',borderRadius:'12px'}} onClick={() => downloadCertificate(user.name || 'Student', course.title, course.emoji, total, id)}>
              📥 Download Beautiful Certificate
            </button>
            <p style={{textAlign:'center',fontSize:'0.75rem',color:'var(--text3)',marginTop:'10px'}}>Opens as HTML — press <strong>Ctrl+P</strong> to save as PDF</p>
          </div>
        </div>
      )}
    </div>
  )
}