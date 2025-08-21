import { Button, Typography } from "@mui/material"
import ring from "../../assets/homepage/bestseller1.png"
import category from "../../assets/homepage/selectcategory.jpg"
import { FiEye } from "react-icons/fi";
import React, { useState } from "react";
import diamond from "../../assets/homepage/diamond.jpg";
import { FormControl, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import { CiHeart } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdCompareArrows } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RiShareBoxFill } from "react-icons/ri";
import { AiOutlineShopping } from "react-icons/ai";

const RING_SIZES = Array.from({ length: (8 - 4) / 0.5 + 1 }, (_, i) => 4 + i * 0.5);

const compareSection = [
    { image: <MdCompareArrows size={25} />, title: "COMPARE" },
    { image: <HiOutlineMail size={25} />, title: "CONTACT US" },
    { image: <MdOutlineShoppingBag size={25} />, title: "SHIPPING INFO" },
    { image: <RiShareBoxFill size={25} />, title: "SHARE" },
]


const ProductDetailsMain = () => {
    const [stoneShape] = useState("Round");
    const [ringSize, setRingSize] = React.useState<number>(6.0);

    const handleChange = (e: SelectChangeEvent<number>) => {
        setRingSize(e.target.value as number);
    };

    return (
        <div className="py-10">
            <h1 className="text-3xl">Product Details</h1>
            <div className="grid grid-cols-2 gap-4">
                {/* image container */}
                <div>
                    <div className="w-full h-[47rem] mb-3">
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

                {/* Product Details */}
                <div className="px-4">
                    <div className="border-b border-b-gray-300">
                        <h1 className="text-5xl w-[65%] mb-3">Diamond Pearl Engagement Ring</h1>
                        <div className="flex space-x-1 text-xl mb-2">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                                <span key={starIndex} className=" text-yellow-500">★</span>
                            ))}
                            <span>5.0 (1.2k Reviews)</span>
                        </div>
                        <div className="flex justify-start gap-2 mb-3">
                            <Typography color="primary" sx={{ fontSize: "24px" }}>
                                $160.00
                            </Typography>
                            <Typography className="line-through text-gray-500" sx={{ fontSize: "24px" }}>$170.00</Typography>
                        </div>
                    </div>
                    <div>
                        <span className="flex items-center gap-4 py-3">
                            <FiEye />
                            <p>24 People are viewing this right now</p>
                        </span>
                        <p>Only <span className="text-red-400 pb-2">3 items</span> left in stock</p>
                        <span className="inline-block w-full h-1 bg-red-400"></span>
                    </div>

                    {/* ring size */}
                    <div>
                        <p className="text-gray-800">Selected Center Stone Shape: <span className="pl-2 text-black">{stoneShape}</span></p>
                        <div className="flex gap-2 items-center py-4">
                            <img src={diamond} alt="" className="w-25 h-25" />
                            <img src={diamond} alt="" className="w-25 h-25" />
                            <img src={diamond} alt="" className="w-25 h-25" />
                            <img src={diamond} alt="" className="w-25 h-25" />
                            <img src={diamond} alt="" className="w-25 h-25" />
                            <img src={diamond} alt="" className="w-25 h-25" />
                            <img src={diamond} alt="" className="w-25 h-25" />
                        </div>
                        <span className="pb-2 inline-block">Ring Size</span>
                        <FormControl fullWidth>
                            <FormControl fullWidth>
                                <Select<number>
                                    id="ring-size"
                                    value={ringSize}
                                    onChange={handleChange}
                                    displayEmpty   // 👈 shows placeholder if needed
                                >
                                    {RING_SIZES.map((size) => (
                                        <MenuItem key={size} value={size}>
                                            {size.toFixed(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </FormControl>

                        <div className="grid grid-cols-[20%_70%_5%] gap-2 pt-5 items-center justify-between">
                            <span className="flex items-center justify-between gap-5 border border-gray-300 p-2"><FiMinus />0<FiPlus /></span>
                            <Button variant="contained" sx={{ height: "42px" }}>Add Cart</Button>
                            <span className="border border-gray-300 flex items-center justify-center p-1"><CiHeart fontSize={"2rem"} /></span>
                        </div>
                        <Button variant="outlined" sx={{ width: "100%", marginY: "1.5rem", height: "42px" }}>BUY NOW</Button>
                    </div>

                    {/* section 4 */}
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
                                <MdOutlinePrivacyTip size={"3rem"} className="pb-2" />
                                <h6>Risk Free Shopping</h6>
                                <p className="text-gray-400">30 Day Returns</p>
                            </div>
                            <div>
                                <CiStar size={"3rem"} className="pb-2" />
                                <h6>Lifetime Warranty</h6>
                                <p className="text-gray-400">Complimentary Repairs</p>
                            </div>
                            <div>
                                <LiaShippingFastSolid size={"3rem"} className="pb-2" />
                                <h6>Free Shipping</h6>
                                <p className="text-gray-400">On Every Order</p>
                            </div>
                        </div>

                        {/* COMPARE */}
                        <div className="flex items-center gap-5 py-5 border-b border-b-gray-300">
                            {compareSection.map((val, index) => {
                                return <div key={index} className="flex items-center gap-3">
                                    <span>{val.image}</span>
                                    <h3>{val.title}</h3>
                                </div>
                            })}
                        </div>

                        {/* SHIPPING COUNT */}
                        <div className="py-5 border-b border-b-gray-400">
                            <div className="flex items-center gap-5 pb-2">
                                <LiaShippingFastSolid size={"1.5rem"} className="" />
                                <p>Free worldwide shipping on all order over $200</p>
                            </div>
                            <div className="flex items-center gap-5">
                                <AiOutlineShopping size={"1.5rem"} className="" />
                                <p className="flex items-center gap-1">Delivers in 2-4 working days <Typography color="primary">Shipping & Return</Typography></p>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="py-3 border-b border-b-gray-400">
                            <h1 className="text-3xl pb-2">DESCRIPTION</h1>
                            <p className="text-gray-500">The Diamond Scattered Stud Earrings are crafted from high-quality gold, featuring a unique pattern of brilliant round diamonds totaling approximately 1.06 carats. Long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                        </div>

                        {/* SHIPPIN,PACKAGING,RETURN */}
                        <div>
                            <div className="flex items-center justify-between py-3">
                                <h3>SHIPPING</h3>
                                <FiPlus size={"1.5rem"}/>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <h3>PACKAGING</h3>
                                <FiPlus size={"1.5rem"}/>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <h3>RETURNS & CANCELLATIONS</h3>
                                <FiPlus size={"1.5rem"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsMain