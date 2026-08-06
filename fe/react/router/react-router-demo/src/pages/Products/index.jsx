import {
  Link,
  Outlet // 二级路由的出口
} from 'react-router-dom'

function Products() {
  return (
    <div>
      <h2>商品列表</h2>
      <ul>
        <li><Link to="1">商品 1</Link></li>
        <li><Link to="2">商品 2</Link></li>
        <li><Link to="3">商品 3</Link></li>
      </ul>
      {/* 子路由出口 */}
      <Outlet />
    </div>
  )
}

export default Products