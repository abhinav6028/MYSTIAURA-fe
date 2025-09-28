import { useEffect } from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer'
import ProductDetailsMain from '../../components/ProductDetailPage/ProductDetailsMain'
import ReviewsAndProducts from '../../components/ProductDetailPage/ReviewsAndProducts'

export default function ProductDetailPage() {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, []);

    return (
        <LayoutContainer>
            <ProductDetailsMain />
            <ReviewsAndProducts />
        </LayoutContainer>
    )
}
