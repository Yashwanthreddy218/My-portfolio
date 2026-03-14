import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const NODES = [
  { id: 'java',   label: 'Java 21',      emoji: '☕', x: 70,  y: 130 },
  { id: 'spring', label: 'Spring Boot',  emoji: '🌱', x: 175, y: 75  },
  { id: 'ts',     label: 'TypeScript',   emoji: '📘', x: 270, y: 55  },
  { id: 'react',  label: 'React 19',     emoji: '⚛️', x: 370, y: 75  },
  { id: 'aws',    label: 'AWS',          emoji: '☁️', x: 470, y: 130 },
  { id: 'kafka',  label: 'Kafka',        emoji: '📡', x: 210, y: 200 },
  { id: 'docker', label: 'Docker',       emoji: '🐳', x: 350, y: 205 },
  { id: 'k8s',    label: 'Kubernetes',   emoji: '⚙️', x: 110, y: 230 },
  { id: 'oracle', label: 'Oracle DB',    emoji: '🗄️', x: 70,  y: 45  },
  { id: 'micro',  label: 'Microservices',emoji: '🔬', x: 460, y: 215 },
]

const EDGES = [
  ['java','spring'], ['java','kafka'], ['java','k8s'], ['java','oracle'],
  ['spring','ts'], ['spring','kafka'], ['spring','micro'],
  ['ts','react'], ['react','aws'],
  ['kafka','docker'], ['docker','aws'], ['docker','micro'],
]

function getNode(id) { return NODES.find(n => n.id === id) }

export default function TechConstellation() {
  const { theme } = useTheme()
  const accent    = theme === 'netflix' ? '#E50914' : '#FF9900'
  const ref       = useRef(null)
  const inView    = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} style={{ width: '100%', maxWidth: '600px' }}>
      <svg
        viewBox="0 0 540 270"
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        aria-hidden="true"
      >
        {/* Edges — use <path> so pathLength works */}
        {EDGES.map(([aId, bId], i) => {
          const a = getNode(aId)
          const b = getNode(bId)
          if (!a || !b) return null
          return (
            <motion.path
              key={i}
              d={`M${a.x},${a.y} L${b.x},${b.y}`}
              fill="none"
              stroke={accent}
              strokeWidth={1.2}
              strokeDasharray="4 8"
              initial={{ opacity: 0, strokeDashoffset: 0 }}
              animate={inView ? {
                opacity: 0.3,
                strokeDashoffset: [0, -24],
              } : { opacity: 0 }}
              transition={{
                opacity:          { duration: 0.5, delay: 0.3 + i * 0.07 },
                strokeDashoffset: { duration: 2.2, repeat: Infinity, ease: 'linear', delay: i * 0.12 },
              }}
            />
          )
        })}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.08, type: 'spring', stiffness: 200, damping: 14 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {/* Pulse ring */}
            <motion.circle
              cx={node.x} cy={node.y} r={22}
              fill="none"
              stroke={accent}
              strokeWidth={1}
              animate={{ r: [22, 30, 22], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2.8 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
            />

            {/* Node bg */}
            <circle
              cx={node.x} cy={node.y} r={20}
              fill="#1e1e1e"
              stroke={accent}
              strokeWidth={1.5}
              strokeOpacity={0.5}
              style={{ filter: `drop-shadow(0 0 8px ${accent}50)` }}
            />

            {/* Emoji */}
            <text
              x={node.x} y={node.y + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="14"
            >
              {node.emoji}
            </text>

            {/* Label */}
            <text
              x={node.x} y={node.y + 30}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="8.5"
              fill="#777"
              fontFamily="system-ui,sans-serif"
              fontWeight="600"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
