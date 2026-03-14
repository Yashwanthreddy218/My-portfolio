import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Contact() {
  const { theme } = useTheme()
  const accent     = theme === 'netflix' ? '#E50914' : '#FF9900'

  const links = [
    {
      icon:  <Mail size={20} />,
      label: 'Email',
      value: 'yashwanthreddykatta218@gmail.com',
      href:  'mailto:yashwanthreddykatta218@gmail.com',
      short: 'yashwanthreddykatta218@gmail.com',
    },
    {
      icon:  <Phone size={20} />,
      label: 'Phone',
      value: '361-228-9024',
      href:  'tel:3612289024',
      short: '361-228-9024',
    },
    {
      icon:  <Linkedin size={20} />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/yashwanth-katta',
      href:  'https://www.linkedin.com/in/yashwanth-katta',
      short: 'linkedin.com/in/yashwanth-katta',
    },
    {
      icon:  <Github size={20} />,
      label: 'GitHub',
      value: 'github.com/yashwanthkatta',
      href:  'https://github.com/yashwanthkatta',
      short: 'github.com/yashwanthkatta',
    },
  ]

  return (
    <section id="contact" className="section bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Let's Work Together</h2>
          <div className="section-divider mx-auto" style={{ background: accent }} />
          <p className="text-gray-400 text-sm max-w-lg mx-auto mt-5 leading-relaxed">
            I'm actively looking for Senior / Lead Full Stack Developer roles. If your team needs
            someone who ships clean code, leads modernizations, and thrives in Agile environments —
            let's talk.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {links.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bento-card flex items-center gap-4 no-underline group"
              style={{ borderColor: '#252525', textDecoration: 'none' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${accent}16`, color: accent }}
              >
                {link.icon}
              </div>
              <div className="min-w-0">
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">{link.label}</p>
                <p className="text-white text-sm font-semibold truncate">{link.short}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="mailto:yashwanthreddykatta218@gmail.com"
            className="btn-primary inline-flex"
            style={{ background: accent }}
          >
            <Send size={16} />
            Send Me an Email
          </a>
        </motion.div>

      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-[#1a1a1a] text-center">
        <p className="text-gray-600 text-xs">
          Designed & Built by{' '}
          <span style={{ color: accent }} className="font-semibold">Yashwanth Katta</span>
          {' '}· Full Stack Java Developer
        </p>
        <p className="text-gray-700 text-xs mt-1">
          Built with React 19 + Vite + Tailwind CSS + Framer Motion
        </p>
      </div>
    </section>
  )
}
