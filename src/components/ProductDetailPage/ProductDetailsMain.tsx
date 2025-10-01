// import { Button, Typography } from "@mui/material";
// import { useState } from "react";
// import { Heart, Plus, Minus } from "lucide-react";
// import { finalPrice, FONT_FAMILY, PRIMARY_COLOUR } from "../../utils";
// import { useNavigate, useParams } from "react-router-dom";
// import { useProductWithId } from "../../services/api/product/product";
// import { RatingStars } from "../../utilsComp/RatingsComp";
// import { LiaShippingFastSolid } from "react-icons/lia";
// import { CiStar } from "react-icons/ci";
// import { MdOutlinePrivacyTip } from "react-icons/md";
// import { useAddToCartProduct } from "../../services/api/cart/cart";
// const fallback = "../assets/fallback.png";

// const ProductDetailsMain = ({ setProductCategory }) => {
//     const [quantity, setQuantity] = useState<number>(1);
//     const navigate = useNavigate();
//     const { id } = useParams();

//     const { data: singleProduct } = useProductWithId(id as string);
//     const createAddToCart = useAddToCartProduct();

//     setProductCategory(singleProduct?.category?.name)
//     console.log('singleProduct', singleProduct?.category?.name);


//     // setProductCategory

//     return (
//         <div className="px-4 md:px-6 lg:px-10 py-6">
//             {/* Main grid: images + details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
//                 {/* ---------- LEFT: IMAGES ---------- */}
//                 <div>
//                     {/* Main image */}
//                     <div className="w-full h-64 sm:h-80 md:h-[28rem] lg:h-[35rem]">
//                         <img
//                             src={singleProduct?.images?.[0]?.secure_url || fallback}
//                             alt={singleProduct?.name ?? "product image"}
//                             className="bg-gray-100 w-full h-full object-cover "
//                         />
//                     </div>

//                     {/* Thumbnails */}
//                     <div className="mt-3 flex w-15 h-15 md:w-17 md:h-17 lg:w-20 lg:h-20 gap-3">
//                         {[1, 2, 3, 4].map((idx) => (
//                             <img
//                                 key={idx}
//                                 src={singleProduct?.images?.[0]?.secure_url || fallback}
//                                 alt=""
//                                 className="w-full aspect-square object-cover cursor-pointer bg-gray-100"
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 {/* ---------- RIGHT: DETAILS ---------- */}
//                 <div className="flex flex-col gap-6">
//                     {/* Title & Rating */}
//                     <div className="border-b border-gray-200 pb-4">
//                         <h1
//                             style={{ fontFamily: FONT_FAMILY }}
//                             className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2"
//                         >
//                             {singleProduct?.name}
//                         </h1>

//                         <div className="flex items-center gap-2 text-yellow-500 mb-2">
//                             <RatingStars
//                                 rating={singleProduct?.averageRating || 0}
//                                 count={singleProduct?.reviewCount || 0}
//                             />
//                         </div>

//                         <div className="flex items-center gap-4">
//                             <Typography
//                                 style={{ fontFamily: FONT_FAMILY }}
//                                 sx={{ fontSize: { xs: "1.1rem", md: "1.5rem" } }}
//                                 color="primary"
//                             >
//                                 ₹{" "}
//                                 {finalPrice(
//                                     singleProduct?.price || 0,
//                                     singleProduct?.discountPrice || 0
//                                 ).toFixed(2)}
//                             </Typography>

//                             {singleProduct?.price && (
//                                 <Typography
//                                     style={{ fontFamily: FONT_FAMILY }}
//                                     sx={{ fontSize: { xs: "1rem", md: "1.3rem" } }}
//                                     className="line-through text-gray-500"
//                                 >
//                                     ₹ {singleProduct.price.toFixed(2)}
//                                 </Typography>
//                             )}
//                         </div>
//                     </div>

//                     {/* Stock info */}
//                     {(singleProduct?.stock || 0) <= 5 && (
//                         <div className="flex flex-col gap-2">
//                             <p className="text-gray-700 text-sm sm:text-base">
//                                 Only{" "}
//                                 <span className="text-red-500 font-semibold">
//                                     {singleProduct?.stock}
//                                 </span>{" "}
//                                 items left in stock
//                             </p>
//                             <span className="block w-full h-1 bg-red-200 rounded-full"></span>
//                         </div>
//                     )}

//                     {/* Material */}
//                     <div className="text-gray-700">
//                         Material:{" "}
//                         <span className="font-semibold">{singleProduct?.material}</span>
//                     </div>

