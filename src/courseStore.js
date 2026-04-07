export const DEFAULT_COURSES = [
  { id:1, title:'Complete Web Development Bootcamp', cat:'Development', rating:4.9, students:124, studentsDisplay:'12.4k', duration:'42h', price:89, badge:'Bestseller', emoji:'💻', instructor:'John Smith', status:'Published', totalLessons:17, desc:'Master HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and become a full-stack developer.' },
  { id:2, title:'UI/UX Design Masterclass 2024', cat:'Design', rating:4.8, students:87, studentsDisplay:'8.2k', duration:'28h', price:79, badge:'New', emoji:'🎨', instructor:'Sarah Lee', status:'Published', totalLessons:6, desc:'Learn UX research, wireframing, prototyping and visual design. Master Figma and build a professional portfolio.' },
  { id:3, title:'Data Science & Machine Learning', cat:'Data Science', rating:4.9, students:156, studentsDisplay:'15.1k', duration:'55h', price:99, badge:'Bestseller', emoji:'🤖', instructor:'Dr. Raj Patel', status:'Published', totalLessons:5, desc:'Deep dive into Python, Pandas, NumPy and TensorFlow. Build real ML models from scratch.' },
  { id:4, title:'Digital Marketing Complete Guide', cat:'Marketing', rating:4.7, students:43, studentsDisplay:'6.8k', duration:'24h', price:69, badge:'Popular', emoji:'📱', instructor:'Mike Johnson', status:'Draft', totalLessons:8, desc:'Master SEO, social media marketing, email campaigns and paid advertising.' },
  { id:5, title:'Python for Beginners to Advanced', cat:'Development', rating:4.8, students:203, studentsDisplay:'20.3k', duration:'38h', price:84, badge:'Trending', emoji:'🐍', instructor:'Anna White', status:'Published', totalLessons:10, desc:'Complete Python course from scratch to advanced concepts including OOP, file handling, and web scraping.' },
  { id:6, title:'Business Strategy & Management', cat:'Business', rating:4.6, students:54, studentsDisplay:'5.4k', duration:'20h', price:74, badge:'New', emoji:'📊', instructor:'Tom Brown', status:'Published', totalLessons:7, desc:'Learn proven business strategy frameworks, management tools, and leadership skills.' },
  { id:7, title:'React & Node.js Full Stack', cat:'Development', rating:4.8, students:97, studentsDisplay:'9.7k', duration:'48h', price:94, badge:'Hot', emoji:'⚛️', instructor:'Chris Dev', status:'Published', totalLessons:14, desc:'Build full-stack web apps with React on the frontend and Node.js + Express on the backend.' },
  { id:8, title:'Graphic Design for Beginners', cat:'Design', rating:4.7, students:71, studentsDisplay:'7.1k', duration:'22h', price:64, badge:'', emoji:'✏️', instructor:'Lisa Art', status:'Published', totalLessons:9, desc:'Learn the fundamentals of graphic design using Adobe tools. Create logos, posters and social media assets.' },
  { id:9, title:'Excel & Data Analysis Mastery', cat:'Data Science', rating:4.6, students:112, studentsDisplay:'11.2k', duration:'30h', price:59, badge:'Popular', emoji:'📈', instructor:'David Clark', status:'Published', totalLessons:11, desc:'Master Excel for data analysis, pivot tables, VLOOKUP, and dashboard creation.' },
]

const KEY = 'edulearn_courses'

export function getCourses() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  localStorage.setItem(KEY, JSON.stringify(DEFAULT_COURSES))
  return DEFAULT_COURSES
}

export function saveCourses(courses) {
  localStorage.setItem(KEY, JSON.stringify(courses))
}

export function addCourse(course) {
  const courses = getCourses()
  const next = [...courses, course]
  saveCourses(next)
  return next
}

export function deleteCourse(id) {
  const next = getCourses().filter(c => c.id !== id)
  saveCourses(next)
  return next
}

export function toggleCourseStatus(id) {
  const next = getCourses().map(c =>
    c.id === id ? { ...c, status: c.status === 'Published' ? 'Draft' : 'Published' } : c
  )
  saveCourses(next)
  return next
}