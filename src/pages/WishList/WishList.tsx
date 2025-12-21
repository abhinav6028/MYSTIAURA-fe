import { useNavigate } from 'react-router-dom';
import LayoutContainer from '../../components/layout/LayoutContainer';
import { useRemoveFromWishList, useWishList } from '../../services/api/wishlist/wishlist';
import { Heart } from 'lucide-react';
import type { WishProduct } from '../../types/userTypes';
import { useAddToCartProduct } from '../../services/api/cart/cart';

// ... (previous imports remain the same)

const WishList = () => {
    const isAuthenticated = Boolean(localStorage.getItem("token"));
    const { data } = useWishList();

    // Update type to any[] since we're storing full product objects
    const guestWishlist = JSON.parse(localStorage.getItem("wishlist_temp") || "[]") as any[];

    const deleteWishListItem = useRemoveFromWishList();
    const createAddToCart = useAddToCartProduct();
    const navigate = useNavigate();

    // Get wishlist based on auth status
    const wishlist = isAuthenticated ? data?.products : guestWishlist;

    if (!wishlist || wishlist.length === 0) {
        return (
            <div>
                <LayoutContainer>
                    <p className="text-center mt-10">Your wishlist is empty</p>
                </LayoutContainer>
            </div>
        );
    }

    return (
        <div>
            <LayoutContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:px-4 mb-5 md:mb-10">
                {wishlist.map((product, index) => {
                    const productId = product._id || product;
                    const productName = product.name || 'Product Name';
                    const productPrice = product.price || 0;
                    const discountPrice = product.discountPrice;
                    const imageUrl = product.images?.[0]?.secure_url || '';

                    return (
                        <div
                            key={productId}
                            className="bg-[#f9f9f9] flex flex-col place-items relative cursor-pointer"
                        >
                            {/* Heart Icon for small screens */}
                            <div className="absolute top-2 left-2 sm:hidden w-8 h-8 flex items-center justify-center border-gray-300 bg-white">
                                <Heart
                                    color="#660033"
                                    fill="#660033"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteWishListItem.mutate({
                                            productId,
                                            isAuthenticated
                                        });
                                    }}
                                    size={18}
                                    className="text-gray-600"
                                />
                            </div>

                            <div className="w-full h-80 md:h-80 flex justify-center bg-[#f9f9f9] p-4">
                                <img
                                    src={imageUrl}
                                    alt={productName}
                                    className="w-full h-auto object-cover"
                                    onClick={() => navigate(`/productdetailPage/${productId}`)}
                                />
                            </div>

                            <div className="w-full flex flex-col sm:flex-row items-center px-2 sm:px-4 pb-4 gap-2 sm:gap-2 mt-2 sm:mt-0">
                                <div className="w-12 h-12 items-center justify-center bg-white flex-shrink-0 hidden sm:flex">
                                    <Heart
                                        color="#660033"
                                        fill="#660033"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteWishListItem.mutate({
                                                productId,
                                                isAuthenticated
                                            });
                                        }}
                                        size={22}
                                        className="text-gray-600"
                                    />
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    className="flex-1 bg-[#660033] text-white font-semibold md:py-3 py-2 text-sm sm:text-md hover:bg-[#51052b] transition-colors w-full sm:w-auto"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        createAddToCart.mutate({
                                            product: productId,
                                            quantity: 1,
                                            isAuthenticated
                                        });
                                    }}
                                >
                                    ADD TO CART
                                </button>
                            </div>

                            {/* Title & Price */}
                            <div className="w-full bg-white px-2 sm:px-4">
                                <h2 className="text-sm md:text-lg text-black mb-1">
                                    {productName}
                                </h2>

                                <div className="flex items-baseline space-x-3">
                                    <span className="text-lg font-semibold text-[#a37557]">
                                        ₹{Number(discountPrice).toFixed(2)}
                                    </span>
                                    {discountPrice && productPrice > discountPrice && (
                                        <span className="text-md text-gray-400 line-through">
                                            ₹{Number(productPrice).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
                        </LayoutContainer>
        </div>
    );
};

export default WishList;
