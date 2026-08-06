import { useParams } from 'react-router-dom'

function ProductDetail() {
  const { productId } = useParams()
  return (
    <div>
      <h2>商品详情</h2>
      <p>商品 ID: {productId}</p>
    </div>
  )
}

export default ProductDetail