import { motion } from 'framer-motion'

const partnerLogos = [
  { name: '罗马披萨', initials: '罗' },
  { name: '樱花寿司', initials: '樱' },
  { name: '绿碗轻食', initials: '绿' },
  { name: '塔可派对', initials: '塔' },
  { name: '面馆故事', initials: '面' },
  { name: '汉堡实验室', initials: '堡' },
]

const testimonials = [
  {
    name: '张雨欣',
    avatar: '张',
    role: '忠实用户',
    quote:
      'Foodiez 彻底改变了我的点餐方式。实时追踪功能太棒了 —— 我随时都知道我的晚餐几点到。',
    rating: 5,
  },
  {
    name: '陈浩宇',
    avatar: '陈',
    role: '美食爱好者',
    quote:
      '我超爱它的智能推荐！发现了好多之前根本不知道的宝藏本地餐厅，每家都赞。',
    rating: 5,
  },
  {
    name: '王思琪',
    avatar: '王',
    role: '职场白领',
    quote:
      '闪电结账帮我省了不知道多少时间。从浏览到下单不到 60 秒，强烈推荐给每个忙碌的人。',
    rating: 5,
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function SocialProof() {
  return (
    <section id="social-proof" className="py-16 lg:py-24 bg-white" aria-labelledby="social-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partner Logos */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            顶级本地餐厅信赖之选
          </p>
          <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-4 max-w-3xl mx-auto">
            {partnerLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center h-16 bg-gray-50 rounded-2xl border border-gray-100"
                title={logo.name}
              >
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{logo.initials}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center"
        >
          <h2 id="social-heading" className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            吃货们的真爱之选
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-xl mx-auto">
            加入成千上万的快乐用户，每天享用他们最爱的美食送到家门口。
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={item}
                className="bg-white border border-gray-100 rounded-3xl p-6 lg:p-8 shadow-soft hover:shadow-card transition-shadow duration-300 text-left"
              >
                <div className="flex items-center gap-1 mb-4" aria-label={`${t.rating} 星好评（满分 5 星）`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#FFB347" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.284-3.957z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-600 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{t.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
