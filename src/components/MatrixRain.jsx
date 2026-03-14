import { useEffect, useRef } from 'react'

/* Matrix-style code rain with Java/React keywords + rocket launch */
const CHARS = [
  // Java keywords
  'class','void','public','static','final','import','return','extends','interface',
  '@Override','Spring','Boot','React','Kafka','AWS','Docker','Java','K8s','REST',
  // Code symbols
  '{','}','(',')','[]','->','=>','/*','*/','//','&&','||','!=','==',
  // Hex-style
  '0x2A','0xFF','null','true','false','new','this',
]

export default function MatrixRain({ opacity = 0.18, color = '#E50914' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const fontSize  = 11
    const cols      = Math.floor(canvas.width / (fontSize * 6))
    const drops     = Array.from({ length: cols }, () => Math.random() * -100)
    const speeds    = Array.from({ length: cols }, () => 0.3 + Math.random() * 0.5)
    const colWords  = Array.from({ length: cols }, () => CHARS[Math.floor(Math.random() * CHARS.length)])

    // Rocket state
    let rocketY  = canvas.height + 60
    let rocketX  = canvas.width  * 0.72
    let launched = false
    let resetTimer = 0

    const draw = () => {
      // Fade trail
      ctx.fillStyle = 'rgba(20,20,20,0.10)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px "Courier New", monospace`

      drops.forEach((y, i) => {
        const word = colWords[i]
        const x    = i * (fontSize * 6)

        // Bright head character
        ctx.fillStyle = `rgba(255,255,255,0.65)`
        ctx.fillText(word[0] || '', x, y * fontSize)

        // Trailing characters in accent color
        ctx.fillStyle = color.replace(')', `,${opacity * 0.8})`).replace('rgb', 'rgba')
          .replace('#', '') // fallback below
        ctx.fillStyle = `rgba(${hexToRgb(color)},${opacity * 0.8})`
        for (let c = 1; c < word.length; c++) {
          const alpha = opacity * (1 - c / word.length) * 0.6
          ctx.fillStyle = `rgba(${hexToRgb(color)},${alpha})`
          ctx.fillText(word[c], x, (y - c) * fontSize)
        }

        drops[i] += speeds[i]
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i]      = 0
          colWords[i]   = CHARS[Math.floor(Math.random() * CHARS.length)]
          speeds[i]     = 0.3 + Math.random() * 0.5
        }
      })

      // Rocket
      if (!launched && resetTimer <= 0) {
        rocketY  = canvas.height + 60
        launched = true
      }
      if (launched) {
        rocketY -= 2.8

        // Flame trail
        for (let f = 0; f < 6; f++) {
          const fy     = rocketY + 30 + f * 12
          const spread = (f + 1) * 4
          ctx.beginPath()
          ctx.arc(rocketX + (Math.random() - 0.5) * spread, fy, 4 - f * 0.4, 0, Math.PI * 2)
          ctx.fillStyle = f < 2
            ? `rgba(255,200,50,${0.7 - f * 0.1})`
            : `rgba(229,9,20,${0.5 - f * 0.07})`
          ctx.fill()
        }

        // Rocket body emoji
        ctx.font    = '22px serif'
        ctx.fillText('🚀', rocketX - 11, rocketY)

        // Glow ring around rocket
        const grd = ctx.createRadialGradient(rocketX, rocketY, 2, rocketX, rocketY, 28)
        grd.addColorStop(0, `rgba(${hexToRgb(color)},0.18)`)
        grd.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(rocketX, rocketY, 28, 0, Math.PI * 2)
        ctx.fill()

        if (rocketY < -80) {
          launched   = false
          resetTimer = 180 + Math.floor(Math.random() * 240) // pause ~3-7s before relaunch
          rocketX    = canvas.width * (0.3 + Math.random() * 0.5)
        }
      } else {
        resetTimer--
      }
    }

    const id = setInterval(draw, 40) // ~25fps
    return () => { clearInterval(id); window.removeEventListener('resize', resize) }
  }, [color, opacity])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
