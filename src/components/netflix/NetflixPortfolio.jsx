import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Github, Linkedin, Send } from 'lucide-react'
import NetflixNavbar   from './NetflixNavbar'
import NetflixHero     from './NetflixHero'
import NetflixRow      from './NetflixRow'
import ProjectModal    from './ProjectModal'
import Aurora          from '../Aurora'
import Particles       from '../Particles'
import { useTheme }    from '../../context/ThemeContext'
import { PROJECTS, CARD_TO_PROJECT } from '../../data/projects'

/* ── DATA ──────────────────────────────────────────────── */
const EXPERIENCE_CARDS = [
  {
    title: 'Texas Parks & Wildlife', subtitle: 'Tech Lead · Full Stack', emoji: '🏛️',
    bg: 'linear-gradient(135deg,#0a1628,#0d2340)',
    match: '99% Match', year: '2023', duration: '2+ yrs',
    desc: 'Led team modernization of 23-yr legacy system → React 19 + Java 21 microservices. Mentored 3 devs. 60% faster builds.',
    tags: ['Tech Lead', 'React 19', 'Java 21'],
  },
  {
    title: 'Amazon Web Services', subtitle: 'SDE-I · Brand Analytics', emoji: '📦',
    bg: 'linear-gradient(135deg,#1a0d00,#2a1800)',
    match: '97% Match', year: '2022', duration: '1 yr',
    desc: 'Delivered seller analytics dashboards to 1M+ Amazon sellers. Drove sprint ceremonies, owned end-to-end feature delivery.',
    tags: ['AWS', 'Kafka', 'MUI Charts'],
  },
  {
    title: 'Mercy Hospital', subtitle: 'Full Stack Lead', emoji: '🏥',
    bg: 'linear-gradient(135deg,#0a1a10,#0d2a18)',
    match: '95% Match', year: '2021', duration: '1.5 yrs',
    desc: 'Led HIPAA-compliant healthcare platform build. Guided junior devs on Cassandra migration and AWS S3 secure storage design.',
    tags: ['Spring MVC', 'Cassandra', 'AWS S3'],
  },
  {
    title: 'Cookiegen Info Tech', subtitle: 'Lead Developer', emoji: '🚀',
    bg: 'linear-gradient(135deg,#1a0020,#2a0030)',
    match: '94% Match', year: '2018', duration: '3 yrs',
    desc: 'Full SDLC ownership from day one. Grew from individual contributor to leading 4-person team. Built Kubernetes + Kafka from scratch.',
    tags: ['Team Lead', 'Spring Boot', 'Kubernetes'],
  },
]

const SKILL_CARDS = [
  { title: 'Java & Spring Boot', emoji: '☕', bg: 'linear-gradient(135deg,#1a0a00,#2a1200)',
    match: '★ Expert', year: '6 yrs', desc: 'Java 8/21, Spring Boot 3.4, Spring Security, Hibernate, JPA, REST APIs, Microservices.', tags: ['Java 21','Spring Boot','Hibernate'] },
  { title: 'React & Frontend', emoji: '⚛️', bg: 'linear-gradient(135deg,#001a2a,#00122a)',
    match: '★ Expert', year: '5 yrs', desc: 'React 19, Angular 8/11, TypeScript, Vite, Tailwind CSS, Framer Motion, SCSS.', tags: ['React 19','Angular','TypeScript'] },
  { title: 'AWS & Cloud', emoji: '☁️', bg: 'linear-gradient(135deg,#1a0800,#2a1200)',
    match: '★ Advanced', year: '4 yrs', desc: 'EC2, S3, ECS, CodePipeline, Docker, Kubernetes, Helm, Jenkins CI/CD.', tags: ['AWS','Docker','Kubernetes'] },
  { title: 'Databases', emoji: '🗄️', bg: 'linear-gradient(135deg,#0a001a,#14002a)',
    match: '★ Expert', year: '6 yrs', desc: 'Oracle, MySQL, MongoDB, Cassandra, SQL Server, complex stored procedures.', tags: ['Oracle','MongoDB','Cassandra'] },
  { title: 'Kafka & Messaging', emoji: '📡', bg: 'linear-gradient(135deg,#001a10,#002a18)',
    match: '★ Advanced', year: '4 yrs', desc: 'Apache Kafka, RabbitMQ, ActiveMQ, JMS, event-driven architecture, Zookeeper.', tags: ['Kafka','RabbitMQ','JMS'] },
  { title: 'Microservices', emoji: '🔬', bg: 'linear-gradient(135deg,#1a1000,#2a1800)',
    match: '★ Expert', year: '5 yrs', desc: 'Spring Cloud, Netflix Eureka, Hystrix, DDD, SOA, SOAP & REST, API design.', tags: ['Spring Cloud','Eureka','DDD'] },
]

