const footerLinks = {
  公司信息: ['关于我们', '加入团队', '博客', '媒体报道'],
  合作伙伴: ['餐厅入驻', '骑手招募', '合作门户', 'API 接口'],
  帮助支持: ['帮助中心', '联系我们', '安全须知', '无障碍支持'],
}

const socialIcons = [
  {
    label: 'Twitter',
    path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
  },
  {
    label: 'Instagram',
    path: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m.2 2A3.6 3.6 0 0 0 4.4 8v8C4.4 18 6 19.6 8 19.6h8a3.6 3.6 0 0 0 3.6-3.6V8c0-2-1.6-3.6-3.6-3.6H8m9.65 1.5a1.25 1.25 0 0 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  },
  {
    label: 'Facebook',
    path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="#" className="text-2xl font-extrabold text-primary tracking-tight" aria-label="Foodiez 首页">
              Foodiez
            </a>
            <p className="mt-3 text-gray-500 text-sm leading-relaxed max-w-sm">
              你爱的美食，闪电送达。浏览数百家本地餐厅，新鲜美味 30 分钟内送到手中。
            </p>
            {/* App store buttons */}
            <div className="mt-5 flex flex-col sm:flex-row gap-2">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-xl text-xs transition-colors"
                aria-label="从 App Store 下载"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-xl text-xs transition-colors"
                aria-label="从 Google Play 下载"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302L14.5 17.31l-4.511-4.511L14.5 8.288l2.3 2.301-2.301 2.302v.816zm3.164-5.238L14.5 4.674l-2.302 2.301L9.896 4.674l4.395-4.395a1 1 0 0 1 1.214-.106l3.284 2.182a1 1 0 0 1 .344 1.366l-3.464 5.196-2.501-2.501 3.287-3.287zM14.207 12l2.302 2.302-2.5 2.5-3.287-3.287L14.5 9.732l-2.5-2.5L17.663 2.9a1 1 0 0 1 1.366.344l3.464 5.196a1 1 0 0 1-.106 1.214L14.207 12z" />
                </svg>
                Google Play
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-semibold text-gray-900 text-sm mb-3">{heading}</h3>
              <ul className="space-y-2" role="list">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Foodiez. 保留所有权利。
          </p>

          <div className="flex items-center gap-4">
            {socialIcons.map((icon) => (
              <a
                key={icon.label}
                href="#"
                className="w-9 h-9 rounded-full bg-gray-200 hover:bg-primary hover:text-white text-gray-600 flex items-center justify-center transition-all duration-200"
                aria-label={icon.label}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={icon.path} />
                </svg>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
              服务条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
