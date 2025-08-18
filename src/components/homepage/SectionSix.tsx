import LayoutContainer from "../layout/LayoutContainer";
import ringImage from "../../assets/homepage/ring1.jpg";
import { Button } from "@mui/material";
import arrowSvg from "../../assets/homepage/arrow.svg";

const SectionSix = () => {
    return (
        <div className="bg-[#FEF9F2] w-full py-15">
            <LayoutContainer>
                <div className="grid grid-cols-2 items-center">
                    <img src={ringImage} alt="" className="w-full object-cover" />
                    <div className="flex flex-col gap-5 items-start w-[80%] px-15">
                        <h1 className="text-4xl">Jewelry That Tells Your Story in Sparkling Detail</h1>
                        <p className="text-xl">Celebrate life’s special moments with exquisite pieces designed for love, beauty, and elegance. Find the perfect treasure that speaks to your heart.</p>
                        <Button variant="text" sx={{ color: "primary", borderBottom: "1px solid #fff", display: "flex", alignItems: "center", gap: "5px" }}>Show Now <img src={arrowSvg} alt="" /></Button>
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <img src={ringImage} alt="" className="w-full object-cover order-2" />
                    <div className="flex flex-col gap-5 items-start w-[80%] px-15 order-1">
                        <h1 className="text-4xl">Adorn Yourself with Jewelry That Captures Your Essence</h1>
                        <p className="text-xl">Each piece is carefully designed to celebrate your individuality. From delicate details to bold statements, find your perfect match today.</p>
                        <Button variant="text" sx={{ color: "primary", borderBottom: "1px solid #fff", display: "flex", alignItems: "center", gap: "5px" }}>Show Now <img src={arrowSvg} alt="" /></Button>
                    </div>
                </div>
            </LayoutContainer>
        </div>
    )
}

export default SectionSix