const EDUCATION_CARDS = [
  { title: 'M.S. Computer Science', subtitle: 'Texas A&M – Kingsville', emoji: '🎓',
    bg: 'linear-gradient(135deg,#0a001a,#140028)',
    match: 'GPA 3.6/4.0', year: '2022', duration: '1.5 yrs',
    desc: 'Cloud Computing, Analysis of Algorithms, Database Systems, Software Engineering, Networks.',
    tags: ['Cloud Computing','Algorithms','DBMS'] },
  { title: 'B.Tech Electronics', subtitle: 'CVR College of Engineering', emoji: '⚡',
    bg: 'linear-gradient(135deg,#1a1000,#2a1800)',
    match: "Bachelor's", year: '2020', duration: '4 yrs',
    desc: 'Digital Logic Design, Microprocessors, Programming, Database Systems, Cloud Computing.',
    tags: ['Digital Logic','Programming','DBs'] },
]

const ABOUT_CARDS = [
  { title: 'Team Builder & Mentor', subtitle: 'Led 4-person teams', emoji: '👥',
    bg: 'linear-gradient(135deg,#1a1000,#2a1800)',
    match: 'Leadership Track', duration: '4 companies',
    desc: 'Mentored junior devs, ran sprint ceremonies, conducted code reviews, and grew teams from 1 IC to 4-person squads.' },
  { title: 'Delivery-Focused', subtitle: 'Ships on time, every time', emoji: '🚀',
    bg: 'linear-gradient(135deg,#0a001a,#140028)',
    match: 'Track Record', duration: '6+ yrs',
    desc: 'Led end-to-end deliveries across govt, FAANG, and healthcare — from requirements to production with zero missed deadlines.' },
  { title: 'Amazon Alum', subtitle: 'SDE-I at AWS · FAANG', emoji: '📦',
    bg: 'linear-gradient(135deg,#1a0d00,#2a1800)',
    match: 'FAANG Pedigree', duration: 'Sep 22–Dec 23',
    desc: "Built seller analytics at Amazon serving 1M+ sellers — driven by FAANG engineering culture, code review rigor, and bar-raiser standards." },
  { title: 'Targeting Leadership', subtitle: 'Eng Manager / Tech Lead', emoji: '🎯',
    bg: 'linear-gradient(135deg,#001a0a,#002a12)',
    match: '● Available Now', duration: 'Remote OK',
    desc: 'Ready to step into Engineering Manager, Tech Lead, or Staff Engineer roles. I build teams, drive architecture, and deliver outcomes.' },
]
/* ─────────────────────────────────────────────────────── */

/* Glowing section separator */
function SectionGlow({ color = '#E50914' }) {
  return (
    <div style={{ position: 'relative', height: '1px', margin: '4px 0', overflow: 'visible' }}>
      <div style={{
        position: 'absolute', left: '56px', right: '56px', top: 0,
        height: '1px', background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
      }} />
      <div style={{
        position: 'absolute', left: '50%', top: '-6px', transform: 'translateX(-50%)',
        width: '80px', height: '12px',
        background: `radial-gradient(ellipse, ${color}30 0%, transparent 70%)`,
      }} />
    </div>
  )
}

