import LayoutContainer from '../../components/layout/LayoutContainer'
import { FONT_FAMILY, PRIMARY_COLOUR } from '../../utils'
import bestSeller from "../../assets/homepage/bestseller2 (1).png";
import bestSeller2 from "../../assets/homepage/bestseller2 (4).png";

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
import { MapPin, MoreHorizontal, PenLine, Phone, Plus, Trash, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddNewAddressModal from '../../components/AddressSection/AddNewAddressModal';

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

interface Step {
    id: string
    title: string
    icon: React.ReactNode
}

const steps: Step[] = [
    {
        id: "address",
        title: "Address",
        icon: (
            <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
            </svg>
        ),
    },
    {
        id: "payment",
        title: "Payment Method",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
            </svg>
        ),
    },
    {
        id: "review",
        title: "Review",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
        ),
    },
]

export default function ReviewOrder() {

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

    const navigate = useNavigate()
    const currentStep = 2 // Address step is active

    const contacts = [
        {
            id: 1,
            name: "Alexa Williams",
            address: "1901 Thornridge Cir, Shiloh, Hawaii 81063",
            phone: "(603) 555-0123",
        },
    ]



    const cartItems = [
        {
            id: 1,
            name: "Diamond Pearl Engagement Ring",
            price: 160,
            qty: 1,
            image: bestSeller,
        },
        {
            id: 2,
            name: "Rose Gold Lotus Necklace",
            price: 200,
            qty: 1,
            image: bestSeller2,
        },
    ];

    return (

        <LayoutContainer>
            <h1 style={{ fontFamily: FONT_FAMILY }} className="text-4xl my-3">Review Order</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="md:col-span-2 mb-7">

                    <div className="w-full mx-auto my-3 md:my-5">
                        <div className="flex items-center justify-between relative">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex flex-col items-center relative z-10">
                                    <div
                                        style={{ backgroundColor: index <= currentStep ? PRIMARY_COLOUR : 'white', border: `1px solid ${PRIMARY_COLOUR}` }}
                                        className={`md:w-12 md:h-12 w-10 h-10 flex items-center justify-center transition-colors ${index <= currentStep ? "text-white" : " text-gray-400 bg-white"
                                            }`}
                                    >
                                        {step.icon}
                                    </div>

                                    <span
                                        className={`mt-3 text-sm font-medium transition-colors ${index <= currentStep ? "text-gray-900" : "text-gray-500"
                                            }`}
                                    >
                                        {step.title}
                                    </span>
                                </div>
                            ))}

                            <div className="absolute top-6 left-0 right-0 flex justify-between px-6">
                                {steps.slice(0, -1).map((_, index) => (
                                    <div key={index} className={`h-px flex-1 mx-6 ${index < currentStep ? "bg-amber-700" : "bg-red-700"}`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <>
                        <div className="flex justify-between text-lg mt-8">
                            <span>Estimated Delivery: February 25, 2025</span>
                        </div>

                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} style={{ borderBottom: '1px solid grey' }} className="flex items-center justify-between py-5">
                                    <div className="flex gap-4">
                                        <div className="w-20 h-20 md:w-20 md:h-20 flex justify-center bg-[#f9f9f9]">
                                            <img
                                                src={item.image}
                                                alt="Ring"
                                                className="w-auto h-auto object-contain"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="md:text-lg text-sm">{item.name}</span>
                                            <span color={PRIMARY_COLOUR} className="font-semibold my-1">${item.price}.00</span>
                                            <span className="text-gray-500">QTY: {item.qty}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>

                    <>
                        <div className="flex justify-between font-semibold text-lg mt-8">
                            <span>Shipping Address</span>
                        </div>

                        {/* style={{ borderBottom: '1px solid grey' }}  */}
                        <div style={{ borderBottom: '1px solid grey' }} className="space-y-1 flex items-center justify-between ">
                            <div className="flex items-center justify-between py-5">
                                <div className="flex gap-4">
                                    <div className="flex flex-col">
                                        <span className="md:text-lg text-sm">Alexa Willioms</span>
                                        <span className="mt-1 block w-full max-w-[200px] sm:max-w-[400px] break-words">
                                            4140 Parker Rd. Allentown, New Mexico 31134
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='h-10 w-10 bg-[#f9f9f9] flex items-center justify-center'>
                                <PenLine
                                    size={20} strokeWidth={0.75}
                                    className="text-black-500 bg-[#f9f9f9]"
                                />
                            </div>
                        </div>
                    </>

                    <>
                        <div className="flex justify-between font-semibold text-lg mt-8">
                            <span>Payment Method</span>
                        </div>

                        {/* style={{ borderBottom: '1px solid grey' }}  */}
                        <div style={{ borderBottom: '1px solid grey' }} className="space-y-1 flex items-center justify-between ">
                            <div className="flex items-center justify-between py-5">
                                <div className="flex gap-4">
                                    <div className="flex flex-col">
                                        <span className="md:text-lg text-sm">Credit Card</span>
                                        <span className="mt-1 block w-full max-w-[200px] sm:max-w-[400px] break-words">
                                            8291 3746 XX89 2635
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='h-10 w-10 bg-[#f9f9f9] flex items-center justify-center'>
                                <PenLine
                                    size={20} strokeWidth={0.75}
                                    className="text-black-500 bg-[#f9f9f9]"
                                />
                            </div>
                        </div>
                    </>


                </div>

                {/* Right Section (Summary) */}
                <Card className=" px-4 h-fit border border-green-100 mb-5" sx={{ borderRadius: 0, boxShadow: 'none' }}>
                    <CardContent>
                        <div style={{ borderBottom: `1px solid ${PRIMARY_COLOUR}` }} className="flex justify-between my-1 md:my-2 py-2 md:py-3 border-b ">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between mb-2 my-2">
                            <span>Taxes</span>
                            <span>${taxes.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Delivery Fee</span>
                            <span style={{ color: PRIMARY_COLOUR }} className="">FREE</span>
                        </div>
                        <Divider className="my-2" />
                        <div className="flex justify-between font-bold text-lg py-3">
                            <span>Grand Total</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>

                        <button
                            // onClick={() => navigate('/revieworder')}
                            style={{ background: PRIMARY_COLOUR }}
                            className="text-white px-6 py-3 font-semibold w-full hover:bg-[#916A55] transition cursor-pointer">
                            PLACE ORDER
                        </button>
                    </CardContent>
                </Card>
            </div>
        </LayoutContainer >

    )
}
