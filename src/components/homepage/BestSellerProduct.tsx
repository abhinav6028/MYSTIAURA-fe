import { ArrowUpRight, Heart } from "lucide-react";
import subbanner from "../../assets/homepage/subbanner.png";
import { FONT_FAMILY, navigatePath, PRIMARY_COLOUR } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useProductList } from "../../services/api/product/product";
import { useAddToCartProduct } from "../../services/api/cart/cart";
import { useAddToWishList, useRemoveFromWishList, useWishList } from "../../services/api/wishlist/wishlist";
import { useAppSelector } from "../../store/hooks";

const BestSellerProduct = () => {

    const { data } = useProductList(1, 8);
    const createAddToCart = useAddToCartProduct();
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    const createAddToWishList = useAddToWishList()
    const { data: wishlistData } = useWishList(isAuthenticated);
    const deleteWishListItem = useRemoveFromWishList();

    const wishlistProductFromLocalStorage: string[] = JSON.parse(
        localStorage.getItem("wishlist_temp") ?? "[]"
    );


    const addToGuestCart = (product: any) => {
        const cartKey = "guest_wish";

        const existingCart = JSON.parse(
            localStorage.getItem(cartKey) || "[]"
        );

        const productIndex = existingCart.findIndex(
            (item: any) => item._id === product._id
        );

        if (productIndex !== -1) {
            existingCart[productIndex].quantity =
                (existingCart[productIndex].quantity || 1) + 1;
        } else {
            existingCart.push({
                ...product,   // FULL PRODUCT DATA
                quantity: 1,
            });
        }

        localStorage.setItem(cartKey, JSON.stringify(existingCart));
    };
    // Abhinav code
    // const addToGuestWish = (product: any) => {
    //     const cartKey = "guest_cart";

    //     const existingCart = JSON.parse(
    //         localStorage.getItem(cartKey) || "[]"
    //     );

    //     const productIndex = existingCart.findIndex(
    //         (item: any) => item._id === product._id
    //     );

    //     if (productIndex !== -1) {
    //         existingCart[productIndex].quantity =
    //             (existingCart[productIndex].quantity || 1) + 1;
    //     } else {
    //         existingCart.push({
    //             ...product,   // FULL PRODUCT DATA
    //             quantity: 1,
    //         });
    //     }

    //     localStorage.setItem(cartKey, JSON.stringify(existingCart));
    // };

    return (
        <div className="pb-8">
            {/* Header */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-8 px-0">
                <h1 style={{ fontFamily: FONT_FAMILY }} className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-0">
                    Best Seller Products
                </h1>
                <p
                    onClick={() => navigate(`${isAuthenticated ? "/" : ""}${navigatePath}/inventory`)}
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

            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-4">
                {data?.map((val) => {
                    const isWishlisted = !isAuthenticated
                        ? wishlistProductFromLocalStorage?.some(
                            (item: any) => item?._id === val._id
                        )
                        : wishlistData?.products?.some(
                            (item: any) => item._id === val._id
                        );

                    return (
                        <div
                            data-aos="fade-up"
                            data-aos-duration="3000"
                            key={val._id}
                            className="bg-[#f9f9f9] flex flex-col items - center relative cursor - pointer"
                        >

                            {/* Image */}
                            <div className="w-full h-80 md:h-80 flex justify-center bg-[#f9f9f9] p-4">
                                <img
                                    src={val.images[0].secure_url}
                                    alt={val.name}
                                    className="w-full h-auto object-cover"
                                    onClick={() => navigate(isAuthenticated ? `/user/productdetailPage/${val?._id}` : `/productdetailPage/${val?._id}`)}
                                // onClick={() => navigate(`${isAuthenticated ? "/" : ""}${navigatePath}/productdetailPage/` + val._id)}
                                />
                            </div>

                            {/* Bottom section */}
                            <div className="w-full flex sm:flex-row items-center px-2 sm:px-4 pb-4 gap-2 sm:gap-2 mt-2 sm:mt-0">
                                <div className="w-12 h-12 items-center justify-center bg-white flex-shrink-0 flex">
                                    <Heart
                                        // addToGuestCart
                                        onClick={() => {
                                            isWishlisted
                                                ? deleteWishListItem.mutate({ productId: val?._id, isAuthenticated })
                                                : createAddToWishList.mutate({
                                                    productid: val,
                                                    isAuthenticated
                                                })
                                        }}
                                        // onClick={() =>
                                        //     isWishlisted ? deleteWishListItem.mutate(val?._id) : createAddToWishList.mutate({ productid: val._id })
                                        // }
                                        size={20}
                                        fill={isWishlisted ? "#660033" : "none"}
                                        color='#660033'
                                        className={`cursor-pointer ${isWishlisted ? "text-red-500" : "text-gray-600"
                                            }`}
                                    />
                                </div>

                                <button
                                    className="flex-1 bg-[#660033] text-white font-semibold md:py-3 py-2 text-sm sm:text-md hover:bg-[#51052b] transition-colors w-full sm:w-auto"
                                    onClick={() => {
                                        createAddToCart.mutate({ product: val, quantity: 1, isAuthenticated });
                                    }}
                                >
                                    ADD TO CART
                                </button>
                            </div>

                            {/* Title & Price */}
                            <div className="w-full px-2 sm:px-4">
                                <h2 className="text-sm md:text-lg text-black mb-1">{val.name}</h2>
                                <div className="flex items-baseline space-x-3">
                                    <span className="text-lg font-semibold text-[#a37557]">
                                        ₹ {val.discountPrice}
                                    </span>
                                    <span className="text-md text-gray-400 line-through">
                                        ₹ {val.price}
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
        </div >
    )
}

export default BestSellerProduct;