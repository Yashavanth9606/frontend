import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Courses.css'

const ALL = [
  {id:1,title:'Complete Web Development Bootcamp',cat:'Development',rating:4.9,students:'12.4k',duration:'42h',price:89,badge:'Bestseller',emoji:'💻',instructor:'John Smith'},
  {id:2,title:'UI/UX Design Masterclass 2024',cat:'Design',rating:4.8,students:'8.2k',duration:'28h',price:79,badge:'New',emoji:'🎨',instructor:'Sarah Lee'},
  {id:3,title:'Data Science & Machine Learning',cat:'Data Science',rating:4.9,students:'15.1k',duration:'55h',price:99,badge:'Bestseller',emoji:'🤖',instructor:'Dr. Raj Patel'},
  {id:4,title:'Digital Marketing Complete Guide',cat:'Marketing',rating:4.7,students:'6.8k',duration:'24h',price:69,badge:'Popular',emoji:'📱',instructor:'Mike Johnson'},
  {id:5,title:'Python for Beginners to Advanced',cat:'Development',rating:4.8,students:'20.3k',duration:'38h',price:84,badge:'Trending',emoji:'🐍',instructor:'Anna White'},
  {id:6,title:'Business Strategy & Management',cat:'Business',rating:4.6,students:'5.4k',duration:'20h',price:74,badge:'New',emoji:'📊',instructor:'Tom Brown'},
  {id:7,title:'React & Node.js Full Stack',cat:'Development',rating:4.8,students:'9.7k',duration:'48h',price:94,badge:'Hot',emoji:'⚛️',instructor:'Chris Dev'},
  {id:8,title:'Graphic Design for Beginners',cat:'Design',rating:4.7,students:'7.1k',duration:'22h',price:64,badge:'',emoji:'✏️',instructor:'Lisa Art'},
  {id:9,title:'Excel & Data Analysis Mastery',cat:'Data Science',rating:4.6,students:'11.2k',duration:'30h',price:59,badge:'Popular',emoji:'📈',instructor:'David Clark'},
]

export default function Courses() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const filtered = ALL.filter(c=>(cat==='All'||c.cat===cat)&&c.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="crs-page">
      <Navbar />
      <div className="crs-hero">
        <div className="container" style={{textAlign:'center'}}>
          <h1>Explore All Courses</h1>
          <p>Discover {ALL.length}+ courses taught by expert instructors</p>
        </div>
      </div>
      <div className="container crs-layout">
        <aside className="sidebar card">
          <div className="sb-sec">
            <h4>Search</h4>
            <input className="sb-input" placeholder="Search courses..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <div className="sb-sec">
            <h4>Category</h4>
            {['All','Development','Design','Data Science','Marketing','Business'].map(c=>(
              <label key={c} className="sb-radio">
                <input type="radio" name="cat" checked={cat===c} onChange={()=>setCat(c)} />
                {c}
              </label>
            ))}
          </div>
          <div className="sb-sec">
            <h4>Price</h4>
            {['All','Free','Paid'].map(p=>(
              <label key={p} className="sb-radio">
                <input type="radio" name="price" defaultChecked={p==='All'} />
                {p}
              </label>
            ))}
          </div>
        </aside>
        <main>
          <div className="crs-toolbar">
            <span style={{color:'var(--text2)',fontSize:'0.9rem'}}>{filtered.length} courses found</span>
          </div>
          <div className="crs-grid2">
            {filtered.map(c=>(
              <div className="crs-card2 card" key={c.id} onClick={()=>navigate(`/courses/${c.id}`)}>
                <div className="crs-thumb2"><span>{c.emoji}</span>{c.badge&&<div className="badge badge-red" style={{position:'absolute',top:10,left:10}}>{c.badge}</div>}</div>
                <div className="crs-body2">
                  <div className="tag" style={{marginBottom:'8px'}}>{c.cat}</div>
                  <h3>{c.title}</h3>
                  <p style={{fontSize:'0.8rem',color:'var(--text3)',margin:'4px 0 10px'}}>by {c.instructor}</p>
                  <div className="crs-meta2"><span>⭐ {c.rating}</span><span>👥 {c.students}</span><span>⏱ {c.duration}</span></div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{fontFamily:'Syne',fontSize:'1.2rem',fontWeight:800}}>${c.price}</span>
                    <button className="btn-primary" style={{padding:'7px 14px',fontSize:'0.82rem'}} onClick={e=>{e.stopPropagation();navigate(`/courses/${c.id}`)}}>Enroll</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
