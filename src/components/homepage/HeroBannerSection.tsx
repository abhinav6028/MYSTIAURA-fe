import { Button } from "@mui/material";
import homepageBanner from "../../assets/homepage/herobanner-hp.jpg";
import arrowSvg from "../../assets/homepage/arrow.svg";

const HeroBannerSection = () => {
    return (
        <div style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${homepageBanner})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }}
            className="h-[30rem] md:h-[40rem] lg:h-[50rem] text-white relative">
            <div className="absolute bottom-20 left-5 lg:left-20">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl max-w-[60%] mb-5">Unveiling the Beauty of Fine Jewelry</h1>
                <p className="text-xl mb-5">Handpicked gemstones and intricate designs for a lifetime of luxury.</p>
                <Button variant="text" sx={{ color: "#fff", display: "flex", alignItems: "center", gap: "5px" }}>Show Now <img src={arrowSvg} alt="" /></Button>
            </div>
            <div className="hidden lg:block lg:absolute right-20 top-90">
                <div className="flex flex-col max-w-[20rem] gap-5 relative">
                    <h1 className="text-5xl">New Bracelets</h1>
                    <div className="flex">
                        <span className="absolute left-[-100px] bottom-16 w-4 h-4 rounded-full bg-white"></span>
                        <span className="absolute right-8 top-1/2 w-[120%] h-0.5 bg-white ml-auto"></span>
                    </div>
                    <p className="text-xl">Discover handcrafted bracelets that complement your unique charm.</p>
                </div>
            </div>
        </div>
    )
}

export default HeroBannerSection