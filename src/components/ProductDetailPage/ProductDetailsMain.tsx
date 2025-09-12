import { Button, Typography } from "@mui/material";
// import { Button, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { Heart, Plus, Minus } from "lucide-react";
import { finalPrice, FONT_FAMILY, PRIMARY_COLOUR } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";
import { useProductWithId } from "../../services/api/product/product";
import { RatingStars } from "../../utilsComp/RatingsComp";
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiStar } from "react-icons/ci";
import { MdOutlinePrivacyTip } from "react-icons/md";
const fallback = "../assets/fallback.png";

// const RING_SIZES = Array.from({ length: (8 - 4) / 0.5 + 1 }, (_, i) => 4 + i * 0.5);

const ProductDetailsMain = () => {

    // const [stoneShape] = useState("Round");
    // const [ringSize, setRingSize] = useState<number>(6.0);
    const [quantity, setQuantity] = useState<number>(1);
    const navigaet = useNavigate();
    const { id } = useParams();

    const { data: singleProduct } = useProductWithId(id as string);
    console.log(singleProduct);

    // const handleChange = (e: any) => {
    //     setRingSize(e.target.value as number);
    // };

    return (
        <div className="pt-10">
            {/* Main grid: images + details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Images */}
                <div>
                    <div className="w-full h-[40rem] mb-3">
                        <img
                            src={singleProduct?.images?.[0]?.secure_url || fallback}
                            alt={singleProduct?.name ?? "product image"}
                            className="bg-gray-100 w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <img src={singleProduct?.images?.[0]?.secure_url || fallback} alt="" className="h-full object-cover" />
                        <div className="flex flex-col gap-2">
                            <img src={singleProduct?.images?.[0]?.secure_url || fallback} alt="" className="w-full h-[20rem] object-cover bg-gray-100" />
                            <img src={singleProduct?.images?.[0]?.secure_url || fallback} alt="" className="w-full h-[20rem] object-cover  bg-gray-100" />
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
                            {singleProduct?.name}
                        </h1>
                        <div className="flex items-center gap-2 text-yellow-500 mb-2">
                            <RatingStars rating={singleProduct?.ratings?.average || 0} count={singleProduct?.ratings?.count || 0} />
                        </div>
                        <div className="flex items-center gap-4">
                            <Typography
                                style={{ fontFamily: FONT_FAMILY }}
                                sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
                                color="primary"
                            >
                                ₹ {finalPrice(singleProduct?.price || 0, singleProduct?.discountPrice || 0).toFixed(2)}
                            </Typography>
                            <Typography
                                style={{ fontFamily: FONT_FAMILY }}
                                sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
                                className="line-through text-gray-500"
                            >
                                ₹ {singleProduct?.price.toFixed(2)}
                            </Typography>
                        </div>
                    </div>

                    {/* Stock & View Info */}
                    {
                        (singleProduct?.stock || 0) <= 5 && (
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-700">
                                    Only <span className="text-red-400 font-semibold">{singleProduct?.stock} items</span> left in stock
                                </p>
                                <span className="block w-full h-1 bg-red-400 rounded-full"></span>
                            </div>
                        )
                    }

                    {/* Ring Size */}
                    <div className="mt-3 flex flex-col gap-2">
                        <p className="text-gray-700">
                            Material: <span className="font-semibold">{singleProduct?.material}</span>
                        </p>
                        {/* <FormControl fullWidth size="small" sx={{ borderRadius: 0 }}>
                            <Select<number> value={ringSize} onChange={handleChange}>
                                {RING_SIZES.map((size) => (
                                    <MenuItem key={size} value={size}>
                                        {size.toFixed(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}
                    </div>

                    {/* Add to Cart & Wishlist */}
                    <div className="grid grid-cols-[20%_70%_10%] gap-1 mt-1 items-center">
                        <span style={{ borderColor: PRIMARY_COLOUR }} className="flex items-center justify-between gap-2 border p-0.5">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                disabled={quantity === 1}
                                className={`p-2 ${quantity === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                            >
                                <Minus size={20} strokeWidth={2} />
                            </button>

                            {quantity}
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                className="p-2 cursor-pointer"
                                disabled={quantity === singleProduct?.stock}
                            >
                                <Plus size={20} strokeWidth={2} />
                            </button>
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
                                <p>{singleProduct?.category?.name}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-10 py-8 border-b border-b-gray-300">
                            <div>
                                <MdOutlinePrivacyTip size={"3rem"} className="pb-2 w-[50%]" />
                                <h6>Secure Payments</h6>
                                <p className="text-gray-400">100% Safe Checkout</p>
                            </div>
                            <div>
                                <CiStar size={"3rem"} className="pb-2 w-[50%]" />
                                <h6>Certified Jewelry</h6>
                                <p className="text-gray-400">Authenticity Guaranteed</p>
                            </div>
                            <div>
                                <LiaShippingFastSolid size={"3rem"} className="pb-2 w-[40%]" />
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
                            <p className="text-gray-500">{singleProduct?.description}</p>
                        </div>

                        {/* SHIPPIN,PACKAGING,RETURN */}
                        <div>
                            <div className="flex items-center justify-between py-3">
                                <h3>SHIPPING</h3>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <h3>PACKAGING</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsMain;
