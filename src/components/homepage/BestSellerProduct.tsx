import { ArrowUpRight, Heart, MoveUpRight } from "lucide-react";
import bestSeller1 from "../../assets/homepage/bestseller1.png";
import bestSeller2 from "../../assets/homepage/bestseller2 (1).png";
import bestSeller3 from "../../assets/homepage/bestseller2 (2).png";
// import bestSeller4 from "../../assets/homepage/bestseller2 (3).png";
import bestSeller5 from "../../assets/homepage/bestseller2 (4).png";
// import bestSeller6 from "../../assets/homepage/bestseller2 (5).png";
import bestSeller7 from "../../assets/homepage/bestseller2 (6).png";
import bestSeller8 from "../../assets/homepage/bestseller2 (7).png";
import subbanner from "../../assets/homepage/subbanner.png";
import { FONT_FAMILY, PRIMARY_COLOUR } from "../../utils";
import { useNavigate } from "react-router-dom";

const bestSellerData = [
    {
        id: 1, image: bestSeller1, name: "Solitaire Diamond Engagement Ring"
    },
    {
        id: 2, image: bestSeller2, name: "Gold Prestige Intertwined Earrings"
    },
    {
        id: 3, image: bestSeller3, name: "Gold Pigeon Blood Earrings"
    },
    {
        id: 4, image: bestSeller2, name: "Rose Gold Diamond Ring"
    },
    {
        id: 5, image: bestSeller5, name: "Rose Gold Lotus Necklace"
    },
    {
        id: 6, image: bestSeller8, name: "Diamond Engagement Ring"
    },
    {
        id: 7, image: bestSeller7, name: "Prestige Diamond Earrings"
    },
    {
        id: 8, image: bestSeller8, name: "Diamond Pearl Engagement Ring"
    }
]
const BestSellerProduct = () => {

    const navigate = useNavigate()

    // inventory


    return (
        <div className="pb-8">
            {/* Header */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-8 px-4">
                <h1 style={{ fontFamily: FONT_FAMILY }} className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-0">
                    Best Seller Products
                </h1>
                <p
                    onClick={() => navigate('/inventory')}
                    style={{ color: PRIMARY_COLOUR }}
                    className="text-sm sm:text-base cursor-pointer flex items-center hover:underline"
                >
                    VIEW ALL
                    <ArrowUpRight
                        style={{ color: PRIMARY_COLOUR }}
                        className="ml-1"
                        size={20}
                        strokeWidth={2.75}
                    />
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                {bestSellerData?.map((val, index) => (

                    <div
                        key={index}
                        onClick={() => navigate('/productdetailPage')}
                        className="bg-[#f9f9f9] flex flex-col items-center relative cursor-pointer"
                    >
                        {/* Heart Icon for small screens */}
                        <div className="absolute top-2 left-2 sm:hidden w-8 h-8 flex items-center justify-center border-gray-300 bg-white">
                            <Heart size={18} className="text-gray-600" />
                        </div>

                        {/* Image Section */}
                        <div className="w-full h-40 md:h-80 flex justify-center bg-[#f9f9f9] p-4">
                            <img
                                src={val.image}
                                alt="Ring"
                                className="w-full max-w-[200px] h-auto object-contain"
                            />
                        </div>

                        <div className="w-full flex flex-col sm:flex-row items-center px-2 sm:px-4 pb-4 gap-2 sm:gap-2 mt-2 sm:mt-0">
                            <div className="w-12 h-12 items-center justify-center bg-white flex-shrink-0 hidden sm:flex">
                                <Heart size={20} className="text-gray-600" />
                            </div>

                            {/* Add to Cart Button */}
                            <button className="flex-1 bg-[#660033] text-white font-semibold md:py-3 py-2 text-sm sm:text-md hover:bg-[#51052b] transition-colors w-full sm:w-auto">
                                ADD TO CART
                            </button>
                        </div>

                        {/* Title & Price */}
                        <div className="w-full bg-white px-2 sm:px-4">
                            <h2 className="text-sm md:text-lg text-black mb-1">
                                Solitaire Diamond Engagement Ring
                            </h2>

                            <div className="flex items-baseline space-x-3">
                                <span className="text-lg font-semibold text-[#a37557]">$230.00</span>
                                <span className="text-md text-gray-400 line-through">$250.00</span>
                            </div>
                        </div>
                    </div>


                ))}
            </div>

            {/* Sub-banner */}
            <div className="py-10 px-4">
                <img
                    src={subbanner}
                    alt=""
                    className="w-full h-80 md:h-[40rem] object-cover"
                />
            </div>
        </div>
    )
}

export default BestSellerProduct