export default function NetflixPortfolio() {
  const [activeProject, setActiveProject] = useState(null)

  const handlePlay = (cardTitle) => {
    const projectId = CARD_TO_PROJECT[cardTitle]
    if (projectId && PROJECTS[projectId]) setActiveProject(projectId)
  }

  return (
    <div style={{ background: '#141414', minHeight: '100vh', color: '#e5e5e5', position: 'relative' }}>
      <NetflixNavbar />
      <NetflixHero />

      {/* ── ROWS SECTION ── */}
      <div style={{ position: 'relative', paddingTop: '32px', paddingBottom: '16px' }} id="experience">

        {/* Subtle ambient glow behind rows */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <div style={{
            position: 'absolute', top: '10%', left: '-10%',
            width: '40vw', height: '40vw', borderRadius: '50%',
            background: 'radial-gradient(circle, #E5091408 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'blob1 20s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', top: '40%', right: '-5%',
            width: '35vw', height: '35vw', borderRadius: '50%',
            background: 'radial-gradient(circle, #FF990408 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'blob3 24s ease-in-out infinite',
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <NetflixRow title="Top Match For Your Team 🏆" items={EXPERIENCE_CARDS} accent="#E50914" onPlay={handlePlay} />
          <SectionGlow color="#E50914" />
          <NetflixRow title="Because You're Hiring 💼"   items={SKILL_CARDS}       accent="#E50914" onPlay={handlePlay} />
          <SectionGlow color="#FF9900" />
          <NetflixRow title="New Releases: Education 🎓" items={EDUCATION_CARDS}   accent="#E50914" onPlay={handlePlay} />
          <SectionGlow color="#a855f7" />
          <NetflixRow title="About The Developer 👨‍💻"   items={ABOUT_CARDS}       accent="#E50914" onPlay={handlePlay} />
        </div>
      </div>

      <ContactSection />

      {/* ── PROJECT MODAL ── */}
      <AnimatePresence>
        {activeProject && PROJECTS[activeProject] && (
          <ProjectModal
            project={PROJECTS[activeProject]}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Phone Gate: funny gated form — no number exposed ─── */
function PhoneGate() {
  const [stage, setStage] = useState('teaser') // 'teaser' | 'form' | 'sending' | 'sent' | 'error'
  const [name,  setName]  = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!phone.trim()) return
    setStage('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'f8c4418c-2274-4b23-bd28-928570246aba',
          subject:    `📱 Portfolio Lead — ${name || 'Recruiter'} left their number`,
          from_name:  name || 'Portfolio Visitor',
          message:    `Someone is interested in hiring you!\n\nName: ${name || 'Not provided'}\nPhone: ${phone}\n\nReach out while they're hot! 🔥`,
        }),
      })
      const data = await res.json()
      setStage(data.success ? 'sent' : 'error')
    } catch {
      setStage('error')
    }
  }

  if (stage === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          padding: '14px 16px', borderRadius: '10px',
          background: '#0d1f0d', border: '1px solid #4ade8040',
        }}
      >
        <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '0.84rem' }}>
          ✅ Sent! Yashwanth just got your number. Expect a call from a very motivated Engineering Leader. 📞
        </p>
      </motion.div>
    )
  }

  if (stage === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          padding: '14px 16px', borderRadius: '10px',
          background: '#1f0a0a', border: '1px solid #ef444440',
        }}
      >
        <p style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.82rem', marginBottom: '6px' }}>
          😬 Oops — something went wrong. Try emailing directly instead.
        </p>
        <a href="mailto:yeshwanthkata@gmail.com" style={{ color: '#ddd', fontSize: '0.78rem' }}>
          yeshwanthkata@gmail.com
        </a>
      </motion.div>
    )
  }

  if (stage === 'form') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '16px', borderRadius: '10px',
          background: '#1f1f1f', border: '1px solid #E5091430',
        }}
      >
        <p style={{ color: '#E50914', fontWeight: 800, fontSize: '0.82rem', marginBottom: '4px' }}>
          🕵️ Oh, so you ARE serious. Respect.
        </p>
        <p style={{ color: '#777', fontSize: '0.74rem', marginBottom: '12px', lineHeight: 1.6 }}>
          I don't broadcast my digits to just <em>anyone</em>... but recruiters who leave theirs get a callback
          from an Engineering Leader who actually reads job descriptions. Drop yours below. 👇
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input
            placeholder="Your name (optional, but I'll know what to call you)"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              background: '#2a2a2a', border: '1px solid #333', borderRadius: '6px',
              padding: '8px 12px', color: '#fff', fontSize: '0.78rem', outline: 'none',
              width: '100%', boxSizing: 'border-box',
            }}
          />
          <input
            placeholder="Your phone number *"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            type="tel"
            style={{
              background: '#2a2a2a', border: '1px solid #333', borderRadius: '6px',
              padding: '8px 12px', color: '#fff', fontSize: '0.78rem', outline: 'none',
              width: '100%', boxSizing: 'border-box',
            }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" disabled={stage === 'sending'} style={{
              background: stage === 'sending' ? '#7a0000' : '#E50914', color: '#fff', border: 'none',
              borderRadius: '6px', padding: '8px 20px',
              fontWeight: 700, fontSize: '0.78rem', cursor: stage === 'sending' ? 'not-allowed' : 'pointer',
              opacity: stage === 'sending' ? 0.7 : 1,
            }}>
              {stage === 'sending' ? 'Sending... ⏳' : 'Send My Number 📱'}
            </button>
            <button type="button" onClick={() => setStage('teaser')} style={{
              background: 'transparent', color: '#555', border: '1px solid #333',
              borderRadius: '6px', padding: '8px 12px',
              fontSize: '0.78rem', cursor: 'pointer',
            }}>
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    )
  }

  // teaser state
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3, borderColor: '#E50914' }}
      onClick={() => setStage('form')}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '14px 16px', borderRadius: '10px',
        background: '#1f1f1f', border: '1px solid #2a2a2a',
        cursor: 'pointer', transition: 'border-color 0.2s',
      }}
    >
      <div style={{ color: '#E50914', flexShrink: 0 }}><Phone size={16} /></div>
      <div>
        <p style={{ color: '#555', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone</p>
        <p style={{ color: '#ddd', fontSize: '0.78rem', fontWeight: 600 }}>🔒 Serious about hiring? Click here.</p>
      </div>
    </motion.div>
  )
}

