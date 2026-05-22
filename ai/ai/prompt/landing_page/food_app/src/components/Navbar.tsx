import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: '使用流程', href: '#how-it-works' },
  { label: '餐厅', href: '#features' },
  { label: '用户评价', href: '#social-proof' },
  { label: '下载 App', href: '#final-cta' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="主导航"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="#"
            className="text-2xl font-extrabold text-primary tracking-tight"
            aria-label="Foodiez home"
          >
            Foodiez
          </a>

          <ul className="hidden lg:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a
              href="#final-cta"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-200 shadow-button hover:shadow-lg hover:-translate-y-0.5"
            >
              下载 App
            </a>
          </div>

          <button
            className="lg:hidden p-2 -mr-2 text-gray-700 hover:text-primary transition-colors rounded-lg"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary-50 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#final-cta"
                onClick={() => setMobileOpen(false)}
                className="block mt-3 text-center bg-primary hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-button"
              >
                下载 App
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
