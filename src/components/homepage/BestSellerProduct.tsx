import { ArrowUpRight, Heart } from "lucide-react";
import subbanner from "../../assets/homepage/subbanner.png";
import { finalPrice, FONT_FAMILY, PRIMARY_COLOUR } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useProductList } from "../../services/api/product/product";
import { useAddToCartProduct } from "../../services/api/cart/cart";
import { useAddToWishList, useRemoveFromWishList, useWishList } from "../../services/api/wishlist/wishlist";
import { useSelector } from "react-redux";

const BestSellerProduct = () => {

    const { data } = useProductList(1, 8);
    const createAddToCart = useAddToCartProduct();
    const navigate = useNavigate();
    const createAddToWishList = useAddToWishList()
    const { data: wishlistData } = useWishList();
    const deleteWishListItem = useRemoveFromWishList();
    const { auth } = useSelector((state: any) => state);

    return (
        <div className="pb-8">
            {/* Header */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-8 px-4">
                <h1 style={{ fontFamily: FONT_FAMILY }} className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-0">
                    Best Seller Products
                </h1>
                <p
                    onClick={() => navigate('/user/inventory')}
                    style={{ color: PRIMARY_COLOUR }}
                    className="text-sm sm:text-base cursor-pointer flex items-center"
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


            {/* grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 */}
            {/* Product Grid */}

            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-4 ">

                {data?.map((val) => {
                    const isWishlisted = wishlistData?.products?.some(
                        (item) => item._id === val._id
                    );

                    return (
                        <div
                            key={val._id}
                            className="bg-[#f9f9f9] flex flex-col items-center relative cursor-pointer"
                        >
                            {/* Heart for small screens */}
                            {/* <div className="absolute top-2 left-2 sm:hidden w-8 h-8 flex items-center justify-center bg-white rounded-full">
                                <Heart
                                    onClick={() =>
                                        createAddToWishList.mutate({ productid: val._id })
                                    }
                                    size={30}
                                    fill={isWishlisted ? "#660033" : "none"}
                                    color='#660033'
                                    className={`cursor-pointer ${isWishlisted ? "text-red-500" : "text-gray-600"
                                        }`}
                                />
                            </div> */}

                            {/* Image */}
                            <div className="w-full h-80 md:h-80 flex justify-center bg-[#f9f9f9] p-4">
                                <img
                                    src={val.images[0].secure_url}
                                    alt={val.name}
                                    className="w-full h-auto object-cover"
                                    onClick={() => navigate( auth.isAuthenticated ? "/user/productdetailPage/" + val._id  : "/productdetailPage/" + val._id)}
                                />
                            </div>

                            {/* Bottom section */}
                            <div className="w-full flex sm:flex-row items-center px-2 sm:px-4 pb-4 gap-2 sm:gap-2 mt-2 sm:mt-0">
                                <div className="w-12 h-12 items-center justify-center bg-white flex-shrink-0 flex">
                                    <Heart

                                        onClick={() =>
                                            isWishlisted ? deleteWishListItem.mutate(val?._id) : createAddToWishList.mutate({ productid: val._id })
                                        }
                                        size={20}
                                        fill={isWishlisted ? "#660033" : "none"}
                                        color='#660033'
                                        className={`cursor-pointer ${isWishlisted ? "text-red-500" : "text-gray-600"
                                            }`}
                                    />
                                </div>

                                <button
                                    className="flex-1 bg-[#660033] text-white font-semibold md:py-3 py-2 text-sm sm:text-md hover:bg-[#51052b] transition-colors w-full sm:w-auto"
                                    onClick={() =>
                                        createAddToCart.mutate({ product: val._id, quantity: 1 })
                                    }
                                >
                                    ADD TO CART
                                </button>
                            </div>

                            {/* Title & Price */}
                            <div className="w-full bg-white px-2 sm:px-4">
                                <h2 className="text-sm md:text-lg text-black mb-1">{val.name}</h2>
                                <div className="flex items-baseline space-x-3">
                                    <span className="text-lg font-semibold text-[#a37557]">
                                        ₹ {finalPrice(val.price, 10).toFixed(2)}
                                    </span>
                                    <span className="text-md text-gray-400 line-through">
                                        ₹ {val.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
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

export default BestSellerProduct;