function ContactSection() {
  return (
    <section
      id="contact"
      style={{ position: 'relative', padding: '72px 56px 48px', borderTop: '1px solid #222', overflow: 'hidden' }}
    >
      <Aurora colors={['#E50914', '#FF9900', '#a855f7']} opacity={0.07} />
      <Particles count={18} color="#E50914" maxSize={2} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        style={{ position: 'relative', zIndex: 10, maxWidth: '680px' }}
      >
        {/* Badge */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ background: '#E50914', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '2px 10px', borderRadius: '4px' }}>HIRING</span>
          <p style={{ color: '#666', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px' }}>Let's Connect</p>
        </div>

        <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '10px', letterSpacing: '-0.5px' }}>
          Ready to Lead Your Next Team
        </h2>
        <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '520px', marginBottom: '36px' }}>
          Looking for an Engineering Manager, Tech Lead, or Staff Engineer who ships, mentors teams, drives architecture decisions,
          and doesn't just write code — but multiplies the team around them? Let's talk.
        </p>

        {/* Leadership highlights */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
          {['Mentored Junior Devs', 'Led Sprint Ceremonies', 'Architecture Design', 'End-to-End Delivery', 'FAANG Standards', 'Cross-team Collaboration'].map((tag, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{
                fontSize: '0.72rem', fontWeight: 600,
                padding: '4px 12px', borderRadius: '999px',
                background: '#E5091412', color: '#E50914',
                border: '1px solid #E5091428',
              }}
            >
              ✓ {tag}
            </motion.span>
          ))}
        </div>

        {/* Contact cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginBottom: '32px' }}>
          {/* Email */}
          <motion.a
            href="mailto:yeshwanthkata@gmail.com"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -3, borderColor: '#E50914' }}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 16px', borderRadius: '10px',
              background: '#1f1f1f', border: '1px solid #2a2a2a',
              textDecoration: 'none', color: 'inherit',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ color: '#E50914', flexShrink: 0 }}><Mail size={16} /></div>
            <div style={{ minWidth: 0 }}>
              <p style={{ color: '#555', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</p>
              <p style={{ color: '#ddd', fontSize: '0.78rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>yeshwanthkata@gmail.com</p>
            </div>
          </motion.a>

          {/* Phone gate */}
          <PhoneGate />

          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/yashwanthrkatta/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            whileHover={{ y: -3, borderColor: '#E50914' }}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 16px', borderRadius: '10px',
              background: '#1f1f1f', border: '1px solid #2a2a2a',
              textDecoration: 'none', color: 'inherit',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ color: '#E50914', flexShrink: 0 }}><Linkedin size={16} /></div>
            <div style={{ minWidth: 0 }}>
              <p style={{ color: '#555', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>LinkedIn</p>
              <p style={{ color: '#ddd', fontSize: '0.78rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>linkedin.com/in/yashwanthrkatta</p>
            </div>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/yashwanthkatta"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            whileHover={{ y: -3, borderColor: '#E50914' }}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 16px', borderRadius: '10px',
              background: '#1f1f1f', border: '1px solid #2a2a2a',
              textDecoration: 'none', color: 'inherit',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ color: '#E50914', flexShrink: 0 }}><Github size={16} /></div>
            <div style={{ minWidth: 0 }}>
              <p style={{ color: '#555', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>GitHub</p>
              <p style={{ color: '#ddd', fontSize: '0.78rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>github.com/yashwanthkatta</p>
            </div>
          </motion.a>
        </div>

        <motion.a
          href="mailto:yeshwanthkata@gmail.com"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '13px 30px', borderRadius: '8px',
            background: '#E50914', color: '#fff',
            fontWeight: 800, fontSize: '0.92rem', textDecoration: 'none',
            boxShadow: '0 8px 28px rgba(229,9,20,0.35)',
          }}
        >
          <Send size={15} />
          Let's Talk Leadership
        </motion.a>
      </motion.div>

      <p style={{ color: '#2a2a2a', fontSize: '0.75rem', marginTop: '56px', position: 'relative', zIndex: 10 }}>
        © {new Date().getFullYear()} Yashwanth Katta · Built with React 19 + Vite + Tailwind + Framer Motion
      </p>
    </section>
  )
}
