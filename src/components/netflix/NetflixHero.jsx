import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Info, ChevronRight } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import Aurora      from '../Aurora'
import Particles   from '../Particles'
import Meteors     from '../Meteors'
import MatrixRain  from '../MatrixRain'

const SLIDES = [
  {
    id:       0,
    title:    'Texas Parks & Wildlife',
    subtitle: 'Current Role · Jan 2023 – Present',
    role:     'Full Stack Java Developer',
    desc:     'Led the end-to-end modernization of the Boat Titling & Registration system — React 19 + Vite frontend, Java 21 + Spring Boot 3.4 backend. Slashed build times by 60%+ and delivered WCAG 2.1-compliant enterprise UIs.',
    tags:     ['React 19', 'Java 21', 'Spring Boot 3.4', 'TypeScript', 'AWS'],
    match:    '99% Match',
    badge:    '🏆 Current',
    accent:   '#4f8ef7',
    aColors:  ['#1a3a8f', '#0d2a5e', '#1e3a6e', '#2d4a9e'],
  },
  {
    id:       1,
    title:    'Amazon Web Services',
    subtitle: 'SDE-I · Sep 2022 – Dec 2023',
    role:     'Software Developer',
    desc:     'Built cloud-native microservices and automated deployment pipelines at AWS Tempe. Deployed Docker containers to ECS via CodePipeline, drove Kafka messaging systems and Angular 2 UIs in Agile sprints.',
    tags:     ['AWS ECS', 'Docker', 'Kafka', 'Spring Boot', 'Angular 2'],
    match:    '97% Match',
    badge:    '⭐ FAANG',
    accent:   '#FF9900',
    aColors:  ['#7a4800', '#5a3400', '#9a5c00', '#3a2200'],
  },
  {
    id:       2,
    title:    'Mercy Hospital',
    subtitle: 'Healthcare · Feb 2021 – Aug 2022',
    role:     'Full Stack Java Developer',
    desc:     'Developed critical healthcare enterprise systems with Spring MVC, Hibernate, and AWS S3 secure file storage. Designed Cassandra data migration strategies and built Kafka producer/consumer pipelines.',
    tags:     ['Spring MVC', 'Hibernate', 'AWS S3', 'Cassandra', 'Kafka'],
    match:    '95% Match',
    badge:    '🏥 Healthcare',
    accent:   '#4ade80',
    aColors:  ['#0d3a1a', '#0a2810', '#143e20', '#0a3018'],
  },
  {
    id:       3,
    title:    'Cookiegen Info Tech',
    subtitle: 'Startup · Jan 2018 – Nov 2020',
    role:     'Full Stack Java Developer',
    desc:     'Full SDLC ownership at an Hyderabad IT startup — Spring Boot microservices, Kubernetes deployments via Helm, Kafka event-driven systems, and responsive UIs with Spring MVC and jQuery.',
    tags:     ['Spring Boot', 'Kubernetes', 'MongoDB', 'Jenkins', 'Docker'],
    match:    '94% Match',
    badge:    '🚀 Startup',
    accent:   '#c084fc',
    aColors:  ['#3b1f6e', '#28154e', '#4a2880', '#1e1040'],
  },
]

/* Beams — thin light rays from top */
function Beams({ accent }) {
  const beams = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      left:  `${8 + i * 15}%`,
      dur:   `${3 + i * 0.8}s`,
      delay: `${i * 0.6}s`,
      w:     `${1 + (i % 3) * 0.5}px`,
      h:     `${30 + (i % 4) * 15}%`,
      op:    0.06 + (i % 3) * 0.03,
    })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {beams.map((b, i) => (
        <div
          key={i}
          style={{
            position:   'absolute',
            top:        0,
            left:       b.left,
            width:      b.w,
            height:     b.h,
            background: `linear-gradient(180deg, ${accent}90 0%, transparent 100%)`,
            opacity:    b.op,
            animation:  `beam ${b.dur} ease-in-out ${b.delay} infinite`,
            borderRadius: '0 0 9999px 9999px',
          }}
        />
      ))}
    </div>
  )
}

/* Progress bar for slide duration */
function SlideProgress({ duration, key: k }) {
  return (
    <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
      <motion.div
        key={k}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration, ease: 'linear' }}
        style={{ height: '100%', background: '#fff', borderRadius: '2px' }}
      />
    </div>
  )
}

