import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
    Checkbox,
    Select,
    MenuItem,
} from "@mui/material";
import { Trash, X } from "lucide-react";
import { PRIMARY_COLOUR } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart, useDeleteAllCartItem, useDeleteCartItem, useUpdateCart } from "../../services/api/cart/cart";
import { useAppSelector } from "../../store/hooks";

const MyCart = () => {

    const location = useLocation();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const { data: userCart } = useCart(isAuthenticated);
    const deleteCart = useDeleteCartItem();
    const deleteAllCart = useDeleteAllCartItem();
    const [checkAllCart, setCheckAllCart] = useState(false);
    const updateCart = useUpdateCart()

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);

    console.log("userCart", userCart);


    const navigate = useNavigate();

    function getDateAfterDays(days: number) {
        const today = new Date();
        today.setDate(today.getDate() + days);

        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0"); // months are 0-based
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const futureDate = getDateAfterDays(15);

    return (
        <div className={`grid grid-cols-1 ${userCart?.items?.length === 0 ? "grid-cols-1" : "md:grid-cols-3"}  gap-6 my-10`}>
            {/* Left Section */}

            <div className="md:col-span-2">

                <div className="flex items-center gap-2 mb-4 justify-between">
                    <div className="flex items-center gap-2 h-full">
                        <Checkbox checked={checkAllCart} onChange={() => setCheckAllCart(!checkAllCart)} />
                        <Typography variant="body1">
                            {checkAllCart
                                ? `${userCart?.items?.length}/${userCart?.items?.length}`
                                : '0/0'} Items Selected

                        </Typography>
                    </div>
                    {userCart?.items?.length !== 0 && <div className="flex items-stretch gap-2">
                        <Button className="bg-red-100 p-2 flex items-center justify-center cursor-pointer" disabled={!checkAllCart} onClick={() => deleteAllCart.mutate()}>
                            <Trash size={20} color={"#fff"} />
                        </Button>
                    </div>}
                </div>

                {userCart?.items && userCart.items.length > 0 ? (
                    userCart.items.map((item) => (
                        <Card
                            key={item._id}
                            className="mb-4 border border-green-100"
                            sx={{ borderRadius: 0, boxShadow: "none" }}
                        >
                            <CardContent className="flex flex-row gap-4 md:gap-10 items-center">
                                {/* Image */}
                                <img
                                    src={item?.product?.images?.[0]?.secure_url}
                                    alt={item?.product.name}
                                    className=" w-25 h-25 md:w-32 lg:w-40 md:h-40 lg:h-40 object-cover bg-[#f9f9f9]"
                                />

                                {/* Details */}
                                <div className="flex-1 flex flex-col gap-0 sm:gap-1  lg:gap-1 md:gap-1 w-full ">
                                    <div className="flex items-center w-full ">
                                        <Typography variant="subtitle1" className="font-semibold text-sm md:text-base">
                                            {item.product.name}
                                        </Typography>

                                        <div className="ml-auto md:hidden block">
                                            <X size={20} className="self-start md:self-center cursor-pointer mt-2 md:mt-0" />
                                        </div>
                                    </div>


                                    <div className="flex flex-wrap items-center gap-2">
                                        <Typography variant="h6" className="text-[#a56c46] font-bold text-sm md:text-base">
                                            ₹ {item.product.discountPrice}
                                            {/* {finalPrice(item.product.price, item.product.discountPrice).toFixed(2) || 0} */}
                                        </Typography>
                                        {/* {item.price && ( */}
                                        <Typography variant="body2" className="line-through text-gray-500 text-sm md:text-base">
                                            ₹ {item.product.price}
                                            {/* {item.product.price.toFixed(2)} */}
                                        </Typography>
                                        {/* )} */}
                                    </div>

                                    {/* Qty Dropdown */}
                                    <div className="flex items-center gap-2">
                                        <label htmlFor={`qty-${item._id}`} className="text-sm md:text-base">
                                            Qty:
                                        </label>
                                        <Select
                                            value={item.quantity}
                                            onChange={(e) => updateCart.mutate({
                                                productId: item.product._id,
                                                quantity: Number(e.target.value)
                                            })}
                                            size="small"
                                            id={`qty-${item._id}`}
                                            sx={{
                                                minWidth: 60,
                                                "& .MuiSelect-select": {
                                                    paddingY: 0.5,
                                                    paddingX: 1,
                                                    fontSize: 14,
                                                    height: "28px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                },
                                            }}
                                        >
                                            {Array.from({ length: item.product.stock }, (_, i) => i + 1).map((num) => (
                                                <MenuItem key={num} value={num}>
                                                    {num}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>


                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-gray-600">
                                        <span className="flex flex-wrap gap-1 text-sm md:text-base">
                                            Delivered by: <b>{futureDate}</b>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-auto hidden md:block">
                                    <X size={20} className="self-start md:self-center cursor-pointer md:mt-0" onClick={() => deleteCart.mutate(item?.product?._id)} />
                                </div>
                            </CardContent>
                        </Card>

                    ))) :
                    <div className="w-full h-full text-center">
                        <button onClick={() => navigate("/user/inventory")} className="text-white px-6 mb-4 mt-4 py-3 font-semibold w-60 transition
                                    bg-primary cursor-pointer">
                            MOVE TO PRODUCT
                        </button>
                        <p className="w-full h-full text-center">Cart not yet added</p>
                    </div>
                }
            </div>

            {/* Right Section (Summary) */}
            {userCart?.items?.length !== 0 &&
                <Card className=" p-4 h-fit border border-green-100 mb-5" sx={{ borderRadius: 0, boxShadow: 'none' }}>
                    <CardContent>
                        <div style={{ borderBottom: `1px solid ${PRIMARY_COLOUR}` }} className="flex justify-between my-1 md:my-2 py-2 md:py-3 border-b ">
                            <span>Subtotal</span>
                            <span>₹ {userCart ? userCart?.totalPrice.toFixed(2) : 0}</span>
                        </div>

                        {/* Discount Code */}
                        {/* <p style={{ width: '100%' }} className="mt-2">Enter Discount Code</p>
                        <div className="flex justify-center w-full mb-2 mt-1">

                            <div className="flex flex-col md:flex-row w-full">
                                <input
                                    type="email"
                                    placeholder="Enter coupen code  "
                                    className="border border-gray-300 px-3 py-3 w-full md:flex-1 focus:outline-none rounded-none"
                                />
                                <button
                                    style={{ background: PRIMARY_COLOUR }}
                                    className="text-white px-8 py-3 w-full md:w-auto rounded-none"
                                >
                                    Apply
                                </button>
                            </div>
                        </div> */}


                        <div className="flex justify-between mb-2 my-2">
                            <span>Taxes</span>
                            <span>₹ {0}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Delivery Fee</span>
                            <span className="text-green-600">FREE</span>
                        </div>
                        <Divider className="my-2" />
                        <div className="flex justify-between font-bold text-lg py-3">
                            <span>Grand Total</span>
                            <span>₹ {userCart?.totalPrice}</span>
                        </div>

                        <button
                            onClick={() => navigate('/user/selectadress')}
                            disabled={userCart?.items?.length === 0}
                            className="text-white px-6 py-3 font-semibold w-full transition
                        bg-primary hover:bg-[#916A55] cursor-pointer
                        disabled:bg-gray-400 disabled:cursor-not-allowed">
                            CHECKOUT
                        </button>

                        <p onClick={() => navigate('/user/inventory')} className="w-full text-center my-2 cursor-pointer">BACK TO SHOPPING</p>
                    </CardContent>
                </Card>
            }
        </div>

    );
};

export default MyCart;
