import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* Seller revenue trend — draws itself when it enters the viewport */
const RAW = [20, 35, 28, 45, 52, 48, 65, 70, 68, 82, 88, 95]

function normalize(pts, w, h, pad = 6) {
  const min = Math.min(...pts)
  const max = Math.max(...pts)
  const xStep = (w - pad * 2) / (pts.length - 1)
  return pts.map((v, i) => ({
    x: pad + i * xStep,
    y: h - pad - ((v - min) / (max - min)) * (h - pad * 2),
  }))
}

export default function SparklineChart({ accent = '#FF9900', width = 300, height = 72, label = 'Revenue Trend' }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const pts    = normalize(RAW, width, height)

  // Build SVG path string
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${pts[pts.length - 1].x},${height} L${pts[0].x},${height} Z`

  return (
    <div ref={ref} style={{ width: '100%' }}>
      {label && (
        <p style={{ color: '#555', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px', fontWeight: 600 }}>
          📈 {label}
        </p>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`sg-${accent.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path d={areaPath} fill={`url(#sg-${accent.replace('#', '')})`} />

        {/* Line — animates pathLength 0 → 1 */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Dots at each data point */}
        {pts.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x} cy={p.y} r={2.5}
            fill={accent}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.4 + i * 0.05, duration: 0.2 }}
          />
        ))}

        {/* Last dot — bigger highlight */}
        <motion.circle
          cx={pts[pts.length - 1].x}
          cy={pts[pts.length - 1].y}
          r={5}
          fill={accent}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 2.0, duration: 0.3, type: 'spring', stiffness: 300 }}
        />
      </svg>
    </div>
  )
}
