import { motion } from 'framer-motion'

export default function PromoBanner() {
  return (
    <section className="py-12 lg:py-16 bg-primary" aria-labelledby="promo-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-primary-600 py-12 px-6 sm:px-12 lg:px-16 text-center"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <span className="absolute top-6 left-8 text-4xl">🍕</span>
            <span className="absolute bottom-6 right-8 text-4xl">🍣</span>
            <span className="absolute top-1/2 right-12 text-3xl">🥗</span>
          </div>

          <div className="relative">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider"
            >
              限时优惠
            </motion.span>

            <motion.h2
              id="promo-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
            >
              首单免配送费
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-4 text-white/80 text-lg max-w-lg mx-auto"
            >
              首次使用 Foodiez？你的第一单配送费我们来出。无最低消费，无附加条件。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-8"
            >
              <a
                href="#final-cta"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-primary font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                领取免配送费特权
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-white/50 text-sm"
            >
              结账时输入优惠码 <span className="font-bold text-white">FOODIEZ1</span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
