import { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
    TextField,
    Checkbox,
    Select,
    MenuItem,
} from "@mui/material";
import bestSeller from "../../assets/homepage/bestseller2 (1).png";
import bestSeller2 from "../../assets/homepage/bestseller2 (4).png";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

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

const CartPage = () => {
    const [cart, setCart] = useState<CartItem[]>(initialCart);
    const [discountCode, setDiscountCode] = useState("OFFER50");

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const taxes = 25;
    const deliveryFee = 0;
    const grandTotal = subtotal + taxes + deliveryFee;

    const handleQtyChange = (id: number, qty: number) => {
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, qty } : item))
        );
    };

    const handleRemove = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Section */}
            <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4 justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox defaultChecked />
                        <Typography variant="body1">
                            {cart.length}/{cart.length} Items Selected
                        </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="bg-red-100 p-2 cursor-pointer"><RiDeleteBinLine size={20} color="red" /></span>
                        <Button
                            className="text-red-500 normal-case"
                        >
                            Move to Wishlist
                        </Button>
                    </div>
                </div>

                {cart.map((item) => (
                    <Card key={item.id} className="mb-4 shadow-sm rounded-xl">
                        <CardContent className="flex gap-10 items-start">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-25 sm:w-50 h-25 sm:h-50 object-cover rounded"
                            />

                            <div className="flex-1">
                                <Typography variant="subtitle1" className="font-semibold">
                                    {item.name}
                                </Typography>

                                <div className="flex items-center gap-2">
                                    <Typography variant="h6" className="text-[#a56c46] font-bold">
                                        ${item.price.toFixed(2)}
                                    </Typography>
                                    {item.oldPrice && (
                                        <Typography
                                            variant="body2"
                                            className="line-through text-gray-500"
                                        >
                                            ${item.oldPrice.toFixed(2)}
                                        </Typography>
                                    )}
                                </div>

                                <Typography variant="body2" className="text-gray-600 !mb-3">
                                    Color: {item.color}
                                </Typography>

                                {/* Qty Dropdown */}
                                <label htmlFor="qty" className="pr-2">Qty:</label>
                                <Select
                                    value={item.qty}
                                    size="small"
                                    onChange={(e) =>
                                        handleQtyChange(item.id, Number(e.target.value))
                                    }
                                    className="mt-2 w-15"
                                    id="qty"
                                >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <MenuItem key={num} value={num}>
                                            {num}
                                        </MenuItem>
                                    ))}
                                </Select>

                                {/* Return + Delivery Info */}
                                <div
                                    className="flex items-center gap-2 text-gray-600 py-2"
                                >
                                    <span>↩</span> {item.returnDays} Days return available
                                </div>
                                <div
                                    className="flex items-center gap-2 text-gray-600"
                                >
                                    <LiaShippingFastSolid size={"1.5rem"} /> <span className="flex flex-wrap gap-2">Delivered by <b>{item.deliveryDate}</b></span>
                                </div>
                            </div>
                            <IoMdClose size={"1.5rem"} onClick={() => handleRemove(item.id)} cursor={"pointer"}/>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Right Section (Summary) */}
            <Card className="shadow-md rounded-xl p-4 h-fit mb-5">
                <CardContent>
                    <Typography variant="h6" className="mb-2 font-semibold">
                        Order Summary
                    </Typography>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {/* Discount Code */}
                    <div className="flex items-center gap-2 mb-2">
                        <TextField
                            size="small"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            className="flex-1"
                        />
                        <Button
                            variant="contained"
                            className="bg-amber-700 text-white normal-case"
                        >
                            Apply
                        </Button>
                    </div>

                    <div className="flex justify-between mb-2">
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
                        fullWidth
                        variant="contained"
                        className="bg-amber-700 text-white normal-case mt-4 py-2"
                    >
                        Checkout
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default CartPage;
