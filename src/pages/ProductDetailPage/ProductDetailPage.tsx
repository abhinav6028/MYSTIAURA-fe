import React from 'react'
import LayoutContainer from '../../components/layout/LayoutContainer'
import ProductDetailsMain from '../../components/ProductDetailPage/ProductDetailsMain'
import ReviewsAndProducts from '../../components/ProductDetailPage/ReviewsAndProducts'

export default function ProductDetailPage() {
    return (
        <LayoutContainer>
            <ProductDetailsMain />
            <ReviewsAndProducts />
        </LayoutContainer>
    )
}
