import {
  // location.hash
  // 前端路由有两种形式， HashRouter  老的,  BrowserRouter  新的 html5 history
  BrowserRouter as Router, // 前端路由 #/ hashchange
  Route, // 路由配置项
  Routes, // 路由配置数组 都是组件
  Navigate, // 重定向
} from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navigation from './components/Navigation'
// SPA, 动态的切换多个页面
// 下载，执行 影响首页加载速度
// 只需要加载当前页面就好，路由懒加载
// import Home from './pages/Home'
// import About from './pages/About'
// import 函数
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const NewProduct = lazy(() => import('./pages/NewProduct'))
const Login = lazy(() => import('./pages/Login'))
const Pay = lazy(() => import('./pages/Pay'))
const ProtectRoute = lazy(() => import('./ProtectRoute'))



const App = () => {
  return (
    <>
      {/* 前端路由接管一切 */}
      <Router>
        <Suspense fallback={<div>加载中...</div>}>
          {/* 导航栏组件 */}
          <Navigation />
          <div id="container">
            {/* 动态页面切换部分 既是配置，又是出现的地方 */}
            <Routes>
              {/* 有且只有一个Route 显示 当前location.hash 对应页面级别的组件 */}
              <Route path="/" element={<Home />} ></Route>
              <Route path="/about" element={<About />} ></Route>
              <Route path="/user/:id" element={<UserProfile />} ></Route>
              {/* 多级路由，嵌套路由 */}
              <Route path="/products/*" element={<Products />} >
                <Route path=":productId" element={<ProductDetail />} ></Route>
                <Route path=":new" element={<NewProduct />} >
                </Route>
              </Route>
              {/* 有个活动/game 100wan   /result 活动结束了 
               /home 首页， 重定向到 / 
               /user/:id  登录？ 送到 /login  登录后送回 */}
              <Route path="old-path" element={
                <Navigate to="/new-path" replace />
              }></Route>
              <Route path="/login" element={<Login />} ></Route>
              <Route path="/pay" element={
                // 门禁保安
                // Pay 要进的房间
                // children 用来定制化组件
                <ProtectRoute>
                  {/* children */}
                  <Pay />
                </ProtectRoute>
              } ></Route>
              {/* 贪婪匹配所有， 最后404 兜底 */}
              <Route path="*" element={<NotFound />} ></Route>
            </Routes>
          </div>
        </Suspense>
      </Router >
    </>
  )
}

export default App
