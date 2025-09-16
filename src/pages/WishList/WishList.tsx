
import ProductGrid from '../../components/inventory/ProductGrid'
import LayoutContainer from '../../components/layout/LayoutContainer'
import { FONT_FAMILY } from '../../utils'

export default function WishList() {
    return (
        <LayoutContainer>
            {/* <h1 style={{ fontFamily: FONT_FAMILY }} className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-0">
                Best Seller Products
            </h1> */}
            <ProductGrid />
        </LayoutContainer>
    )
}
