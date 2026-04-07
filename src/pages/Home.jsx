import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Home.css'

const COURSES = [
  {id:1,title:'Complete Web Development Bootcamp',cat:'Development',rating:4.9,students:'12.4k',duration:'42h',price:89,badge:'Bestseller',emoji:'💻',instructor:'John Smith'},
  {id:2,title:'UI/UX Design Masterclass',cat:'Design',rating:4.8,students:'8.2k',duration:'28h',price:79,badge:'New',emoji:'🎨',instructor:'Sarah Lee'},
  {id:3,title:'Data Science & Machine Learning',cat:'Data Science',rating:4.9,students:'15.1k',duration:'55h',price:99,badge:'Bestseller',emoji:'🤖',instructor:'Dr. Raj Patel'},
  {id:4,title:'Digital Marketing Complete Guide',cat:'Marketing',rating:4.7,students:'6.8k',duration:'24h',price:69,badge:'Popular',emoji:'📱',instructor:'Mike Johnson'},
  {id:5,title:'Python for Beginners to Advanced',cat:'Development',rating:4.8,students:'20.3k',duration:'38h',price:84,badge:'Trending',emoji:'🐍',instructor:'Anna White'},
  {id:6,title:'React & Node.js Full Stack',cat:'Development',rating:4.8,students:'9.7k',duration:'48h',price:94,badge:'Hot',emoji:'⚛️',instructor:'Chris Dev'},
]