export default function NetflixHero() {
  const { profile }                   = useTheme()
  const [current,  setCurrent]        = useState(0)
  const [paused,   setPaused]         = useState(false)
  const [showInfo, setShowInfo]       = useState(false)
  const SLIDE_DUR                     = 8

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => {
      setCurrent(c => (c + 1) % SLIDES.length)
      setShowInfo(false)
    }, SLIDE_DUR * 1000)
    return () => clearTimeout(t)
  }, [current, paused])

  const slide = SLIDES[current]

  const greet = {
    recruiter: 'Perfect match for your next hire 💼',
    developer: 'Let\'s talk code & architecture 👨‍💻',
    stalker:   'Welcome… I see you 👀',
  }

  return (
    <section
      id="home"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '620px', overflow: 'hidden' }}
    >
      {/* ── MATRIX CODE RAIN + ROCKET — always behind everything ── */}
      <MatrixRain opacity={0.22} color={slide.accent || '#E50914'} />

      {/* ── BACKGROUND per slide ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${slide.id}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1,  scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Base dark gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 65% 40%, ${slide.accent}22 0%, transparent 55%),
                         linear-gradient(160deg, ${slide.aColors[0]}60 0%, #0a0a0a 50%, ${slide.aColors[1]}30 100%)`,
          }} />

          {/* Aurora blobs */}
          <Aurora
            colors={slide.aColors}
            opacity={0.16}
          />

          {/* Floating particles */}
          <Particles count={22} color={slide.accent} maxSize={3} />

          {/* Meteors */}
          <Meteors count={10} color={slide.accent} />

          {/* Light beams */}
          <Beams accent={slide.accent} />

          {/* Noise grain */}
          <div className="noise" />

          {/* Cinematic vignette */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.65) 100%)',
          }} />

          {/* Bottom gradient for text */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '72%',
            background: 'linear-gradient(0deg, rgba(20,20,20,1) 0%, rgba(20,20,20,0.65) 45%, transparent 100%)',
          }} />

          {/* Left gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(20,20,20,0.88) 0%, rgba(20,20,20,0.3) 45%, transparent 100%)',
          }} />
        </motion.div>
      </AnimatePresence>

      {/* ── CONTENT ── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '0 56px 80px', zIndex: 10,
      }}>

        {/* Profile greeting */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: `${slide.accent}20`, border: `1px solid ${slide.accent}40`,
              color: slide.accent, fontSize: '0.75rem', fontWeight: 700,
              padding: '5px 14px', borderRadius: '999px',
            }}>
              {greet[profile] || 'Welcome back'}
            </span>
          </motion.div>
        )}

        {/* Main content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${slide.id}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            style={{ maxWidth: '640px' }}
          >
            {/* Badges */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '4px',
                background: slide.accent, color: '#000',
              }}>
                {slide.badge}
              </span>
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: '4px',
                background: 'rgba(70,211,105,0.18)', color: '#46d369',
                border: '1px solid rgba(70,211,105,0.3)',
              }}>
                {slide.match}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#888' }}>{slide.subtitle.split('·')[1]?.trim()}</span>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize:   'clamp(2.2rem, 5.5vw, 4.2rem)',
              fontWeight: 900, color: '#fff', lineHeight: 1.05,
              letterSpacing: '-1px', marginBottom: '6px',
              textShadow: `0 2px 30px rgba(0,0,0,0.6), 0 0 80px ${slide.accent}20`,
            }}>
              {slide.title}
            </h1>
            <p style={{ color: slide.accent, fontWeight: 700, fontSize: '1rem', marginBottom: '12px' }}>
              {slide.role}
            </p>

            {/* Description */}
            <p style={{
              color: 'rgba(229,229,229,0.82)', fontSize: '0.92rem',
              lineHeight: 1.75, maxWidth: '540px', marginBottom: '18px',
            }}>
              {slide.desc}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '24px' }}>
              {slide.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '0.75rem', fontWeight: 600, padding: '4px 12px', borderRadius: '999px',
                  background: `${slide.accent}14`, color: slide.accent,
                  border: `1px solid ${slide.accent}28`,
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <motion.a
                href="#experience"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '11px 28px', borderRadius: '6px',
                  background: '#fff', color: '#000',
                  fontWeight: 800, fontSize: '0.92rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(255,255,255,0.2)',
                }}
              >
                <Play size={16} fill="#000" />
                View All Experience
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowInfo(s => !s)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '11px 24px', borderRadius: '6px',
                  background: 'rgba(109,109,110,0.65)', color: '#fff',
                  fontWeight: 700, fontSize: '0.92rem', border: 'none', cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Info size={15} />
                More Info
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── RIGHT SIDE — Cinematic profile card ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`rcard-${slide.id}`}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            position: 'absolute',
            right: '120px', top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 15,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
          }}
          className="hidden lg:flex"
        >
          {/* Spinning gradient ring + photo */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'relative', width: '200px', height: '200px' }}
          >
            {/* Rotating glow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: '-5px', borderRadius: '50%',
                background: `conic-gradient(${slide.accent}, transparent 40%, ${slide.accent} 60%, transparent)`,
                opacity: 0.7,
              }}
            />
            {/* Second ring — counter-rotate */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: '-10px', borderRadius: '50%',
                border: `1px dashed ${slide.accent}40`,
              }}
            />
            <img
              src="/profile.jpg"
              alt="Yashwanth Katta"
              style={{
                position: 'absolute', inset: '4px',
                borderRadius: '50%', objectFit: 'cover', objectPosition: 'top center',
                border: `4px solid #141414`,
                boxShadow: `0 0 40px ${slide.accent}40`,
              }}
            />
            {/* Open to work dot */}
            <div style={{
              position: 'absolute', bottom: '10px', right: '10px', zIndex: 2,
              width: '16px', height: '16px', borderRadius: '50%',
              background: '#4ade80', border: '3px solid #141414',
              boxShadow: '0 0 8px rgba(74,222,128,0.8)',
            }} />
          </motion.div>

          {/* Name + role card */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            style={{
              background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(16px)',
              border: `1px solid ${slide.accent}40`, borderRadius: '14px',
              padding: '14px 24px', textAlign: 'center',
              boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${slide.accent}15`,
            }}
          >
            <p style={{ color: '#fff', fontWeight: 800, fontSize: '1rem', marginBottom: '3px' }}>Yashwanth Katta</p>
            <p style={{ color: slide.accent, fontSize: '0.75rem', fontWeight: 700 }}>Engineering Leader</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
              <span style={{ color: '#4ade80', fontSize: '0.65rem', fontWeight: 600 }}>Open to Work</span>
            </div>
          </motion.div>

          {/* Floating stat chips */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { val: '6+',  label: 'Years'   },
              { val: 'FAANG', label: 'Alum'  },
              { val: '3.6', label: 'M.S. GPA'},
            ].map((s, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                style={{
                  background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)',
                  border: `1px solid ${slide.accent}30`, borderRadius: '10px',
                  padding: '10px 12px', textAlign: 'center',
                  minWidth: '54px',
                }}
              >
                <div style={{ color: slide.accent, fontWeight: 900, fontSize: '1rem', lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: '#666', fontSize: '0.62rem', marginTop: '3px' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Slide-specific badge */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: `${slide.accent}18`, border: `1px solid ${slide.accent}50`,
              borderRadius: '999px', padding: '6px 18px',
              color: slide.accent, fontSize: '0.72rem', fontWeight: 800,
              backdropFilter: 'blur(8px)',
            }}
          >
            {slide.match} · {slide.badge}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── SLIDE INDICATORS (right side) ── */}
      <div style={{
        position: 'absolute', right: '24px', top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 20,
      }}>
        {SLIDES.map((s, i) => (
          <motion.button
            key={i}
            onClick={() => { setCurrent(i); setShowInfo(false) }}
            whileHover={{ scaleX: 1.3 }}
            style={{
              width:        '3px',
              height:       i === current ? '36px' : '16px',
              background:   i === current ? '#fff' : 'rgba(255,255,255,0.28)',
              border:       'none', cursor: 'pointer',
              borderRadius: '2px',
              transition:   'height 0.3s, background 0.3s',
              padding:      0,
            }}
          />
        ))}
      </div>

      {/* ── PROGRESS BAR (bottom) ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
        display: 'flex', gap: '3px', padding: '0 56px 12px',
      }}>
        {SLIDES.map((s, i) => (
          <div key={i} style={{ flex: 1, cursor: 'pointer' }} onClick={() => setCurrent(i)}>
            {i === current
              ? <SlideProgress duration={SLIDE_DUR} key={`prog-${current}`} />
              : <div style={{ height: '2px', background: i < current ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
            }
          </div>
        ))}
      </div>

      {/* ── MORE INFO POPUP ── */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
            className="glass-dark"
            style={{
              position: 'absolute', bottom: '100px', left: '56px',
              borderRadius: '14px', padding: '20px 24px',
              maxWidth: '420px', zIndex: 30,
              border: `1px solid ${slide.accent}35`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.7), 0 0 30px ${slide.accent}15`,
            }}
          >
            <button
              onClick={() => setShowInfo(false)}
              style={{
                position: 'absolute', top: '12px', right: '14px',
                background: 'transparent', border: 'none',
                color: '#666', cursor: 'pointer', fontSize: '1rem', lineHeight: 1,
              }}
            >✕</button>
            <p style={{ color: slide.accent, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px' }}>
              {slide.badge}
            </p>
            <p style={{ color: '#fff', fontWeight: 800, fontSize: '1rem', marginBottom: '8px' }}>{slide.title}</p>
            <p style={{ color: '#aaa', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '12px' }}>{slide.desc}</p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: '#666' }}>
              <span>📍 {['Austin, TX','Tempe, AZ','Cincinnati, OH','Hyderabad, India'][slide.id]}</span>
              <span>⏱ {['2+ yrs','1 yr','1.5 yrs','3 yrs'][slide.id]}</span>
            </div>
            <a href="#experience" style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              marginTop: '14px', color: slide.accent, fontSize: '0.78rem',
              fontWeight: 700, textDecoration: 'none',
            }}>
              See all experience <ChevronRight size={13} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
