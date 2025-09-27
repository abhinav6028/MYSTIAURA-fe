import LayoutContainer from "../layout/LayoutContainer";
import { FONT_FAMILY, PRIMARY_COLOUR } from "../../utils";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SectionSix = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-[#FEF9F2] w-full py-10 sm:py-16">
            <LayoutContainer>
                {/* First Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center mb-0 order-2 lg:order-1">
                    {/* Image */}
                    <img
                        src="https://plus.unsplash.com/premium_photo-1671641737519-841d15b5211f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmFuZ2xlc3xlbnwwfHwwfHx8MA%3D%3D"
                        alt="Jewelry"
                        className="w-full object-cover shadow-md h-64 sm:h-80 md:h-96 lg:h-[40rem]"
                    />

                    {/* Text */}
                    <div className="flex flex-col gap-4 sm:gap-6 items-start w-full sm:w-[90%] px-4 sm:px-6 lg:px-0">
                        <div className="flex flex-col gap-4 sm:gap-6 items-start w-full sm:w-[90%] sm:px-6 lg:px-0 mr-2 sm:ml:2 md:ml-5 my-5 md:my-0">
                            <h1
                                style={{ fontFamily: FONT_FAMILY }}
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl "
                            >
                                Adorn Yourself with Jewelry That Captures Your Essence
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-gray-700">
                                Each piece is carefully designed to celebrate your individuality. From delicate details to bold statements, find your perfect match today.
                            </p>
                            <p style={{ color: PRIMARY_COLOUR }} className="text-base sm:text-lg cursor-pointer flex items-center text-primary"
                                onClick={() => navigate('/user/inventory')}
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
                    </div>
                </div>

                {/* Second Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center order-1 lg:order-2 ">

                    <div className="flex flex-col gap-4 sm:gap-6 items-start w-full sm:w-[90%] px-4 sm:px-6 lg:px-0 mr-2 sm:mr:2 md:mr-5 order-2 lg:order-1  md:ml-5 my-5 md:my-0">
                        <h1
                            style={{ fontFamily: FONT_FAMILY }}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                        >
                            Adorn Yourself with Jewelry That Captures Your Essence
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-700">
                            Each piece is carefully designed to celebrate your individuality. From delicate details to bold statements, find your perfect match today.
                        </p>
                        <p style={{ color: PRIMARY_COLOUR }} className="text-base sm:text-lg cursor-pointer flex items-center text-primary"
                            onClick={() => navigate('/user/inventory')}
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

                    <img
                        src="https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmluZ3xlbnwwfHwwfHx8MA%3D%3D"
                        alt="Jewelry"
                        className="w-full object-cover shadow-md h-64 sm:h-80 md:h-96 lg:h-[40rem] order-1 lg:order-2"
                    />
                </div>
            </LayoutContainer >
        </div >
    );
};

export default SectionSix;
