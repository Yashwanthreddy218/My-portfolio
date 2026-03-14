import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import { motion } from 'framer-motion'

/* Fallback shown while Lottie loads or if URL is unreachable */
function DevFallback({ size }) {
  return (
    <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Orbiting ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: size * 0.8, height: size * 0.8,
          borderRadius: '50%',
          border: '1.5px dashed rgba(255,255,255,0.12)',
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: size * 0.55, height: size * 0.55,
          borderRadius: '50%',
          border: '1px dashed rgba(255,255,255,0.08)',
        }}
      />
      {/* Center icon */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: size * 0.28, lineHeight: 1, zIndex: 1 }}
      >
        💻
      </motion.div>
      {/* Orbiting dots */}
      {['☕', '⚛️', '☁️', '🐳'].map((e, i) => {
        const angle = (i / 4) * Math.PI * 2
        const r     = size * 0.35
        return (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
            style={{
              position: 'absolute',
              width: size, height: size,
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
              transformOrigin: 'center',
            }}
          >
            <div style={{ fontSize: size * 0.1, marginTop: size * 0.08 }}>{e}</div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function LottieDev({ size = 320, style = {} }) {
  const [data,   setData]   = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const urls = [
      'https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/KSgJlzbroJ.json',
      'https://assets2.lottiefiles.com/packages/lf20_w51pcehl.json',
    ]
    let cancelled = false

    const tryFetch = async () => {
      for (const url of urls) {
        try {
          const r    = await fetch(url, { signal: AbortSignal.timeout(6000) })
          const json = await r.json()
          if (!cancelled && json?.v !== undefined) { setData(json); return }
        } catch { /* try next */ }
      }
      if (!cancelled) setFailed(true)
    }

    tryFetch()
    return () => { cancelled = true }
  }, [])

  if (data) {
    return <Lottie animationData={data} loop autoplay style={{ width: size, height: size, ...style }} />
  }

  // Show animated CSS fallback (loads instantly, always visible)
  return <DevFallback size={size} />
}
