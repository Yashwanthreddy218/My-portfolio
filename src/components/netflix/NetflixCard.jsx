import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Plus, ThumbsUp } from 'lucide-react'
import SparklineChart from '../SparklineChart'

/**
 * NetflixCard — 3D-tilt card with in-card glass overlay on hover.
 * The overlay slides UP from inside the card — no overflow, no z-index fights.
 * Shimmer sweep + glow border + scale on hover.
 */
export default function NetflixCard({ item, accent = '#E50914', onPlay }) {
  const [hovered, setHovered] = useState(false)
  const [tilt,    setTilt]    = useState({ x: 0, y: 0 })
  const cardRef               = useRef(null)

  // 3D tilt on mouse move
  const onMouseMove = (e) => {
    if (!cardRef.current) return
    const rect  = cardRef.current.getBoundingClientRect()
    const cx    = (e.clientX - rect.left) / rect.width  - 0.5   // -0.5 → +0.5
    const cy    = (e.clientY - rect.top)  / rect.height - 0.5
    setTilt({ x: cy * -10, y: cx * 10 })   // subtle tilt
  }
  const onMouseLeave = () => { setHovered(false); setTilt({ x: 0, y: 0 }) }

  return (
    <motion.div
      ref={cardRef}
      onClick={() => onPlay && onPlay(item.title)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      animate={{
        scale:    hovered ? 1.08 : 1,
        rotateX:  tilt.x,
        rotateY:  tilt.y,
        zIndex:   hovered ? 50 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        width:          '220px',
        flexShrink:     0,
        borderRadius:   '10px',
        overflow:       'hidden',
        cursor:         'pointer',
        transformStyle: 'preserve-3d',
        position:       'relative',
        /* glow border via box-shadow — cheaper than border animation */
        boxShadow: hovered
          ? `0 0 0 1.5px ${accent}, 0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${accent}35`
          : '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* ── BACKGROUND GRADIENT ── */}
      <div
        style={{
          height:     '148px',
          background: item.bg || 'linear-gradient(135deg,#1a1a2e,#16213e)',
          position:   'relative',
          overflow:   'hidden',
        }}
      >
        {/* Radial accent glow */}
        <div style={{
          position:   'absolute', inset: 0,
          background: `radial-gradient(ellipse at 55% 35%, ${accent}35 0%, transparent 65%)`,
          transition: 'opacity 0.3s',
          opacity:    hovered ? 1 : 0.5,
        }} />

        {/* Sparkline watermark — Amazon card only */}
        {item.title === 'Amazon Web Services' && (
          <div style={{
            position: 'absolute', bottom: '6px', left: '8px', right: '8px',
            opacity: hovered ? 0 : 0.22,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
          }}>
            <SparklineChart accent="#FF9900" width={200} height={36} label="" />
          </div>
        )}

        {/* Shimmer sweep on hover */}
        {hovered && (
          <div style={{
            position:   'absolute', top: 0, left: '-60%',
            width:      '45%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)',
            transform:  'skewX(-15deg)',
            animation:  'shimmer 0.9s ease forwards',
          }} />
        )}

        {/* Emoji */}
        <div style={{
          position:   'absolute', inset: 0,
          display:    'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '8px',
          paddingTop: '8px',
        }}>
          <motion.span
            animate={{ scale: hovered ? 1.15 : 1, y: hovered ? -6 : 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            style={{ fontSize: '2.4rem', filter: `drop-shadow(0 4px 12px ${accent}60)` }}
          >
            {item.emoji || '💻'}
          </motion.span>

          <motion.p
            animate={{ y: hovered ? -4 : 0, opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            style={{
              color:      '#fff', fontWeight: 700,
              fontSize:   '0.78rem', textAlign: 'center',
              padding:    '0 10px', lineHeight: 1.3,
            }}
          >
            {item.title}
          </motion.p>
          {item.subtitle && !hovered && (
            <p style={{ color: accent, fontSize: '0.65rem', fontWeight: 600, textAlign: 'center' }}>
              {item.subtitle}
            </p>
          )}
        </div>

        {/* ── GLASS OVERLAY — slides up from bottom ── */}
        <motion.div
          initial={false}
          animate={{ y: hovered ? '0%' : '100%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          style={{
            position:        'absolute', bottom: 0, left: 0, right: 0,
            height:          '100%',
            background:      'rgba(0,0,0,0.72)',
            backdropFilter:  'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop:       `1px solid ${accent}30`,
            padding:         '12px',
            display:         'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}
        >
          {/* Action row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
            <button
              onClick={e => { e.stopPropagation(); onPlay && onPlay(item.title) }}
              style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: '#fff', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Play size={12} fill="#000" color="#000" />
            </button>
            <button style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'transparent', border: '1.5px solid #666',
              cursor: 'pointer', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Plus size={12} />
            </button>
            <button style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'transparent', border: '1.5px solid #666',
              cursor: 'pointer', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ThumbsUp size={12} />
            </button>
            {item.match && (
              <span style={{
                marginLeft: 'auto', fontSize: '0.62rem', fontWeight: 800,
                color: '#46d369', whiteSpace: 'nowrap',
              }}>
                {item.match}
              </span>
            )}
          </div>

          {/* Title + meta */}
          <div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.75rem', marginBottom: '3px', lineHeight: 1.3 }}>
              {item.title}
            </p>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '5px' }}>
              {item.year && (
                <span style={{ fontSize: '0.6rem', color: '#888', border: '1px solid #444', padding: '1px 5px', borderRadius: '3px' }}>
                  {item.year}
                </span>
              )}
              {item.duration && (
                <span style={{ fontSize: '0.6rem', color: '#888' }}>{item.duration}</span>
              )}
            </div>
            {item.desc && (
              <p style={{ color: '#aaa', fontSize: '0.62rem', lineHeight: 1.5, marginBottom: '5px',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {item.desc}
              </p>
            )}
            {/* Genre tags */}
            {item.tags && (
              <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                {item.tags.slice(0, 3).map((t, i) => (
                  <span key={i} style={{ fontSize: '0.58rem', color: accent, fontWeight: 600 }}>
                    {i > 0 && <span style={{ color: '#555', marginRight: '3px' }}>·</span>}
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
