document.addEventListener('DOMContentLoaded', function() {
    // ===== AOS 初始化 =====
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // ===== 导航栏滚动效果 =====
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===== 移动端菜单 =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // 点击移动端链接后关闭菜单
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // ===== 平滑滚动 =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Hero Canvas 粒子效果 =====
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 188, 212, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor(canvas.width * canvas.height / 15000), 100);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 188, 212, ${0.15 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    // ===== FAQ 折叠 =====
    document.querySelectorAll('.faq-trigger').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const item = this.parentElement;
            const content = item.querySelector('.faq-content');
            const isActive = item.classList.contains('active');

            // 关闭所有其他项
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-content').classList.add('hidden');
                }
            });

            // 切换当前项
            if (isActive) {
                item.classList.remove('active');
                content.classList.add('hidden');
            } else {
                item.classList.add('active');
                content.classList.remove('hidden');
            }
        });
    });

    // ===== 课程详情模态框 =====
    const courseModal = document.getElementById('course-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    const courseDetails = {
        frontend: {
            title: '前端开发进阶',
            content: `
                <div class="space-y-4">
                    <p class="text-gray-400">从零基础到高级前端工程师的完整学习路径，涵盖现代前端开发的核心技术栈。</p>
                    <h4 class="font-bold text-lg mt-4">课程大纲</h4>
                    <ul class="list-disc list-inside text-gray-400 space-y-2">
                        <li>HTML5 / CSS3 基础与进阶</li>
                        <li>JavaScript ES6+ 核心语法</li>
                        <li>React 框架深入与 Hooks</li>
                        <li>Vue 3 组合式 API</li>
                        <li>TypeScript 类型系统</li>
                        <li>前端工程化与性能优化</li>
                        <li>3个企业级实战项目</li>
                    </ul>
                    <div class="flex items-center justify-between mt-6 p-4 bg-slate-700/50 rounded-lg">
                        <span class="text-gray-400">学习周期</span>
                        <span class="font-bold text-brand-400">16 周</span>
                    </div>
                </div>
            `
        },
        backend: {
            title: '后端开发实战',
            content: `
                <div class="space-y-4">
                    <p class="text-gray-400">掌握企业级后端开发技术，构建高并发、高可用的服务端系统。</p>
                    <h4 class="font-bold text-lg mt-4">课程大纲</h4>
                    <ul class="list-disc list-inside text-gray-400 space-y-2">
                        <li>Java 核心语法与面向对象</li>
                        <li>Spring Boot 框架实战</li>
                        <li>MySQL 数据库设计与优化</li>
                        <li>Redis 缓存与高并发</li>
                        <li>消息队列与分布式系统</li>
                        <li>微服务架构与 Docker 部署</li>
                        <li>2个大型后端项目实战</li>
                    </ul>
                    <div class="flex items-center justify-between mt-6 p-4 bg-slate-700/50 rounded-lg">
                        <span class="text-gray-400">学习周期</span>
                        <span class="font-bold text-brand-400">20 周</span>
                    </div>
                </div>
            `
        },
        fullstack: {
            title: '全栈工程师',
            content: `
                <div class="space-y-4">
                    <p class="text-gray-400">前后端技术全面掌握，成为独当一面的全栈开发工程师。</p>
                    <h4 class="font-bold text-lg mt-4">课程大纲</h4>
                    <ul class="list-disc list-inside text-gray-400 space-y-2">
                        <li>前端技术栈（React + TypeScript）</li>
                        <li>Node.js 服务端开发</li>
                        <li>GraphQL API 设计</li>
                        <li>MongoDB 与 PostgreSQL</li>
                        <li>Docker 与 Kubernetes</li>
                        <li>CI/CD 自动化部署</li>
                        <li>4个全栈项目实战</li>
                    </ul>
                    <div class="flex items-center justify-between mt-6 p-4 bg-slate-700/50 rounded-lg">
                        <span class="text-gray-400">学习周期</span>
                        <span class="font-bold text-brand-400">24 周</span>
                    </div>
                </div>
            `
        },
        ai: {
            title: 'AI 与数据分析',
            content: `
                <div class="space-y-4">
                    <p class="text-gray-400">掌握 Python 数据分析与机器学习，抢跑 AI 时代。</p>
                    <h4 class="font-bold text-lg mt-4">课程大纲</h4>
                    <ul class="list-disc list-inside text-gray-400 space-y-2">
                        <li>Python 编程基础</li>
                        <li>NumPy / Pandas 数据处理</li>
                        <li>数据可视化与统计分析</li>
                        <li>机器学习算法原理</li>
                        <li>PyTorch 深度学习框架</li>
                        <li>大语言模型应用开发</li>
                        <li>3个 AI 项目实战</li>
                    </ul>
                    <div class="flex items-center justify-between mt-6 p-4 bg-slate-700/50 rounded-lg">
                        <span class="text-gray-400">学习周期</span>
                        <span class="font-bold text-brand-400">18 周</span>
                    </div>
                </div>
            `
        },
        mobile: {
            title: '移动端开发',
            content: `
                <div class="space-y-4">
                    <p class="text-gray-400">掌握跨平台移动开发技术，一套代码覆盖 iOS 和 Android。</p>
                    <h4 class="font-bold text-lg mt-4">课程大纲</h4>
                    <ul class="list-disc list-inside text-gray-400 space-y-2">
                        <li>Dart 语言基础</li>
                        <li>Flutter UI 开发</li>
                        <li>状态管理与路由</li>
                        <li>原生功能调用</li>
                        <li>React Native 进阶</li>
                        <li>App 上架与性能优化</li>
                        <li>2个完整 App 项目</li>
                    </ul>
                    <div class="flex items-center justify-between mt-6 p-4 bg-slate-700/50 rounded-lg">
                        <span class="text-gray-400">学习周期</span>
                        <span class="font-bold text-brand-400">16 周</span>
                    </div>
                </div>
            `
        },
        security: {
            title: '网络安全攻防',
            content: `
                <div class="space-y-4">
                    <p class="text-gray-400">系统学习网络安全技术，成为企业安全防线的守护者。</p>
                    <h4 class="font-bold text-lg mt-4">课程大纲</h4>
                    <ul class="list-disc list-inside text-gray-400 space-y-2">
                        <li>网络协议与操作系统基础</li>
                        <li>Kali Linux 渗透测试</li>
                        <li>Web 安全漏洞挖掘</li>
                        <li>密码学与加密技术</li>
                        <li>逆向工程与漏洞分析</li>
                        <li>安全运维与应急响应</li>
                        <li>CTF 竞赛实战训练</li>
                    </ul>
                    <div class="flex items-center justify-between mt-6 p-4 bg-slate-700/50 rounded-lg">
                        <span class="text-gray-400">学习周期</span>
                        <span class="font-bold text-brand-400">20 周</span>
                    </div>
                </div>
            `
        }
    };

    document.querySelectorAll('.course-detail-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseKey = this.getAttribute('data-course');
            const detail = courseDetails[courseKey];

            if (detail) {
                modalTitle.textContent = detail.title;
                modalBody.innerHTML = detail.content;
                courseModal.classList.remove('hidden');
                setTimeout(() => courseModal.classList.add('show'), 10);
            }
        });
    });

    function closeModal() {
        courseModal.classList.remove('show');
        setTimeout(() => courseModal.classList.add('hidden'), 300);
    }

    modalClose.addEventListener('click', closeModal);
    courseModal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // ===== 联系表单 =====
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // 模拟提交成功
        contactForm.reset();
        formSuccess.classList.remove('hidden');

        setTimeout(() => {
            formSuccess.classList.add('hidden');
        }, 5000);
    });

    // ===== 页面可见性变化时暂停/恢复动画 =====
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
});
