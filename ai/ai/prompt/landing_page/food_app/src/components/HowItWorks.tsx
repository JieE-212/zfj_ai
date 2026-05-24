import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: '浏览餐厅',
    description:
      '探索 500+ 精选本地餐厅，浏览高清美食图片、真实评分和预计送达时间，轻松找到你想吃的。',
  },
  {
    number: '02',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: '秒速下单',
    description:
      '选择心仪的美味，自定义口味偏好，用已保存的支付方式快速结账。历史订单支持一键复购，方便到不行。',
  },
  {
    number: '03',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: '飞速配送',
    description:
      '实时追踪你的订单，看看骑手小哥一步步把热乎的美食送过来，通常在 30 分钟内就能大快朵颐。',
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const child = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-gray-50" aria-labelledby="how-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-20">
          <motion.h2
            id="how-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900"
          >
            三步搞定美味
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-gray-500 text-lg max-w-xl mx-auto"
          >
            只需简单三步，你爱的美食马上出发。
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-6 lg:gap-10"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={child}
              className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-soft hover:shadow-card transition-shadow duration-300"
            >
              <span className="absolute top-4 right-6 text-5xl font-extrabold text-gray-100 select-none" aria-hidden="true">
                {step.number}
              </span>
              <div className="relative">
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary mb-5">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
