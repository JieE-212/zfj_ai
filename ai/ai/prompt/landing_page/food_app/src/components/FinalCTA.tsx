import { motion } from 'framer-motion'

export default function FinalCTA() {
  return (
    <section id="final-cta" className="py-16 lg:py-24 bg-gray-900" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
        >
          下载 Foodiez，比以前更快吃到美食
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5 text-gray-400 text-lg max-w-lg mx-auto"
        >
          加入 200 万+ 用户，每天用 Foodiez 点他们最爱的美食。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            aria-label="从 App Store 下载"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span className="text-left leading-tight">
              <span className="block text-xs font-normal text-gray-500">从 App Store 下载</span>
              App Store
            </span>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            aria-label="从 Google Play 下载"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302L14.5 17.31l-4.511-4.511L14.5 8.288l2.3 2.301-2.301 2.302v.816zm3.164-5.238L14.5 4.674l-2.302 2.301L9.896 4.674l4.395-4.395a1 1 0 0 1 1.214-.106l3.284 2.182a1 1 0 0 1 .344 1.366l-3.464 5.196-2.501-2.501 3.287-3.287zM14.207 12l2.302 2.302-2.5 2.5-3.287-3.287L14.5 9.732l-2.5-2.5L17.663 2.9a1 1 0 0 1 1.366.344l3.464 5.196a1 1 0 0 1-.106 1.214L14.207 12z" />
            </svg>
            <span className="text-left leading-tight">
              <span className="block text-xs font-normal text-gray-500">从 Google Play 下载</span>
              Google Play
            </span>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-14 grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { value: '200万+', label: '下载量' },
            { value: '500+', label: '合作餐厅' },
            { value: '50+', label: '覆盖城市' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-extrabold text-white">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
