import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { Code2, Cloud, Database, Layers, GraduationCap, Briefcase } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
})

//this fnction return a html div 
export default function About() {
  const { theme } = useTheme()
  const accent = theme === 'netflix' ? '#E50914' : '#FF9900'

  return (
    <section id="about" className="section bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div {...fadeUp()} className="mb-12">
          <p className="section-label">Who I Am</p>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider" style={{ background: accent }} />
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

          {/* Bio — spans 2 cols */}
          <motion.div {...fadeUp(0.1)} className="bento-card lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-black text-lg flex-shrink-0"
                style={{ background: accent }}
              >
                YK
              </div>
              <div>
                <p className="text-white font-bold">Yashwanth Katta</p>
                <p className="text-sm" style={{ color: accent }}>Full Stack Java Developer</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              I'm a Full Stack Java Developer with <span className="text-white font-semibold">6+ years</span> of professional IT experience
              designing and developing multi-tier distributed enterprise applications. I specialize in building
              scalable microservices with <span className="text-white font-semibold">Java / Spring Boot</span> and
              crafting modern, accessible UIs with <span className="text-white font-semibold">React 19 &amp; Angular</span>.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Currently at <span className="text-white font-semibold">Texas Parks & Wildlife</span>, I led the full-stack modernization
              of the Boat Titling & Registration system — migrating to Vite + React 19 and Java 21 + Spring Boot 3.4,
              achieving 60%+ build time reduction. Previously I built cloud-native systems at <span className="text-white font-semibold">Amazon Web Services</span>.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <Code2 size={13}/>,   text: 'Java & React'     },
                { icon: <Cloud size={13}/>,   text: 'AWS / Kubernetes' },
                { icon: <Database size={13}/>, text: 'Oracle / MongoDB' },
                { icon: <Layers size={13}/>,  text: 'Microservices'    },
              ].map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}28` }}
                >
                  {item.icon} {item.text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Years */}
          <motion.div {...fadeUp(0.15)} className="bento-card flex flex-col justify-between">
            <Briefcase size={24} style={{ color: accent }} />
            <div>
              <div className="text-5xl font-black text-white mt-4">6+</div>
              <div className="text-gray-400 text-sm mt-1">Years of Professional Experience</div>
            </div>
          </motion.div>

          {/* Companies */}
          <motion.div {...fadeUp(0.2)} className="bento-card">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">Companies</p>
            <div className="space-y-3">
              {[
                { name: 'Texas Parks & Wildlife', period: '2023 – Now',  active: true  },
                { name: 'Amazon Web Services',    period: '2022 – 2023', active: false },
                { name: 'Mercy Hospital',         period: '2021 – 2022', active: false },
                { name: 'Cookiegen Info Tech',    period: '2018 – 2020', active: false },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: c.active ? '#4ade80' : accent, opacity: c.active ? 1 : 0.4 }}
                    />
                    <span className="text-xs text-gray-300 font-medium">{c.name}</span>
                  </div>
                  <span className="text-xs text-gray-600">{c.period}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div {...fadeUp(0.25)} className="bento-card">
            <GraduationCap size={24} style={{ color: accent }} className="mb-4" />
            <p className="text-white font-bold text-sm mb-1">M.S. Computer Science</p>
            <p className="text-gray-400 text-xs mb-3">Texas A&M University – Kingsville</p>
            <div
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-bold"
              style={{ background: `${accent}14`, color: accent }}
            >
              ★ GPA 3.6 / 4.0
            </div>
            <div className="mt-4 pt-4 border-t border-[#252525]">
              <p className="text-white font-bold text-sm mb-1">B.Tech Electronics</p>
              <p className="text-gray-400 text-xs">CVR College of Engineering, India</p>
            </div>
          </motion.div>

          {/* Open to work */}
          <motion.div
            {...fadeUp(0.3)}
            className="bento-card flex flex-col justify-between"
            style={{ background: `linear-gradient(135deg, #1a1a1a 0%, ${accent}0f 100%)`, borderColor: `${accent}30` }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-bold uppercase tracking-wide">Open to Work</span>
              </div>
              <p className="text-white font-bold text-base mb-2">Let's Build Something Great</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Looking for Senior / Lead Full Stack roles. Remote, hybrid, or onsite in the US.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-4 text-center text-sm font-bold py-2.5 rounded-lg transition-all"
              style={{ background: accent, color: '#000' }}
            >
              Get In Touch →
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
