import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import './Blog.css'

const POSTS = [
  {id:1,title:'10 Tips to Learn Programming Faster',cat:'Development',date:'Mar 5, 2024',read:'5 min',emoji:'💻',author:'John Smith',excerpt:'Learning to code can feel overwhelming at first, but with the right strategies, you can accelerate your progress and become job-ready faster.'},
  {id:2,title:'The Future of UI/UX Design in 2024',cat:'Design',date:'Mar 2, 2024',read:'4 min',emoji:'🎨',author:'Sarah Lee',excerpt:'Design trends are evolving rapidly. From AI-assisted design to immersive experiences, here\'s what every designer needs to know this year.'},
  {id:3,title:'How Data Science is Changing Every Industry',cat:'Data Science',date:'Feb 28, 2024',read:'6 min',emoji:'🤖',author:'Dr. Raj Patel',excerpt:'Data science is no longer just for tech companies. From healthcare to agriculture, here\'s how data is transforming the world around us.'},
  {id:4,title:'Getting Your First Developer Job: A Complete Guide',cat:'Career',date:'Feb 25, 2024',read:'8 min',emoji:'🎯',author:'Anna White',excerpt:'Breaking into tech can feel impossible, but thousands of bootcamp graduates are landing jobs every month. Here\'s the roadmap that actually works.'},
  {id:5,title:'Python vs JavaScript: Which to Learn First?',cat:'Development',date:'Feb 20, 2024',read:'5 min',emoji:'🐍',author:'Chris Dev',excerpt:'Both languages are excellent choices for beginners. But depending on your goals, one might be a better fit. Let\'s break it down.'},
  {id:6,title:'The Complete Guide to Digital Marketing in 2024',cat:'Marketing',date:'Feb 15, 2024',read:'7 min',emoji:'📱',author:'Mike Johnson',excerpt:'Digital marketing is evolving faster than ever. Here\'s everything you need to know to stay ahead of the curve this year.'},
]

export default function Blog() {
  const [activeCat, setActiveCat] = useState('All')
  const [search, setSearch] = useState('')
  const filtered = POSTS.filter(p => (activeCat==='All'||p.cat===activeCat) && p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="blog-page">
      <Navbar />
      <div className="blog-hero">
        <div className="container" style={{textAlign:'center'}}>
          <div className="section-badge">EduLearn Blog</div>
          <h1>Learn, Grow & <span className="grad-text">Stay Inspired</span></h1>
          <p style={{color:'var(--text2)',marginTop:'10px'}}>Insights, tutorials, and career tips from our expert instructors</p>
          <div className="blog-search">
            <span>🔍</span>
            <input placeholder="Search articles..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="container" style={{padding:'40px 24px 60px'}}>
        <div className="blog-cats">
          {['All','Development','Design','Data Science','Career','Marketing'].map(c=>(
            <button key={c} className={activeCat===c?'active':''} onClick={()=>setActiveCat(c)}>{c}</button>
          ))}
        </div>
        <div className="blog-grid">
          {filtered.map(post=>(
            <div className="blog-card card" key={post.id}>
              <div className="blog-thumb">{post.emoji}</div>
              <div className="blog-body">
                <div style={{display:'flex',gap:'8px',marginBottom:'10px',alignItems:'center'}}>
                  <span className="tag">{post.cat}</span>
                  <span style={{fontSize:'0.75rem',color:'var(--text3)'}}>{post.read} read</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-footer">
                  <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <span style={{fontSize:'1.3rem'}}>👤</span>
                    <div>
                      <p style={{fontSize:'0.82rem',fontWeight:600}}>{post.author}</p>
                      <p style={{fontSize:'0.75rem',color:'var(--text3)'}}>{post.date}</p>
                    </div>
                  </div>
                  <button className="btn-outline" style={{padding:'7px 14px',fontSize:'0.82rem'}}>Read More →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length===0 && (
          <div style={{textAlign:'center',padding:'60px',color:'var(--text3)'}}>
            <div style={{fontSize:'3rem',marginBottom:'12px'}}>🔍</div>
            <p>No articles found for "{search}"</p>
          </div>
        )}
      </div>

      <div className="newsletter">
        <div className="container newsletter-inner">
          <div><h2>Stay Updated 📬</h2><p style={{color:'var(--text2)',marginTop:'6px'}}>Get the latest articles delivered to your inbox.</p></div>
          <div className="newsletter-form">
            <input placeholder="Enter your email address" />
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  )
}
