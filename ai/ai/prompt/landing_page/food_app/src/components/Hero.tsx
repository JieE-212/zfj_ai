import { motion } from 'framer-motion'

const trustItems = [
  { value: '4.9', label: 'App Store 评分', icon: '★' },
  { value: '30 分钟', label: '平均送达时间', icon: '🕐' },
  { value: '500+', label: '本地餐厅入驻', icon: '🍽️' },
]

const floatingCards = [
  { emoji: '🍕', label: '披萨', delay: 0, x: -40, y: -20 },
  { emoji: '🍣', label: '寿司', delay: 1.5, x: 30, y: 40 },
  { emoji: '🥗', label: '沙拉', delay: 3, x: -20, y: 60 },
  { emoji: '🍔', label: '汉堡', delay: 4.5, x: 40, y: -30 },
]

export default function Hero() {
  return (
    <section
      className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-orange-50/50"
      aria-labelledby="hero-heading"
    >
      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100/60 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div className="text-center lg:text-left">
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] text-balance"
            >
              你最爱的美食，
              <br />
              <span className="text-primary">闪电送达</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0 text-balance"
            >
              浏览 500+ 本地优质餐厅，秒速下单，热乎新鲜的美食 30 分钟内送到你家门口。
            </motion.p>

            {/* App Store buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated"
                aria-label="从 App Store 下载"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className="text-left leading-tight">
                  <span className="block text-xs font-normal">从 App Store 下载</span>
                  App Store
                </span>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated"
                aria-label="从 Google Play 下载"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302L14.5 17.31l-4.511-4.511L14.5 8.288l2.3 2.301-2.301 2.302v.816zm3.164-5.238L14.5 4.674l-2.302 2.301L9.896 4.674l4.395-4.395a1 1 0 0 1 1.214-.106l3.284 2.182a1 1 0 0 1 .344 1.366l-3.464 5.196-2.501-2.501 3.287-3.287zM14.207 12l2.302 2.302-2.5 2.5-3.287-3.287L14.5 9.732l-2.5-2.5L17.663 2.9a1 1 0 0 1 1.366.344l3.464 5.196a1 1 0 0 1-.106 1.214L14.207 12z" />
                </svg>
                <span className="text-left leading-tight">
                  <span className="block text-xs font-normal">从 Google Play 下载</span>
                  Google Play
                </span>
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
              className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                  <div>
                    <div className="font-bold text-gray-900 text-lg leading-tight">{item.value}</div>
                    <div className="text-xs text-gray-500">{item.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative flex justify-center"
          >
            {/* Phone frame */}
            <div className="relative w-64 sm:w-72 lg:w-80 aspect-[9/16] bg-gray-900 rounded-[2.5rem] p-2.5 shadow-elevated">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-10" />
              <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                {/* Mock app content */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white p-4 pt-8 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm">Foodiez</span>
                    <span className="text-xs text-gray-400">📍 附近餐厅</span>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">🔍</span>
                    <span className="text-sm text-gray-400">搜索餐厅或美食...</span>
                  </div>
                  <div className="flex gap-2 overflow-hidden">
                    {['🍕 披萨', '🍣 寿司', '🌮 塔可', '🍜 面食'].map((cat) => (
                      <span key={cat} className="bg-white rounded-full px-3 py-1 text-xs font-medium shadow-sm whitespace-nowrap border border-gray-100">{cat}</span>
                    ))}
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    {[
                      { name: '罗马披萨', type: '意大利菜 • 4.8 ★ • 20-30分钟', emoji: '🍕' },
                      { name: '樱花寿司', type: '日本料理 • 4.9 ★ • 25-35分钟', emoji: '🍣' },
                      { name: '绿碗轻食', type: '健康餐 • 4.7 ★ • 15-25分钟', emoji: '🥗' },
                    ].map((r) => (
                      <div key={r.name} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
                        <span className="text-2xl" aria-hidden="true">{r.emoji}</span>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">{r.name}</div>
                          <div className="text-xs text-gray-400">{r.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating food cards */}
            {floatingCards.map((card) => (
              <motion.div
                key={card.label}
                animate={{
                  y: [card.y, card.y - 12, card.y],
                }}
                transition={{
                  duration: 3.5,
                  delay: card.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bg-white rounded-2xl shadow-card px-3 py-2 flex items-center gap-2 text-sm font-medium pointer-events-none"
                style={{ left: card.x < 0 ? card.x : undefined, right: card.x > 0 ? -card.x : undefined }}
                aria-hidden="true"
              >
                <span>{card.emoji}</span>
                {card.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
