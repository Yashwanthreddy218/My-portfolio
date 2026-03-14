import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { X, MapPin, Calendar, ArrowRight, Zap, TrendingUp } from 'lucide-react'
import Aurora          from '../Aurora'
import Particles        from '../Particles'
import SparklineChart   from '../SparklineChart'

/* ── Animated counter hook ─────────────────────────────── */
function AnimatedNumber({ value, suffix = '', duration = 1.8 }) {
  const ref       = useRef(null)
  const inView    = useInView(ref, { once: true, margin: '-40px' })
  const motionVal = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionVal, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(Math.floor(v)),
    })
    return controls.stop
  }, [inView, value, duration, motionVal])

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  )
}

/* ── Main Modal ─────────────────────────────────────────── */
export default function ProjectModal({ project, onClose }) {
  const scrollRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const { accent } = project

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          padding: '0',
        }}
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
          ref={scrollRef}
          style={{
            width: '100%', maxWidth: '900px',
            maxHeight: '92vh',
            background: '#141414',
            borderRadius: '20px 20px 0 0',
            overflowY: 'auto',
            position: 'relative',
            scrollbarWidth: 'thin',
            scrollbarColor: `${accent} #1a1a1a`,
          }}
        >

          {/* ── HERO ─────────────────────────────────────── */}
          <div style={{
            position: 'relative', height: '340px', overflow: 'hidden',
            borderRadius: '20px 20px 0 0',
            background: project.bg,
          }}>
            <Aurora colors={[accent, '#000', accent, '#111']} opacity={0.2} />
            <Particles count={20} color={accent} maxSize={2.5} />

            {/* Noise */}
            <div className="noise" />

            {/* Bottom fade */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
              background: 'linear-gradient(0deg, #141414 0%, transparent 100%)',
            }} />

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '20px', right: '20px', zIndex: 50,
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)',
              }}
            >
              <X size={16} />
            </button>

            {/* Hero content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              style={{
                position: 'absolute', bottom: '24px', left: '32px', right: '32px',
                zIndex: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 800, padding: '3px 12px', borderRadius: '4px',
                  background: accent, color: '#000',
                }}>{project.badge}</span>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: '4px',
                  background: 'rgba(255,255,255,0.1)', color: '#ddd',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  <Calendar size={10} /> {project.period}
                </span>
                <span style={{
                  fontSize: '0.7rem', color: '#888',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  <MapPin size={10} /> {project.location}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '6px' }}>
                <span style={{ fontSize: '2.8rem' }}>{project.emoji}</span>
                <div>
                  <h1 style={{
                    color: '#fff', fontWeight: 900,
                    fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
                    letterSpacing: '-0.5px', lineHeight: 1.05, marginBottom: '4px',
                  }}>{project.title}</h1>
                  <p style={{ color: accent, fontWeight: 700, fontSize: '0.9rem' }}>{project.subtitle}</p>
                </div>
              </div>

              <p style={{
                color: 'rgba(229,229,229,0.75)', fontSize: '0.88rem',
                fontStyle: 'italic', fontWeight: 500,
                borderLeft: `3px solid ${accent}`, paddingLeft: '12px',
                lineHeight: 1.5,
              }}>
                "{project.tagline}"
              </p>
            </motion.div>
          </div>

          {/* ── BODY ─────────────────────────────────────── */}
          <div style={{ padding: '32px 32px 48px' }}>

            {/* PROLOGUE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '40px' }}
            >
              <SectionHeading label="The Story" icon={<TrendingUp size={16} />} accent={accent} />
              <p style={{
                color: '#aaa', fontSize: '0.92rem', lineHeight: 1.9,
                background: '#1a1a1a', borderRadius: '12px',
                padding: '20px 24px',
                borderLeft: `3px solid ${accent}40`,
                whiteSpace: 'pre-line',
              }}>
                {project.prologue.replace(/\n\s+/g, '\n')}
              </p>
            </motion.div>

            {/* SPARKLINE CHART — Amazon only */}
            {project.id === 'amazon' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  marginBottom: '40px',
                  background: '#1a1a1a',
                  borderRadius: '14px',
                  padding: '20px 22px',
                  border: `1px solid ${accent}22`,
                }}
              >
                <SectionHeading label="Seller Revenue Trend" icon={<TrendingUp size={16} />} accent={accent} />
                <p style={{ color: '#666', fontSize: '0.78rem', marginBottom: '14px' }}>
                  Seller GMV growth after adopting Brand Analytics dashboards — indexed over 12 months.
                </p>
                <SparklineChart accent={accent} width={500} height={80} label="" />
              </motion.div>
            )}

            {/* IMPACT METRICS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '40px' }}
            >
              <SectionHeading label="Measurable Impact" icon={<Zap size={16} />} accent={accent} />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
                gap: '12px',
              }}>
                {project.metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.45 }}
                    style={{
                      background: '#1f1f1f',
                      border: `1px solid ${m.color}25`,
                      borderRadius: '12px', padding: '18px 16px',
                      textAlign: 'center', position: 'relative', overflow: 'hidden',
                    }}
                  >
                    {/* Glow */}
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: 'inherit',
                      background: `radial-gradient(ellipse at 50% 0%, ${m.color}18 0%, transparent 65%)`,
                    }} />
                    <div style={{
                      fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900,
                      color: m.color, lineHeight: 1, marginBottom: '6px',
                      fontVariantNumeric: 'tabular-nums', position: 'relative',
                    }}>
                      <AnimatedNumber value={m.value} suffix={m.suffix} />
                    </div>
                    <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.78rem', marginBottom: '3px', position: 'relative' }}>
                      {m.label}
                    </p>
                    <p style={{ color: '#555', fontSize: '0.68rem', lineHeight: 1.4, position: 'relative' }}>
                      {m.sub}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* BEFORE / AFTER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '40px' }}
            >
              <SectionHeading label="Before & After" icon={<ArrowRight size={16} />} accent={accent} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '12px', alignItems: 'start' }}>
                {/* BEFORE */}
                <ProblemCard data={project.problem} />

                {/* Arrow */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  paddingTop: '32px',
                }}>
                  <motion.div
                    animate={{ x: [-3, 3, -3] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: `${accent}20`, border: `1px solid ${accent}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: accent,
                    }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </div>

                {/* AFTER */}
                <SolutionCard data={project.solution} accent={accent} />
              </div>
            </motion.div>

            {/* TIMELINE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '40px' }}
            >
              <SectionHeading label="Journey Timeline" icon={<Calendar size={16} />} accent={accent} />
              <div style={{ position: 'relative', paddingLeft: '24px' }}>
                {/* Line */}
                <div style={{
                  position: 'absolute', left: '5px', top: '8px', bottom: '8px', width: '2px',
                  background: `linear-gradient(180deg, ${accent} 0%, ${accent}20 100%)`,
                  borderRadius: '2px',
                }} />

                {project.timeline.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'flex-start' }}
                  >
                    {/* Dot */}
                    <div style={{
                      position: 'absolute', left: '-1px',
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: accent,
                      border: '3px solid #141414',
                      marginTop: '3px', flexShrink: 0,
                      boxShadow: `0 0 8px ${accent}80`,
                    }} />
                    <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '10px 14px', flex: 1 }}>
                      <p style={{ color: accent, fontWeight: 700, fontSize: '0.75rem', marginBottom: '3px', letterSpacing: '0.5px' }}>
                        PHASE {i + 1} — {step.phase.toUpperCase()}
                      </p>
                      <p style={{ color: '#bbb', fontSize: '0.84rem', lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* END USER IMPACT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '40px' }}
            >
              <SectionHeading label="End User Impact" icon={<TrendingUp size={16} />} accent={accent} />
              <div style={{
                background: `linear-gradient(135deg, ${accent}10 0%, transparent 100%)`,
                border: `1px solid ${accent}30`,
                borderRadius: '14px', padding: '22px 24px',
              }}>
                <p style={{
                  color: '#ccc', fontSize: '0.92rem', lineHeight: 1.85,
                  fontStyle: 'italic',
                }}>
                  "{project.endUserImpact.replace(/\n\s+/g, ' ')}"
                </p>
              </div>
            </motion.div>

            {/* TECH STACK */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading label="Tech Stack" icon={<Zap size={16} />} accent={accent} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tech.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    style={{
                      fontSize: '0.78rem', fontWeight: 600,
                      padding: '5px 14px', borderRadius: '999px',
                      background: `${accent}12`, color: accent,
                      border: `1px solid ${accent}28`,
                      transition: 'all 0.2s',
                    }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Sub-components ──────────────────────────────────────── */

function SectionHeading({ label, icon, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
      <div style={{ color: accent }}>{icon}</div>
      <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.3px' }}>{label}</h3>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #2a2a2a, transparent)' }} />
    </div>
  )
}

function ProblemCard({ data }) {
  return (
    <div style={{
      background: '#1a1a1a', borderRadius: '12px',
      border: '1px solid rgba(239,68,68,0.2)', padding: '18px',
    }}>
      <p style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>
        ✗ {data.title}
      </p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.9rem', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
            <span style={{ color: '#888', fontSize: '0.78rem', lineHeight: 1.5 }}>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SolutionCard({ data, accent }) {
  return (
    <div style={{
      background: '#1a1a1a', borderRadius: '12px',
      border: `1px solid ${accent}30`, padding: '18px',
    }}>
      <p style={{ color: accent, fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>
        ✓ {data.title}
      </p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}
          >
            <span style={{ fontSize: '0.9rem', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
            <span style={{ color: '#ccc', fontSize: '0.78rem', lineHeight: 1.5 }}>{item.text}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
