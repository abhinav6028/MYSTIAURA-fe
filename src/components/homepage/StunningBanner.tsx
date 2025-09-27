import stunningImg from "../../assets/homepage/stunning.jpg";
import { FONT_FAMILY, navigatePath } from "../../utils";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const StunningBanner = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    return (
        <div className="pt-10 relative">
            {/* Image */}
            <img
                src={stunningImg}
                alt="Stunning Jewelry"
                className="w-full object-cover h-64 sm:h-80 md:h-[28rem] lg:h-[28rem]"
            />

            {/* Text Overlay */}
            <div
                className="
          absolute 
          inset-0 
          px-4 sm:px-6 md:px-16 lg:px-20 
          flex flex-col justify-center 
          md:items-start items-center 
          text-center md:text-left
        "
            >
                <h1
                    style={{ fontFamily: FONT_FAMILY }}
                    className="text-2xl w-[60%] sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4"
                >
                    Elevate Your Everyday Look with Stunning Jewelry
                </h1>
                <p className="text-sm w-[60%] sm:text-base md:text-lg lg:text-xl text-white mb-4 max-w-xl">
                    Whether casual or glamorous, our jewelry is designed to add the perfect finishing touch.
                </p>
                <p
                    className="text-sm cursor-pointer text-white flex items-center font-medium"
                    onClick={() => navigate(`${isAuthenticated ? "/": ""}${navigatePath}/inventory`)}
                >
                    VIEW ALL
                    <ArrowUpRight
                        className="ml-2"
                        size={20}
                        strokeWidth={2.75}
                    />
                </p>
            </div>
        </div>
    );
};

export default StunningBanner;
