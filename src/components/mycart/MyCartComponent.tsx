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
import bestSeller from "../../assets/homepage/bestseller2 (1).png";
import bestSeller2 from "../../assets/homepage/bestseller2 (4).png";
import LayoutContainer from "../../components/layout/LayoutContainer";
import { Trash, X } from "lucide-react";
import { PRIMARY_COLOUR } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";

type CartItem = {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    color: string;
    qty: number;
    image: string;
    returnDays: number;
    deliveryDate: string;
};

const initialCart: CartItem[] = [
    {
        id: 1,
        name: "Diamond Pearl Engagement Ring",
        price: 160,
        oldPrice: 170,
        color: "Silver",
        qty: 1,
        image: bestSeller,
        returnDays: 15,
        deliveryDate: "Feb 25, 2025",
    },
    {
        id: 2,
        name: "Rose Gold Lotus Necklace",
        price: 200,
        oldPrice: 220,
        color: "Gold",
        qty: 1,
        image: bestSeller2,
        returnDays: 15,
        deliveryDate: "Feb 25, 2025",
    },
];

const MyCart = () => {

    const location = useLocation();

    useEffect(() => {
        // Scroll to the top of the page instantly when the route changes
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);

    const [cart, setCart] = useState<CartItem[]>(initialCart);
    // const [discountCode, setDiscountCode] = useState("OFFER50");

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const taxes = 25;
    const deliveryFee = 0;
    const grandTotal = subtotal + taxes + deliveryFee;

    const handleQtyChange = (id: number, qty: number) => {
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, qty } : item))
        );
    };

    // const handleRemove = (id: number) => {
    //     setCart((prev) => prev.filter((item) => item.id !== id));
    // };

    const navigate = useNavigate()

    return (
        <LayoutContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                {/* Left Section */}

                <div className="md:col-span-2">

                    <div className="md:flex col items-center gap-2 mb-4 justify-between">
                        <div className="flex items-center gap-2 h-full">
                            <Checkbox defaultChecked />
                            <Typography variant="body1">
                                {cart.length}/{cart.length} Items Selected
                            </Typography>
                        </div>
                        <div className="flex items-stretch gap-2">
                            <span className="bg-red-100 p-2 flex items-center justify-center cursor-pointer">
                                <Trash size={20} color={PRIMARY_COLOUR} />
                            </span>

                            <p
                                style={{ color: PRIMARY_COLOUR, border: `1px solid ${PRIMARY_COLOUR}` }}
                                className="text-white py-2 px-5 cursor-pointer flex items-center border border-primary"
                            >
                                MOVE TO WISHLIST
                            </p>
                        </div>
                    </div>

                    {cart.map((item) => (
                        <Card
                            key={item.id}
                            className="mb-4 border border-green-100"
                            sx={{ borderRadius: 0, boxShadow: "none" }}
                        >
                            <CardContent className="flex flex-col md:flex-row gap-4 md:gap-10 items-start">
                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className=" w-32 h-38 md:w-32 lg:w-48 md:h-40 lg:h-48 object-cover bg-[#f9f9f9] rounded-md"
                                />

                                {/* Details */}
                                <div className="flex-1 flex flex-col gap-2 w-full">
                                    <div className="flex items-center w-full ">
                                        <Typography variant="subtitle1" className="font-semibold text-sm md:text-base">
                                            {item.name}
                                        </Typography>

                                        <div className="ml-auto md:hidden block">
                                            <X size={20} className="self-start md:self-center cursor-pointer mt-2 md:mt-0" />
                                        </div>
                                    </div>


                                    <div className="flex flex-wrap items-center gap-2">
                                        <Typography variant="h6" className="text-[#a56c46] font-bold text-sm md:text-base">
                                            ${item.price.toFixed(2)}
                                        </Typography>
                                        {item.oldPrice && (
                                            <Typography variant="body2" className="line-through text-gray-500 text-sm md:text-base">
                                                ${item.oldPrice.toFixed(2)}
                                            </Typography>
                                        )}
                                    </div>

                                    <Typography variant="body2" className="text-gray-600 text-sm md:text-base">
                                        Color: {item.color}
                                    </Typography>

                                    {/* Qty Dropdown */}
                                    <div className="flex items-center gap-2">
                                        <label htmlFor={`qty-${item.id}`} className="text-sm md:text-base">
                                            Qty:
                                        </label>
                                        <Select
                                            value={item.qty}
                                            size="small"
                                            onChange={(e) => handleQtyChange(item.id, Number(e.target.value))}
                                            id={`qty-${item.id}`}
                                            sx={{ minWidth: 60 }}
                                        >
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <MenuItem key={num} value={num}>
                                                    {num}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>

                                    {/* Return + Delivery Info */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-gray-600 pt-2">
                                        {/* <span>↩</span> */}
                                        <span className="text-sm md:text-base">{item.returnDays} Days return available</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-gray-600">
                                        <span className="flex flex-wrap gap-1 text-sm md:text-base">
                                            Delivered by <b>{item.deliveryDate}</b>
                                        </span>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <div className="mb-auto hidden md:block">
                                    <X size={20} className="self-start md:self-center cursor-pointer mt-2 md:mt-0" />
                                </div>
                            </CardContent>
                        </Card>

                    ))}
                </div>

                {/* Right Section (Summary) */}
                <Card className=" p-4 h-fit border border-green-100 mb-5" sx={{ borderRadius: 0, boxShadow: 'none' }}>
                    <CardContent>
                        <div style={{ borderBottom: `1px solid ${PRIMARY_COLOUR}` }} className="flex justify-between my-1 md:my-2 py-2 md:py-3 border-b ">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
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
                            <span>${taxes.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Delivery Fee</span>
                            <span className="text-green-600">FREE</span>
                        </div>
                        <Divider className="my-2" />
                        <div className="flex justify-between font-bold text-lg py-3">
                            <span>Grand Total</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>

                        <Button
                            onClick={() => navigate('/selectadress')}
                            fullWidth
                            variant="contained"
                            sx={{ bgcolor: PRIMARY_COLOUR, py: 1, borderRadius: 0, fontFamily: 'monospace' }}
                            className="bg-amber-700 text-white normal-case mt-4 "
                        >
                            Checkout
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </LayoutContainer>

    );
};

export default MyCart;