const TESTIMONIALS = [
  {name:'Riya Sharma',role:'Frontend Developer',emoji:'👩',text:'EduLearn completely changed my career. I went from zero coding knowledge to landing a dev job in 6 months!'},
  {name:'Arjun Mehta',role:'Data Analyst',emoji:'👨',text:'The Data Science course is incredible. Real projects, clear explanations — worth every rupee.'},
  {name:'Pooja Patel',role:'UI/UX Designer',emoji:'👩‍🎨',text:'Sarah\'s design course is hands-down the best online. I built my entire portfolio from the projects.'},
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="blob b1" />
          <div className="blob b2" />
          <div className="blob b3" />
          <div className="dots-bg" />
        </div>
        <div className="container hero-inner">
          <div className="hero-left">
            <div className="hero-pill">🚀 <span>Join 50,000+ Learners Worldwide</span></div>
            <h1>Learn New Skills.<br />Build Your <span className="grad-text">Dream Career.</span></h1>
            <p>Access 8,000+ courses taught by industry experts. Learn at your own pace and get certified — all in one place.</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => navigate('/courses')}>🎓 Explore Courses</button>
              <button className="btn-outline" onClick={() => navigate('/register')}>Start Free Today</button>
            </div>
            <div className="hero-trust">
              <div className="avatars">
                {['👩','👨','👩‍💼','👨‍💻','👩‍🎨'].map((e,i) => <span key={i}>{e}</span>)}
              </div>
              <p><strong>50,000+</strong> students already learning</p>
            </div>
          </div>
          <div className="hero-right">
            <div className="floating-card main-fc">
              <span className="fc-emoji">💻</span>
              <h3>Complete Web Dev Bootcamp</h3>
              <div className="fc-meta">⭐ 4.9 • 12.4k students • 42h</div>
              <div style={{marginTop:'14px',background:'rgba(124,58,237,0.15)',borderRadius:'8px',padding:'8px 12px',fontSize:'0.78rem',color:'var(--purple-light)',textAlign:'center'}}>
                🔥 Most Popular Course
              </div>
            </div>
            <div className="floating-card mini-fc top-fc">
              <span>🏆</span>
              <div><strong>Certificate Ready</strong><p>Get certified today</p></div>
            </div>
            <div className="floating-card mini-fc bot-fc">
              <span>📈</span>
              <div><strong>Career Growth</strong><p>+40% avg salary boost</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {[
              {val:'50K+',lbl:'Students Worldwide'},
              {val:'8,000+',lbl:'Expert Courses'},
              {val:'1,200+',lbl:'Instructors'},
              {val:'120+',lbl:'Countries'},
            ].map((s,i) => (
              <div key={i}>
                <div style={{fontFamily:'Syne',fontSize:'2rem',fontWeight:800,background:'linear-gradient(135deg,var(--accent),var(--purple-light))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{s.val}</div>
                <div style={{color:'var(--text3)',fontSize:'0.88rem',marginTop:'4px'}}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED COURSES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Featured Courses</div>
            <h2>Learn From The <span>Best Instructors</span></h2>
            <p>Hand-picked courses with the highest ratings and most up-to-date content</p>
          </div>
          <div className="courses-grid">
            {COURSES.map(c => (
              <div className="course-card card" key={c.id} onClick={() => navigate(`/courses/${c.id}`)}>
                <div className="cc-thumb">
                  <span className="cc-emoji">{c.emoji}</span>
                  {c.badge && <div className="badge badge-red cc-badge">{c.badge}</div>}
                </div>
                <div className="cc-body">
                  <div className="tag" style={{marginBottom:'8px'}}>{c.cat}</div>
                  <h3>{c.title}</h3>
                  <p style={{fontSize:'0.8rem',color:'var(--text3)',margin:'4px 0 10px'}}>by {c.instructor}</p>
                  <div className="cc-meta">
                    <span>⭐ {c.rating}</span>
                    <span>👥 {c.students}</span>
                    <span>⏱ {c.duration}</span>
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'12px'}}>
                    <span style={{fontFamily:'Syne',fontSize:'1.25rem',fontWeight:800}}>${c.price}</span>
                    <button className="btn-primary" style={{padding:'8px 16px',fontSize:'0.82rem'}}
                      onClick={e => {e.stopPropagation(); navigate(`/courses/${c.id}`)}}>
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'40px'}}>
            <button className="btn-outline" onClick={() => navigate('/courses')}>View All Courses →</button>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section" style={{background:'var(--bg2)'}}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Why EduLearn</div>
            <h2>Everything You Need to <span>Succeed</span></h2>
          </div>
          <div className="features-grid">
            {[
              {icon:'🎯',title:'Expert Instructors',desc:'Learn from industry professionals with real-world experience and proven teaching methods.'},
              {icon:'📱',title:'Learn Anywhere',desc:'Access all courses on mobile, tablet, or desktop. Download for offline learning anytime.'},
              {icon:'🏆',title:'Recognized Certificates',desc:'Earn certificates trusted by 500+ companies worldwide to boost your career prospects.'},
              {icon:'♾️',title:'Lifetime Access',desc:'Once enrolled, you own the course forever. Learn at your pace, revisit anytime.'},
              {icon:'💬',title:'Community Support',desc:'Join a community of learners. Get help, share projects, and grow together.'},
              {icon:'💰',title:'30-Day Guarantee',desc:'Not satisfied? Get a full refund within 30 days — no questions asked.'},
            ].map((f,i) => (
              <div className="feature-card card" key={i}>
                <div className="feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Student Stories</div>
            <h2>What Our <span>Students Say</span></h2>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map((t,i) => (
              <div className="testi-card card" key={i}>
                <div style={{fontSize:'1.5rem',color:'var(--gold)',marginBottom:'14px'}}>★★★★★</div>
                <p style={{color:'var(--text2)',lineHeight:1.75,marginBottom:'20px'}}>"{t.text}"</p>
                <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  <span style={{fontSize:'2rem'}}>{t.emoji}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <p style={{fontSize:'0.82rem',color:'var(--text3)'}}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="container" style={{textAlign:'center'}}>
          <div className="section-badge" style={{margin:'0 auto 16px'}}>Start Today</div>
          <h2>Ready to Transform Your <span className="grad-text">Career?</span></h2>
          <p style={{color:'var(--text2)',margin:'14px 0 32px',fontSize:'1rem'}}>Join 50,000+ learners. Your first course is on us — no credit card required.</p>
          <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn-primary" style={{padding:'15px 36px',fontSize:'1rem'}} onClick={() => navigate('/register')}>🚀 Get Started Free</button>
            <button className="btn-outline" style={{padding:'15px 36px',fontSize:'1rem'}} onClick={() => navigate('/courses')}>Browse Courses</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="nav-logo" style={{marginBottom:'12px',cursor:'default'}}>
              <span>🎓</span>
              <span style={{fontFamily:'Syne',fontWeight:800}}>Edu<span style={{color:'var(--accent)'}}>Learn</span></span>
            </div>
            <p style={{color:'var(--text3)',fontSize:'0.85rem',maxWidth:'240px'}}>Empowering learners worldwide with quality education.</p>
          </div>
          <div className="footer-links">
            {[
              {title:'Platform',links:['Courses','About Us','Blog','Careers']},
              {title:'Support',links:['Help Center','Contact','Privacy','Terms']},
            ].map((col,i) => (
              <div key={i}>
                <h4 style={{marginBottom:'14px',fontSize:'0.9rem'}}>{col.title}</h4>
                {col.links.map((l,j) => <p key={j} style={{color:'var(--text3)',fontSize:'0.85rem',marginBottom:'8px',cursor:'pointer'}}>{l}</p>)}
              </div>
            ))}
          </div>
        </div>
        <div style={{borderTop:'1px solid var(--border)',padding:'20px 24px',textAlign:'center',color:'var(--text3)',fontSize:'0.82rem'}}>
          © 2024 EduLearn. All rights reserved. Made with ❤️
        </div>
      </footer>
    </div>
  )
}
