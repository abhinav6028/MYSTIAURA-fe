import BestSellerProduct from "../../components/homepage/BestSellerProduct";
import GetInspired from "../../components/homepage/GetInspired";
// import HeroBannerSection from "../../components/homepage/HeroBannerSection"
// import SectionSix from "../../components/homepage/SectionSix";
import ShopByCategory from "../../components/homepage/ShopByCategory";
import StunningBanner from "../../components/homepage/StunningBanner";
import Testimonial from "../../components/homepage/Testimonial";
import LayoutContainer from "../../components/layout/LayoutContainer"

const HomePage = () => {
    
    return (
        <div>
            <LayoutContainer>
                {/* <HeroBannerSection /> */}
                <ShopByCategory />
                {/* <ShopByShape /> */}
                <BestSellerProduct />
            </LayoutContainer>
            {/* <SectionSix /> */}
            <LayoutContainer>
                {/* <PopularProducts /> */}
                <StunningBanner />
            </LayoutContainer>
            <Testimonial />
            <LayoutContainer>
                <GetInspired />
            </LayoutContainer>
        </div>
    )
}

export default HomePage;
