import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Heart, Plus, Minus, Share2, ZoomIn, X } from "lucide-react";
import { FONT_FAMILY, PRIMARY_COLOUR } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";
import { useProductWithId } from "../../services/api/product/product";
import { RatingStars } from "../../utilsComp/RatingsComp";
import { CiStar } from "react-icons/ci";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useAddToCartProduct } from "../../services/api/cart/cart";
const fallback = "../assets/fallback.png";

const ProductDetailsMain = () => {
    const [quantity, setQuantity] = useState<number>(1);
    const navigate = useNavigate();
    const { id } = useParams();

    const { data: singleProduct } = useProductWithId(id as string);
    const createAddToCart = useAddToCartProduct();

    // 👉 State for magnifier
    // const [showMagnifier, setShowMagnifier] = useState(false);
    // const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [currentIndx, setCurrentIndex] = useState(0);

    // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    //     const x = e.pageX - left;
    //     const y = e.pageY - top;
    //     setPosition({ x, y, width, height });
    // };

    const handleShare = () => {
        const url = window.location.href; // current page URL
        const text = `Check out this product: ${singleProduct?.name}`;

        // Web Share API (mobile & supported browsers)
        if (navigator.share) {
            navigator.share({
                title: singleProduct?.name,
                text,
                url,
            })
                .then(() => console.log("Shared successfully"))
                .catch((error) => console.error("Error sharing", error));
        } else {
            // Fallback: WhatsApp sharing
            const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`;
            window.open(whatsappUrl, "_blank");
        }
    };
    const [zoomed, setZoomed] = useState(false);

    const imageUrl =
        singleProduct?.images?.[currentIndx]?.secure_url || fallback;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="px-4 md:px-6 lg:px-10 py-6">
            {/* Main grid: images + details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {/* ---------- LEFT: IMAGES ---------- */}
                <div>
                    {/* Main image with magnifier */}

                    <div className="relative w-full h-64 sm:h-80 md:h-[28rem] lg:h-[35rem] overflow-hidden">
                        {/* Product image */}
                        <img
                            src={imageUrl}
                            alt={singleProduct?.name ?? "product image"}
                            className="bg-gray-100 w-full h-full object-cover"
                        />

                        {/* Zoom icon */}
                        <button
                            onClick={() => setZoomed(true)}
                            className="absolute top-3 left-3 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full transition"
                        >
                            <ZoomIn size={22} />
                        </button>

                        {/* Zoom overlay */}
                        {zoomed && (
                            <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
                                {/* Close button */}
                                <button
                                    onClick={() => setZoomed(false)}
                                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
                                >
                                    <X size={24} />
                                </button>

                                {/* ✅ Mobile: scrollable natural-size image */}
                                {isMobile ? (
                                    <div
                                        className="w-full h-full overflow-auto"
                                        style={{
                                            WebkitOverflowScrolling: "touch",
                                        }}
                                    >
                                        <img
                                            src={imageUrl}
                                            alt="Zoomed product"
                                            className="block"
                                            style={{
                                                width: "auto",
                                                height: "auto",
                                                maxWidth: "none",
                                                maxHeight: "none",
                                            }}
                                        />
                                    </div>
                                ) : (
                                    /* 🖥 Desktop: fullscreen fit */
                                    <img
                                        src={imageUrl}
                                        alt="Zoomed product"
                                        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Magnifier */}
                    {/* previous code */}

                    {/* <div
                        className="relative w-full h-64 sm:h-80 md:h-[28rem] lg:h-[35rem] overflow-hidden"
                        onMouseEnter={() => setShowMagnifier(true)}
                        onMouseLeave={() => setShowMagnifier(false)}
                        onMouseMove={handleMouseMove}
                    >
                        <img
                            src={singleProduct?.images?.[currentIndx]?.secure_url || fallback}
                            alt={singleProduct?.name ?? "product image"}
                            className="bg-gray-100 w-full h-full object-cover"
                        />

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
                    </div> */}

                    {/* Thumbnails */}
                    <div className="mt-3 flex w-15 h-15 md:w-17 md:h-17 lg:w-20 lg:h-20 gap-3">
                        {singleProduct?.images?.map((data, idx) => (
                            <img
                                onClick={() => setCurrentIndex(idx)}
                                key={idx}
                                src={data?.secure_url || fallback}
                                alt=""
                                className="w-full aspect-square object-cover cursor-pointer bg-gray-100"
                            />
                        ))}
                    </div>
                </div>

                {/* ---------- RIGHT: DETAILS ---------- */}
                <div className="flex flex-col gap-3">
                    {/* Title & Rating */}
                    <div className="border-b border-gray-200 pb-4">
                        <div className="flex justify-between">
                            <h1
                                style={{ fontFamily: FONT_FAMILY }}
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2"
                            >
                                {singleProduct?.name}
                            </h1>

                            <button className="cursor-pointer" onClick={handleShare}><Share2 strokeWidth={1.25} /></button>
                        </div>

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
                                {singleProduct?.discountPrice}
                            </Typography>

                            {singleProduct?.price && (
                                <Typography
                                    style={{ fontFamily: FONT_FAMILY }}
                                    sx={{ fontSize: { xs: "1rem", md: "1.3rem" } }}
                                    className="line-through text-gray-500"
                                >
                                    {singleProduct?.price}
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
                    <p>Tax included. Shipping calculated at checkout.</p>
                    <p></p>
                    <div className="w-full space-y-3">
                        {/* Quantity + Add to Cart + Wishlist */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Quantity Selector */}
                            <div
                                style={{ borderColor: PRIMARY_COLOUR }}
                                className="flex items-center justify-between border w-[120px] sm:w-[140px] md:w-[160px] h-full"
                            >
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    disabled={quantity === 1}
                                    className={`p-2 ${quantity === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="text-sm md:text-base font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    disabled={quantity === singleProduct?.stock}
                                    className="p-2 cursor-pointer"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <Button
                                sx={{
                                    height: "44px",
                                    fontFamily: "sans-serif",
                                    bgcolor: PRIMARY_COLOUR,
                                    fontSize: { xs: "0.8rem", md: "0.9rem" },
                                    paddingInline: "24px",
                                    flexGrow: 1,
                                    textTransform: "none",
                                }}
                                onClick={() => createAddToCart.mutate({ product: id || "", quantity })}
                            >
                                Add To Cart
                            </Button>

                            {/* Wishlist Heart Icon */}
                            <button
                                style={{ borderColor: PRIMARY_COLOUR, color: PRIMARY_COLOUR }}
                                className="border flex items-center justify-center p-2 hover:bg-gray-100 transition w-[44px] h-[44px] flex-shrink-0"
                            >
                                <Heart size={22} strokeWidth={1.2} />
                            </button>
                        </div>

                        {/* Buy Now Button */}
                        <Button
                            onClick={() =>
                                navigate(`/user/selectadress/${id}`, {
                                    state: { product: singleProduct, quantity },
                                })
                            }
                            variant="outlined"
                            sx={{
                                width: "100%",
                                height: "44px",
                                fontFamily: "sans-serif",
                                borderColor: PRIMARY_COLOUR,
                                color: PRIMARY_COLOUR,
                                textTransform: "none",
                            }}
                        >
                            BUY NOW
                        </Button>
                    </div>



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

                        {/* <div className="px-1">
                            <LiaShippingFastSolid className="mx-auto mb-2 text-2xl sm:text-3xl lg:text-4xl" />
                            <h6 className="font-semibold text-xs sm:text-sm lg:text-base">
                                Free Shipping
                            </h6>
                            <p className="text-gray-500 text-[10px] sm:text-xs">
                                On Every Order
                            </p>
                        </div> */}
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

