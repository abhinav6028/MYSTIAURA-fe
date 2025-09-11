import { Button, Typography, FormControl, Select, MenuItem } from "@mui/material";
import  { useState } from "react";
import { Eye, Heart, Plus, Minus } from "lucide-react";
import ring from "../../assets/homepage/bestseller1.png";
import category from "../../assets/homepage/selectcategory.jpg";
import { FONT_FAMILY, PRIMARY_COLOUR } from "../../utils";
import { useNavigate } from "react-router-dom";

const RING_SIZES = Array.from({ length: (8 - 4) / 0.5 + 1 }, (_, i) => 4 + i * 0.5);

const ProductDetailsMain = () => {

    const [stoneShape] = useState("Round");
    const [ringSize, setRingSize] = useState<number>(6.0);
    const navigaet = useNavigate();

    const handleChange = (e: any) => {
        setRingSize(e.target.value as number);
    };

    return (
        <div className="pt-10 px-4 md:px-10 lg:px-10">
            {/* Main grid: images + details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Images */}
                <div>
                    <div className="w-full h-[40rem] mb-3">
                        <img src={ring} alt="" className="bg-gray-100 w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <img src={category} alt="" className="h-full object-cover" />
                        <div className="flex flex-col gap-2">
                            <img src={ring} alt="" className="w-full h-[20rem] object-cover bg-gray-100" />
                            <img src={ring} alt="" className="w-full h-[20rem] object-cover  bg-gray-100" />
                        </div>
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="flex flex-col gap-6">
                    {/* Title & Rating */}
                    <div className="border-b border-gray-300 pb-4">
                        <h1
                            style={{ fontFamily: FONT_FAMILY }}
                            className="text-2xl md:text-3xl lg:text-5xl mb-2 w-[80%]"
                        >
                            Diamond Pearl Engagement Ring
                        </h1>
                        <div className="flex items-center gap-2 text-yellow-500 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i}>★</span>
                            ))}
                            <span style={{ fontFamily: FONT_FAMILY }} className="text-gray-700 text-sm md:text-base">
                                5.0 (1.2k Reviews)
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Typography
                                style={{ fontFamily: FONT_FAMILY }}
                                sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
                                color="primary"
                            >
                                $160.00
                            </Typography>
                            <Typography
                                style={{ fontFamily: FONT_FAMILY }}
                                sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
                                className="line-through text-gray-500"
                            >
                                $170.00
                            </Typography>
                        </div>
                    </div>

                    {/* Stock & View Info */}
                    <div className="flex flex-col gap-2">
                        <span className="flex items-center gap-2 py-2">
                            <Eye size={20} strokeWidth={1} />
                            <p className="text-sm md:text-base">24 People are viewing this right now</p>
                        </span>
                        <p className="text-gray-700">
                            Only <span className="text-red-400 font-semibold">3 items</span> left in stock
                        </p>
                        <span className="block w-full h-1 bg-red-400 rounded-full"></span>
                    </div>

                    {/* Ring Size */}
                    <div className="mt-3 flex flex-col gap-2">
                        <p className="text-gray-700">
                            Selected Center Stone Shape: <span className="font-semibold">{stoneShape}</span>
                        </p>
                        <FormControl fullWidth size="small" sx={{ borderRadius: 0 }}>
                            <Select<number> value={ringSize} onChange={handleChange}>
                                {RING_SIZES.map((size) => (
                                    <MenuItem key={size} value={size}>
                                        {size.toFixed(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {/* Add to Cart & Wishlist */}
                    <div className="grid grid-cols-[20%_70%_10%] gap-1 mt-1 items-center">
                        <span style={{ borderColor: PRIMARY_COLOUR }} className="flex items-center justify-between gap-2 border p-2">
                            <Plus size={20} strokeWidth={0.75} /> 0 <Minus size={20} strokeWidth={0.75} />
                        </span>
                        <Button sx={{ height: "42px", borderRadius: 0, fontFamily: "sans-serif", bgcolor: PRIMARY_COLOUR }}>Add To Cart</Button>
                        <span style={{ borderColor: PRIMARY_COLOUR, color: PRIMARY_COLOUR }} className="border border-gray-300 flex items-center justify-center p-2">
                            <Heart size={25} strokeWidth={0.75} />
                        </span>
                    </div>

                    <Button
                        onClick={() => navigaet('/selectadress')}
                        variant="outlined"
                        sx={{ width: "100%", height: "42px", fontFamily: "sans-serif", borderRadius: 0, borderColor: PRIMARY_COLOUR, color: PRIMARY_COLOUR }}
                    >
                        BUY NOW
                    </Button>

                    {/* Product Info */}
                    <div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <h3 className="text-gray-400">SKU</h3>
                                <p>EG_972917044ZM001</p>
                            </div>
                            <div>
                                <h3 className="text-gray-400">Categories</h3>
                                <p>925 Silver, Accessories, Rings</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-10 py-8 border-b border-b-gray-300">
                            <div>
                                <>S</>
                                {/* <MdOutlinePrivacyTip size={"3rem"} className="pb-2" /> */}
                                <h6>Risk Free Shopping</h6>
                                <p className="text-gray-400">30 Day Returns</p>
                            </div>
                            <div>
                                <>S</>
                                {/* <CiStar size={"3rem"} className="pb-2" /> */}
                                <h6>Lifetime Warranty</h6>
                                <p className="text-gray-400">Complimentary Repairs</p>
                            </div>
                            <div>
                                <p>A</p>
                                {/* <LiaShippingFastSolid size={"3rem"} className="pb-2" /> */}
                                <h6>Free Shipping</h6>
                                <p className="text-gray-400">On Every Order</p>
                            </div>
                        </div>

                        {/* COMPARE */}
                        {/* <div className="flex items-center gap-5 py-5 border-b border-b-gray-300">
                            {compareSection.map((val, index) => {
                                return <div key={index} className="flex items-center gap-3">
                                    <span>{val.image}</span>
                                    <h3>{val.title}</h3>
                                </div>
                            })}
                        </div> */}

                        {/* SHIPPING COUNT */}
                        {/* <div className="py-5 border-b border-b-gray-400">
                            <div className="flex items-center gap-5 pb-2"> */}
                        {/* <LiaShippingFastSolid size={"1.5rem"} className="" /> */}
                        {/* <p>Free worldwide shipping on all order over $200</p> */}
                        {/* </div> */}
                        {/* <div className="flex items-center gap-5"> */}
                        {/* <AiOutlineShopping size={"1.5rem"} className="" /> */}
                        {/* <p className="flex items-center gap-1">Delivers in 2-4 working days <Typography color="primary">Shipping & Return</Typography></p> */}
                        {/* </div> */}
                        {/* </div> */}

                        {/* DESCRIPTION */}
                        <div className="py-3 border-b border-b-gray-400">
                            <h1 style={{ fontFamily: FONT_FAMILY }} className="text-3xl pb-2">DESCRIPTION</h1>
                            <p className="text-gray-500">The Diamond Scattered Stud Earrings are crafted from high-quality gold, featuring a unique pattern of brilliant round diamonds totaling approximately 1.06 carats. Long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                        </div>

                        {/* SHIPPIN,PACKAGING,RETURN */}
                        <div>
                            <div className="flex items-center justify-between py-3">
                                <h3>SHIPPING</h3>
                                {/* <FiPlus size={"1.5rem"} /> */}
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <h3>PACKAGING</h3>
                                {/* <FiPlus size={"1.5rem"} /> */}
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <h3>RETURNS & CANCELLATIONS</h3>
                                {/* <FiPlus size={"1.5rem"} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsMain;
