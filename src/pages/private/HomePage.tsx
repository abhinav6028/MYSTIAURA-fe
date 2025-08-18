import BestSellerProduct from "../../components/homepage/BestSellerProduct";
import HeroBannerSection from "../../components/homepage/HeroBannerSection"
import ShopByCategory from "../../components/homepage/ShopByCategory";
import ShopByShape from "../../components/homepage/ShopByShape";
import LayoutContainer from "../../components/layout/LayoutContainer"

const HomePage = () => {
    return (
        <LayoutContainer>
            <HeroBannerSection />
            <ShopByCategory />
            <ShopByShape />
            <BestSellerProduct />
        </LayoutContainer>
    )
}

export default HomePage;