//                     {/* Quantity / Add to cart */}
//                     <div className="grid grid-cols-[25%_60%_15%] gap-2 items-center">
//                         <span
//                             style={{ borderColor: PRIMARY_COLOUR }}
//                             className="flex items-center justify-between gap-2 border"
//                         >
//                             <button
//                                 onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                                 disabled={quantity === 1}
//                                 className={`p-2 ${quantity === 1
//                                     ? "cursor-not-allowed opacity-50"
//                                     : "cursor-pointer"
//                                     }`}
//                             >
//                                 <Minus size={18} />
//                             </button>
//                             <span className="text-sm md:text-base">{quantity}</span>
//                             <button
//                                 onClick={() => setQuantity((q) => q + 1)}
//                                 disabled={quantity === singleProduct?.stock}
//                                 className="p-2 cursor-pointer"
//                             >
//                                 <Plus size={18} />
//                             </button>
//                         </span>

//                         <Button
//                             sx={{
//                                 height: "42px",
//                                 borderRadius: 0,
//                                 fontFamily: "sans-serif",
//                                 bgcolor: PRIMARY_COLOUR,
//                                 fontSize: { xs: "0.8rem", md: "0.9rem" },
//                             }}
//                             fullWidth
//                             onClick={() =>
//                                 createAddToCart.mutate({ product: id || "", quantity })
//                             }
//                         >
//                             Add To Cart
//                         </Button>

//                         <span
//                             style={{ borderColor: PRIMARY_COLOUR, color: PRIMARY_COLOUR }}
//                             className="border flex items-center justify-center p-2 "
//                         >
//                             <Heart size={22} strokeWidth={1} />
//                         </span>
//                     </div>

//                     {/* Buy now */}
//                     <Button
//                         onClick={() => navigate("/selectadress")}
//                         variant="outlined"
//                         sx={{
//                             width: "100%",
//                             height: "42px",
//                             fontFamily: "sans-serif",
//                             borderRadius: 0,
//                             borderColor: PRIMARY_COLOUR,
//                             color: PRIMARY_COLOUR,
//                         }}
//                     >
//                         BUY NOW
//                     </Button>

//                     {/* SKU / Categories */}
//                     <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
//                         <div>
//                             <h3 className="text-gray-200">SKU</h3>
//                             <p>EG_972917044ZM001</p>
//                         </div>
//                         <div>
//                             <h3 className="text-gray-200">Categories</h3>
//                             <p>{singleProduct?.category?.name}</p>
//                         </div>
//                     </div>


//                     <div className="grid grid-cols-3 gap-4 sm:gap-6 py-6 border-b border-gray-200 text-center">
//                         <div className="px-1">
//                             <MdOutlinePrivacyTip className="mx-auto mb-2 text-2xl sm:text-3xl lg:text-4xl" />
//                             <h6 className="font-semibold text-xs sm:text-sm lg:text-base">
//                                 Secure Payments
//                             </h6>
//                             <p className="text-gray-500 text-[10px] sm:text-xs">
//                                 100% Safe Checkout
//                             </p>
//                         </div>

//                         <div className="px-1">
//                             <CiStar className="mx-auto mb-2 text-2xl sm:text-3xl lg:text-4xl" />
//                             <h6 className="font-semibold text-xs sm:text-sm lg:text-base">
//                                 Certified Jewelry
//                             </h6>
//                             <p className="text-gray-500 text-[10px] sm:text-xs">
//                                 Authenticity Guaranteed
//                             </p>
//                         </div>

//                         <div className="px-1">
//                             <LiaShippingFastSolid className="mx-auto mb-2 text-2xl sm:text-3xl lg:setttext-4xl" />
//                             <h6 className="font-semibold text-xs sm:text-sm lg:text-base">
//                                 Free Shipping
//                             </h6>
//                             <p className="text-gray-500 text-[10px] sm:text-xs">
//                                 On Every Order
//                             </p>
//                         </div>
//                     </div>




//                     {/* Info Icons */}
//                     {/* <div className="grid sm:grid-cols-3 gap-6 py-6 border-b border-gray-200 text-center">
//                         <div>
//                             <MdOutlinePrivacyTip size="2.5rem" className="mx-auto mb-2" />
//                             <h6 className="font-semibold">Secure Payments</h6>
//                             <p className="text-gray-500 text-sm">100% Safe Checkout</p>
//                         </div>
//                         <div>
//                             <CiStar size="2.5rem" className="mx-auto mb-2" />
//                             <h6 className="font-semibold">Certified Jewelry</h6>
//                             <p className="text-gray-500 text-sm">Authenticity Guaranteed</p>
//                         </div>
//                         <div>
//                             <LiaShippingFastSolid size="2.5rem" className="mx-auto mb-2" />
//                             <h6 className="font-semibold">Free Shipping</h6>
//                             <p className="text-gray-500 text-sm">On Every Order</p>
//                         </div>
//                     </div> */}

