
import { useNavigate } from 'react-router-dom';
import LayoutContainer from '../../components/layout/LayoutContainer'
import { useRemoveFromWishList, useWishList } from '../../services/api/wishlist/wishlist'
import { Heart } from 'lucide-react';
import { finalPrice } from '../../utils';
import type { WishProduct } from '../../types/userTypes';
import { useAddToCartProduct } from '../../services/api/cart/cart';

export default function WishList() {

    const { data } = useWishList();

    const deleteWishListItem = useRemoveFromWishList();
    const createAddToCart = useAddToCartProduct();

    const navigate = useNavigate()

    const localWishList = JSON.parse(
        localStorage.getItem("guest_cart") || "[]"
    );

    // useWishList
    return (
        <LayoutContainer>
            {/* <h1 style={{ fontFamily: FONT_FAMILY }} className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-0">
                Best Seller Products
            </h1> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:px-4 mb-5 md:mb-10">
                {data?.products?.map((val: WishProduct, index: number) => (
                    <div
                        key={index}
                        className="bg-[#f9f9f9] flex flex-col place-items relative cursor-pointer"

                    >
                        {/* Heart Icon for small screens */}
                        <div className="absolute top-2 left-2 sm:hidden w-8 h-8 flex items-center justify-center border-gray-300 bg-white">
                            <Heart
                                color="#660033"
                                fill="#660033"
                                onClick={(e: any) => {
                                    e.stopPropagation();
                                    deleteWishListItem.mutate(val?._id)
                                }}
                                size={18} className="text-gray-600" />
                        </div>


                        <div className="w-full h-80 md:h-80 flex justify-center bg-[#f9f9f9] p-4">
                            <img
                                src={val.images[0].secure_url}
                                alt="Ring"
                                className="w-full h-auto object-cover"
                                onClick={() => navigate('/productdetailPage')}
                            />
                        </div>

                        <div className="w-full flex flex-col sm:flex-row items-center px-2 sm:px-4 pb-4 gap-2 sm:gap-2 mt-2 sm:mt-0">
                            <div className="w-12 h-12 items-center justify-center bg-white flex-shrink-0 hidden sm:flex">
                                <Heart
                                    color="#660033"
                                    fill="#660033"
                                    onClick={(e: any) => {
                                        e.stopPropagation();
                                        deleteWishListItem.mutate(val?._id)
                                    }}
                                    size={22} className="text-gray-600 " />
                            </div>

                            {/* Add to Cart Button */}
                            <button className="flex-1 bg-[#660033] text-white font-semibold md:py-3 py-2 text-sm sm:text-md hover:bg-[#51052b] transition-colors w-full sm:w-auto"
                                onClick={() =>
                                    createAddToCart.mutate({ product: val._id, quantity: 1 })
                                }
                            >
                                ADD TO CART
                            </button>
                        </div>

                        {/* Title & Price */}
                        <div className="w-full bg-white px-2 sm:px-4">
                            <h2 className="text-sm md:text-lg text-black mb-1">
                                {val?.name}
                            </h2>

                            <div className="flex items-baseline space-x-3">
                                <span className="text-lg font-semibold text-[#a37557]">₹ {finalPrice(val.price, val.discountPrice).toFixed(2) || 0}</span>
                                <span className="text-md text-gray-400 line-through">₹ {val.price.toFixed(2) || 0}</span>
                            </div>
                        </div>
                    </div>


                ))}
            </div>
        </LayoutContainer>
    )
}
