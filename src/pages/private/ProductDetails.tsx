import LayoutContainer from "../../components/layout/LayoutContainer"
import ProductDetailsMain from "../../components/productDetails/ProductDetailsMain"
import ReviewsAndProducts from "../../components/productDetails/ReviewComponent"

const ProductDetails = () => {
  return (
    <LayoutContainer>
        <ProductDetailsMain />
        <ReviewsAndProducts />
    </LayoutContainer>
  )
}

export default ProductDetails