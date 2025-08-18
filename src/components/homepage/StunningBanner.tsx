import { Button } from "@mui/material";
import stunningImg from "../../assets/homepage/stunning.jpg";
import arrowSvg from "../../assets/homepage/arrow.svg";

const StunningBanner = () => {
    return (
        <div className="pt-10">
            <h1 className="text-3xl mb-5">StunningBanner</h1>
            <div className="relative">
                <img src={stunningImg} alt="" className="max-h-[40rem] object-cover w-full" />
                <div className="absolute left-20 bottom-30 w-[35%] text-white">
                    <h1 className="text-4xl mb-5">Elevate Your Everyday Look with Stunning Jewelry</h1>
                    <p className="text-xl mb-10">Whether casual or glamorous, our jewelry is designed to add the perfect finishing touch.</p>
                    <Button variant="text" sx={{ color: "primary", borderBottom: "1px solid #fff", display: "flex", alignItems: "center", gap: "5px" }}>Show Now <img src={arrowSvg} alt="" /></Button>
                </div>
            </div>
        </div>
    )
}

export default StunningBanner