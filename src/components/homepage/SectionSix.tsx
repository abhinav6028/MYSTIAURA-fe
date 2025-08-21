import LayoutContainer from "../layout/LayoutContainer";
import ringImage from "../../assets/homepage/ring1.jpg";
import { Button } from "@mui/material";
import arrowSvg from "../../assets/homepage/arrow.svg";
import { MdArrowOutward } from "react-icons/md";


const SectionSix = () => {
    return (
        <div className="bg-[#FEF9F2] w-full py-15">
            <LayoutContainer>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <img src={ringImage} alt="" className="w-full object-cover" />
                    <div className="flex flex-col gap-5 items-start w-full md:w-[80%] px-5 md:px-15 pb-5 md:pb-0">
                        <h1 className="text-2xl md:text-4xl py-5 md:py-0">Jewelry That Tells Your Story in Sparkling Detail</h1>
                        <p className="text-xl">Celebrate life’s special moments with exquisite pieces designed for love, beauty, and elegance. Find the perfect treasure that speaks to your heart.</p>
                        <Button variant="text" sx={{ color: "primary", borderBottom: "1px solid #fff", display: "flex", alignItems: "center", gap: "10px" }}>Show Now <MdArrowOutward size={"1rem"}/></Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <img src={ringImage} alt="" className="w-full object-cover order-1 md:order-2" />
                    <div className="flex flex-col gap-5 items-start w-full md:w-[80%] px-5 md:px-15 order-2 md:order-1">
                        <h1 className="text-2xl md:text-4xl">Adorn Yourself with Jewelry That Captures Your Essence</h1>
                        <p className="text-xl">Each piece is carefully designed to celebrate your individuality. From delicate details to bold statements, find your perfect match today.</p>
                        <Button variant="text" sx={{ color: "primary", borderBottom: "1px solid #fff", display: "flex", alignItems: "center", gap: "5px" }}>Show Now <img src={arrowSvg} alt="" /></Button>
                    </div>
                </div>
            </LayoutContainer>
        </div>
    )
}

export default SectionSix