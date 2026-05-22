import { useRef } from 'react'
import { motion } from 'framer-motion'

const screens = [
  {
    title: '浏览与发现',
    description: '探索菜单、图片和评价',
    color: 'from-primary-50 to-white',
    content: (
      <div className="flex flex-col gap-3 p-4 pt-8 h-full">
        <div className="font-bold text-sm">🍔 附近餐厅</div>
        <div className="flex gap-2 overflow-hidden">
          {['全部', '附近', '高评分', '最快'].map((f) => (
            <span key={f} className="bg-gray-100 rounded-full px-3 py-1 text-[10px] font-medium">{f}</span>
          ))}
        </div>
        {[
          { n: '罗马披萨', d: '意大利菜 • 1.2km • ⭐ 4.8' },
          { n: '塔可派对', d: '墨西哥菜 • 1.8km • ⭐ 4.9' },
          { n: '樱花寿司', d: '日本料理 • 0.8km • ⭐ 4.7' },
        ].map((r) => (
          <div key={r.n} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-lg flex-shrink-0">🍽️</div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-gray-900">{r.n}</div>
              <div className="text-[10px] text-gray-400 truncate">{r.d}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: '实时追踪',
    description: '地图上实时查看配送进度',
    color: 'from-blue-50 to-white',
    content: (
      <div className="flex flex-col gap-3 p-4 pt-8 h-full">
        <div className="font-bold text-sm">🛵 实时追踪</div>
        <div className="flex-1 bg-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 24 24" className="text-primary/30" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <motion.div
            animate={{ x: [0, 30, -20, 10, 0], y: [0, -15, 10, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative text-2xl"
          >
            🛵
          </motion.div>
        </div>
        <div className="text-center text-xs text-gray-500">骑手距你还有 5 分钟</div>
      </div>
    ),
  },
  {
    title: '一键复购',
    description: '喜欢的美食一秒再来一单',
    color: 'from-orange-50 to-white',
    content: (
      <div className="flex flex-col gap-3 p-4 pt-8 h-full">
        <div className="font-bold text-sm">🔄 历史订单</div>
        {[
          { n: '玛格丽特披萨', d: '罗马披萨 • ¥108', t: '2天前' },
          { n: '加州卷', d: '樱花寿司 • ¥128', t: '3天前' },
          { n: '鸡肉卷饼', d: '塔可派对 • ¥96', t: '5天前' },
        ].map((o) => (
          <div key={o.n} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="text-xs font-semibold text-gray-900">{o.n}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{o.d}</div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-gray-400">{o.t}</span>
              <span className="text-xs font-bold text-primary">再来一单</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: '智能通知',
    description: '美食状态随时了如指掌',
    color: 'from-green-50 to-white',
    content: (
      <div className="flex flex-col gap-3 p-4 pt-8 h-full">
        <div className="font-bold text-sm">🔔 订单动态</div>
        {[
          { msg: '商家正在备餐中', time: '刚刚', icon: '👨‍🍳' },
          { msg: '骑手已取餐出发', time: '2分钟前', icon: '🛵' },
          { msg: '马上就到啦！', time: '5分钟前', icon: '📍' },
        ].map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3"
          >
            <span className="text-xl flex-shrink-0">{n.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-gray-900">{n.msg}</div>
              <div className="text-[10px] text-gray-400">{n.time}</div>
            </div>
          </motion.div>
        ))}
      </div>
    ),
  },
]

export default function AppPreview() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-16 lg:py-24 bg-gray-50 overflow-hidden" aria-labelledby="preview-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <h2 id="preview-heading" className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            为吃货打造的
            <br />
            <span className="text-primary">精美 App</span>
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-xl mx-auto">
            滑动查看我们精心设计的界面，感受点餐从未如此简单。
          </p>
        </div>
      </div>

      {/* Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-6 px-4 sm:px-6 lg:px-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        role="list"
        aria-label="App 界面截图"
      >
        {/* Spacer to allow centering first card */}
        <div className="flex-shrink-0 w-4 sm:w-8 lg:hidden" aria-hidden="true" />

        {screens.map((screen, index) => (
          <motion.div
            key={screen.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0 snap-center"
            role="listitem"
          >
            <div className={`w-56 sm:w-64 aspect-[9/16] bg-gradient-to-b ${screen.color} rounded-[2.5rem] p-2.5 shadow-card border border-gray-200/50`}>
              <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl z-10" />
                {screen.content}
              </div>
            </div>
            <div className="text-center mt-4">
              <div className="font-bold text-gray-900 text-sm">{screen.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{screen.description}</div>
            </div>
          </motion.div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-4 sm:w-8 lg:hidden" aria-hidden="true" />
      </div>

      {/* Scroll hint */}
      <div className="flex justify-center mt-6 lg:hidden">
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-gray-400 text-sm flex items-center gap-1"
          aria-hidden="true"
        >
          <span>左右滑动浏览</span>
          <span>→</span>
        </motion.div>
      </div>
    </section>
  )
}
