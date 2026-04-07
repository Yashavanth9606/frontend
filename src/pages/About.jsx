import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './About.css'

const TEAM = [
  {name:'Arjun Sharma',role:'CEO & Founder',emoji:'👨‍💼',bio:'Former Google engineer with 15+ years in EdTech'},
  {name:'Priya Nair',role:'Head of Curriculum',emoji:'👩‍🏫',bio:'Ex-professor with passion for accessible education'},
  {name:'Rahul Mehta',role:'CTO',emoji:'👨‍💻',bio:'Full-stack architect who built EduLearn from scratch'},
  {name:'Ananya Patel',role:'Head of Design',emoji:'👩‍🎨',bio:'Award-winning designer focused on user experience'},
]

export default function About() {
  const navigate = useNavigate()
  return (
    <div className="about-page">
      <Navbar />

      {/* Hero */}
      <div className="about-hero">
        <div className="container" style={{textAlign:'center'}}>
          <div className="section-badge">About EduLearn</div>
          <h1>We're on a Mission to Make <span className="grad-text">Education Accessible</span></h1>
          <p>Founded in 2020, EduLearn has helped over 50,000 students worldwide gain new skills and advance their careers.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="about-stats">
        <div className="container">
          <div className="astats-grid">
            {[
              {val:'50K+',lbl:'Students Worldwide'},{val:'1,200+',lbl:'Expert Instructors'},
              {val:'8,000+',lbl:'Courses Available'},{val:'120+',lbl:'Countries Reached'},
            ].map((s,i)=>(
              <div key={i} style={{textAlign:'center'}}>
                <div style={{fontFamily:'Syne',fontSize:'2.2rem',fontWeight:800,background:'linear-gradient(135deg,var(--accent),var(--purple-light))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{s.val}</div>
                <div style={{color:'var(--text2)',fontSize:'0.9rem',marginTop:'4px'}}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="section">
        <div className="container mission-inner">
          <div>
            <div className="section-badge" style={{textAlign:'left'}}>Our Mission</div>
            <h2 style={{textAlign:'left',marginBottom:'16px'}}>Learning Should Have <span className="grad-text">No Limits</span></h2>
            <p style={{color:'var(--text2)',lineHeight:1.8,marginBottom:'16px'}}>We believe that quality education should be accessible to everyone, regardless of location, background, or financial situation. EduLearn was built to break down barriers and empower people to unlock their full potential.</p>
            <p style={{color:'var(--text2)',lineHeight:1.8,marginBottom:'24px'}}>From a small startup with 10 courses to a global platform with 8,000+ courses, we've grown because our students grow with us.</p>
            <button className="btn-primary" onClick={() => navigate('/courses')}>🎓 Start Learning Today</button>
          </div>
          <div className="mission-cards">
            {[
              {icon:'🎯',title:'Quality First',desc:'Every course is reviewed and approved by our expert panel before publishing'},
              {icon:'💡',title:'Practical Learning',desc:'Real projects, real skills — not just theory but hands-on experience'},
              {icon:'🤝',title:'Community',desc:'Join 50,000+ learners supporting each other in their journey'},
              {icon:'🏆',title:'Recognized Certs',desc:'Our certificates are recognized by 500+ companies worldwide'},
            ].map((c,i)=>(
              <div key={i} className="mission-card card">
                <div style={{fontSize:'1.8rem',marginBottom:'10px'}}>{c.icon}</div>
                <h4 style={{marginBottom:'6px'}}>{c.title}</h4>
                <p style={{fontSize:'0.85rem',color:'var(--text3)'}}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{background:'var(--bg2)'}}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Our Team</div>
            <h2>Meet the <span>People</span> Behind EduLearn</h2>
          </div>
          <div className="team-grid">
            {TEAM.map((t,i)=>(
              <div key={i} className="team-card card">
                <div className="team-avatar">{t.emoji}</div>
                <h3>{t.name}</h3>
                <p className="team-role">{t.role}</p>
                <p style={{fontSize:'0.84rem',color:'var(--text3)',textAlign:'center'}}>{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container" style={{textAlign:'center'}}>
          <h2>Ready to Join 50,000+ Learners?</h2>
          <p style={{color:'var(--text2)',margin:'12px 0 28px'}}>Start your learning journey today — your first course is free!</p>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn-primary" onClick={() => navigate('/register')}>🚀 Get Started Free</button>
            <button className="btn-outline" onClick={() => navigate('/courses')}>Browse Courses</button>
          </div>
        </div>
      </section>
    </div>
  )
}
