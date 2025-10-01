import { useEffect, useState } from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer'
import ProductDetailsMain from '../../components/ProductDetailPage/ProductDetailsMain'
import ReviewsAndProducts from '../../components/ProductDetailPage/ReviewsAndProducts'

export default function ProductDetailPage() {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [productCategory, setProductCategory] = useState();

    return (
        <LayoutContainer>
            <ProductDetailsMain setProductCategory={setProductCategory} />
            <ReviewsAndProducts productCategory={productCategory} />
        </LayoutContainer>
    )
}
