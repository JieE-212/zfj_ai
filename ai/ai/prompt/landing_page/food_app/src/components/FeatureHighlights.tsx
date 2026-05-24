import { motion } from 'framer-motion'

const features = [
  {
    title: '实时订单追踪',
    description:
      '通过 GPS 实时追踪，看着你的订单从餐厅厨房一路送到家门口。每个环节都有推送通知，随时掌握美食动态。',
    image: (
      <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-50 rounded-3xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 aspect-[9/16] bg-white rounded-2xl shadow-card p-4 flex flex-col gap-2">
            <div className="text-xs font-bold text-gray-900">📦 你的订单</div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: '0%' }}
                whileInView={{ width: '68%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              />
            </div>
            <div className="text-xs text-gray-500">骑手距离你还有 8 分钟</div>
            <div className="flex-1 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">🛵</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: '智能推荐',
    description:
      '我们的算法会学习你的口味偏好，推荐你可能会爱上的菜品和餐厅。你用得越多，推荐越精准，总能找到惊喜美味。',
    image: (
      <div className="w-full aspect-[4/3] bg-gradient-to-bl from-primary-200/60 to-primary-50/80 rounded-3xl flex items-center justify-center relative overflow-hidden">
        <div className="w-3/4 aspect-[9/16] bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <div className="text-xs font-bold text-gray-900">✨ 为你推荐</div>
          {[
            { name: '辣味金枪鱼卷', match: '98% 匹配', emoji: '🍣' },
            { name: '玛格丽特披萨', match: '95% 匹配', emoji: '🍕' },
            { name: '巴西莓碗', match: '92% 匹配', emoji: '🥣' },
          ].map((rec, i) => (
            <motion.div
              key={rec.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
              className="flex items-center gap-2 bg-gray-50 rounded-xl p-2"
            >
              <span className="text-xl">{rec.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-900 truncate">{rec.name}</div>
                <div className="text-[10px] text-primary font-medium">{rec.match}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '闪电结账',
    description:
      '历史订单一键复购，支持 Apple Pay 和已保存银行卡，购物车秒变订单。我们优化过的流程让你 15 秒内就能完成支付。',
    image: (
      <div className="w-full aspect-[4/3] bg-gradient-to-tr from-primary-100 to-orange-100/50 rounded-3xl flex items-center justify-center relative overflow-hidden">
        <div className="w-3/4 aspect-[9/16] bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <div className="text-xs font-bold text-gray-900">💳 结算</div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">罗马披萨</span>
              <span className="text-sm font-bold text-gray-900">¥128</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">配送费</span>
              <span className="text-sm font-bold text-primary">免费</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900">合计</span>
              <span className="text-base font-extrabold text-gray-900">¥128</span>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-white text-center py-2.5 rounded-xl text-sm font-bold cursor-pointer"
          >
            提交订单
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    title: '独家本地餐厅',
    description:
      '发现那些别家外卖平台找不到的本地宝藏小店和社区老字号。我们与本地餐饮深度合作，为你带来独家菜品和专属优惠。',
    image: (
      <div className="w-full aspect-[4/3] bg-gradient-to-tl from-primary-200/50 to-primary-50 rounded-3xl flex items-center justify-center relative overflow-hidden">
        <div className="w-3/4 aspect-[9/16] bg-white rounded-2xl shadow-card p-4 flex flex-col gap-2">
          <div className="text-xs font-bold text-gray-900">🏷️ 本地必吃</div>
          <div className="flex gap-2">
            <span className="bg-primary-50 text-primary text-[10px] font-semibold px-2 py-1 rounded-full">高评分</span>
            <span className="bg-green-50 text-green-600 text-[10px] font-semibold px-2 py-1 rounded-full">独家上线</span>
          </div>
          <div className="flex-1 space-y-2">
            {[
              { name: '奶奶家小厨', type: '手工意面', tag: '⭐ 4.9' },
              { name: '老街玉米饼', type: '街头塔可', tag: '⭐ 4.8' },
            ].map((r) => (
              <div key={r.name} className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-xs">🍽️</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-900 truncate">{r.name}</div>
                  <div className="text-[10px] text-gray-500">{r.type}</div>
                </div>
                <span className="text-[10px] font-medium text-gray-700">{r.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
]

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function FeatureHighlights() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-white" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-20">
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            你想要的，
            <br />
            <span className="text-primary">都在 App 里</span>
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-xl mx-auto">
            强大的功能，让外卖点餐变得轻松又愉快。
          </p>
        </div>

        <div className="space-y-20 lg:space-y-28">
          {features.map((feature, index) => {
            const isReversed = index % 2 === 1

            return (
              <div
                key={feature.title}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <motion.div
                  variants={imageVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className={isReversed ? 'lg:col-start-2' : ''}
                >
                  {feature.image}
                </motion.div>

                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className={isReversed ? 'lg:col-start-1' : ''}
                >
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