//                     {/* Description */}
//                     <div className="py-4 border-b border-gray-300">
//                         <h2
//                             style={{ fontFamily: FONT_FAMILY }}
//                             className="text-xl font-semibold mb-2"
//                         >
//                             DESCRIPTION
//                         </h2>
//                         <p className="text-gray-600 text-sm sm:text-base">
//                             {singleProduct?.description}
//                         </p>
//                     </div>

//                     {/* Shipping / Packaging */}
//                     {/* <div className="divide-y divide-gray-200">
//                         <div className="py-3 flex justify-between">
//                             <h3 className="font-medium">SHIPPING</h3>
//                         </div>
//                         <div className="py-3 flex justify-between">
//                             <h3 className="font-medium">PACKAGING</h3>
//                         </div>
//                     </div> */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetailsMain;


import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { Heart, Plus, Minus } from "lucide-react";
import { finalPrice, FONT_FAMILY, PRIMARY_COLOUR } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";
import { useProductWithId } from "../../services/api/product/product";
import { RatingStars } from "../../utilsComp/RatingsComp";
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiStar } from "react-icons/ci";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useAddToCartProduct } from "../../services/api/cart/cart";
const fallback = "../assets/fallback.png";

const ProductDetailsMain = ({ setProductCategory }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const navigate = useNavigate();
    const { id } = useParams();

    const { data: singleProduct } = useProductWithId(id as string);
    const createAddToCart = useAddToCartProduct();

    setProductCategory(singleProduct?.category?.name);

    // 👉 State for magnifier
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = e.pageX - left;
        const y = e.pageY - top;
        setPosition({ x, y, width, height });
    };

    return (
        <div className="px-4 md:px-6 lg:px-10 py-6">
            {/* Main grid: images + details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {/* ---------- LEFT: IMAGES ---------- */}
                <div>
                    {/* Main image with magnifier */}
                    <div
                        className="relative w-full h-64 sm:h-80 md:h-[28rem] lg:h-[35rem] overflow-hidden"
                        onMouseEnter={() => setShowMagnifier(true)}
                        onMouseLeave={() => setShowMagnifier(false)}
                        onMouseMove={handleMouseMove}
                    >
                        <img
                            src={singleProduct?.images?.[0]?.secure_url || fallback}
                            alt={singleProduct?.name ?? "product image"}
                            className="bg-gray-100 w-full h-full object-cover"
                        />

                        {/* Magnifier glass */}
                        {showMagnifier && (
                            <div
                                className="absolute pointer-events-none rounded-full border-2 border-gray-400 shadow-lg"
                                style={{
                                    top: `${position.y - 75}px`,
                                    left: `${position.x - 75}px`,
                                    width: "150px",
                                    height: "150px",
                                    backgroundImage: `url(${singleProduct?.images?.[0]?.secure_url || fallback})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: `${position.width * 2}px ${position.height * 2}px`, // zoom factor = 2x
                                    backgroundPosition: `-${position.x * 2 - 75}px -${position.y * 2 - 75}px`,
                                }}
                            />
                        )}
                    </div>

                    {/* Thumbnails */}
                    <div className="mt-3 flex w-15 h-15 md:w-17 md:h-17 lg:w-20 lg:h-20 gap-3">
                        {[1, 2, 3, 4].map((idx) => (
                            <img
                                key={idx}
                                src={singleProduct?.images?.[0]?.secure_url || fallback}
                                alt=""
                                className="w-full aspect-square object-cover cursor-pointer bg-gray-100"
                            />
                        ))}
                    </div>
                </div>

                {/* ---------- RIGHT: DETAILS ---------- */}
                <div className="flex flex-col gap-6">
                    {/* Title & Rating */}
                    <div className="border-b border-gray-200 pb-4">
                        <h1
                            style={{ fontFamily: FONT_FAMILY }}
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2"
                        >
                            {singleProduct?.name}
                        </h1>

                        <div className="flex items-center gap-2 text-yellow-500 mb-2">
                            <RatingStars
                                rating={singleProduct?.averageRating || 0}
                                count={singleProduct?.reviewCount || 0}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Typography
                                style={{ fontFamily: FONT_FAMILY }}
                                sx={{ fontSize: { xs: "1.1rem", md: "1.5rem" } }}
                                color="primary"
                            >
                                ₹{" "}
                                {finalPrice(
                                    singleProduct?.price || 0,
                                    singleProduct?.discountPrice || 0
                                ).toFixed(2)}
                            </Typography>

                            {singleProduct?.price && (
                                <Typography
                                    style={{ fontFamily: FONT_FAMILY }}
                                    sx={{ fontSize: { xs: "1rem", md: "1.3rem" } }}
                                    className="line-through text-gray-500"
                                >
                                    ₹ {singleProduct.price.toFixed(2)}
                                </Typography>
                            )}
                        </div>
                    </div>

                    {/* Stock info */}
                    {(singleProduct?.stock || 0) <= 5 && (
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Only{" "}
                                <span className="text-red-500 font-semibold">
                                    {singleProduct?.stock}
                                </span>{" "}
                                items left in stock
                            </p>
                            <span className="block w-full h-1 bg-red-200 rounded-full"></span>
                        </div>
                    )}

                    {/* Material */}
                    <div className="text-gray-700">
                        Material:{" "}
                        <span className="font-semibold">{singleProduct?.material}</span>
                    </div>

                    {/* Quantity / Add to cart */}
                    <div className="grid grid-cols-[25%_60%_15%] gap-2 items-center">
                        <span
                            style={{ borderColor: PRIMARY_COLOUR }}
                            className="flex items-center justify-between gap-2 border"
                        >
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                disabled={quantity === 1}
                                className={`p-2 ${quantity === 1
                                        ? "cursor-not-allowed opacity-50"
                                        : "cursor-pointer"
                                    }`}
                            >
                                <Minus size={18} />
                            </button>
                            <span className="text-sm md:text-base">{quantity}</span>
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                disabled={quantity === singleProduct?.stock}
                                className="p-2 cursor-pointer"
                            >
                                <Plus size={18} />
                            </button>
                        </span>

                        <Button
                            sx={{
                                height: "42px",
                                borderRadius: 0,
                                fontFamily: "sans-serif",
                                bgcolor: PRIMARY_COLOUR,
                                fontSize: { xs: "0.8rem", md: "0.9rem" },
                            }}
                            fullWidth
                            onClick={() =>
                                createAddToCart.mutate({ product: id || "", quantity })
                            }
                        >
                            Add To Cart
                        </Button>

                        <span
                            style={{ borderColor: PRIMARY_COLOUR, color: PRIMARY_COLOUR }}
                            className="border flex items-center justify-center p-2 "
                        >
                            <Heart size={22} strokeWidth={1} />
                        </span>
                    </div>

                    {/* Buy now */}
                    <Button
                        onClick={() => navigate("/selectadress")}
                        variant="outlined"
                        sx={{
                            width: "100%",
                            height: "42px",
                            fontFamily: "sans-serif",
                            borderRadius: 0,
                            borderColor: PRIMARY_COLOUR,
                            color: PRIMARY_COLOUR,
                        }}
                    >
                        BUY NOW
                    </Button>

                    {/* SKU / Categories */}
                    <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
                        <div>
                            <h3 className="text-gray-200">SKU</h3>
                            <p>EG_972917044ZM001</p>
                        </div>
                        <div>
                            <h3 className="text-gray-200">Categories</h3>
                            <p>{singleProduct?.category?.name}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 sm:gap-6 py-6 border-b border-gray-200 text-center">
                        <div className="px-1">
                            <MdOutlinePrivacyTip className="mx-auto mb-2 text-2xl sm:text-3xl lg:text-4xl" />
                            <h6 className="font-semibold text-xs sm:text-sm lg:text-base">
                                Secure Payments
                            </h6>
                            <p className="text-gray-500 text-[10px] sm:text-xs">
                                100% Safe Checkout
                            </p>
                        </div>

                        <div className="px-1">
                            <CiStar className="mx-auto mb-2 text-2xl sm:text-3xl lg:text-4xl" />
                            <h6 className="font-semibold text-xs sm:text-sm lg:text-base">
                                Certified Jewelry
                            </h6>
                            <p className="text-gray-500 text-[10px] sm:text-xs">
                                Authenticity Guaranteed
                            </p>
                        </div>

                        <div className="px-1">
                            <LiaShippingFastSolid className="mx-auto mb-2 text-2xl sm:text-3xl lg:text-4xl" />
                            <h6 className="font-semibold text-xs sm:text-sm lg:text-base">
                                Free Shipping
                            </h6>
                            <p className="text-gray-500 text-[10px] sm:text-xs">
                                On Every Order
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="py-4 border-b border-gray-300">
                        <h2
                            style={{ fontFamily: FONT_FAMILY }}
                            className="text-xl font-semibold mb-2"
                        >
                            DESCRIPTION
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                            {singleProduct?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsMain;

