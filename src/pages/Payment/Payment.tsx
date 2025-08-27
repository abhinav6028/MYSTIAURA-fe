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
import { MapPin, MoreHorizontal, Phone, Plus, Trash, X } from "lucide-react";
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

export default function Payment() {

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
    const currentStep = 1// Address step is active

    const contacts = [
        {
            id: 1,
            name: "Alexa Williams",
            address: "1901 Thornridge Cir, Shiloh, Hawaii 81063",
            phone: "(603) 555-0123",
        },
    ]


    const contacts2 = [
        {
            id: 1,
            name: "Alexa Williams",
            address: "1901 Thornridge Cir, Shiloh, Hawaii 81063",
            phone: "(603) 555-0123",
        },
        {
            id: 1,
            name: "Alexa Williams",
            address: "1901 Thornridge Cir, Shiloh, Hawaii 81063",
            phone: "(603) 555-0123",
        },
        {
            id: 1,
            name: "Alexa Williams",
            address: "1901 Thornridge Cir, Shiloh, Hawaii 81063",
            phone: "(603) 555-0123",
        },
    ]


    return (
        <LayoutContainer>
            <h1 style={{ fontFamily: FONT_FAMILY }} className="text-4xl my-3">Payment Method</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="md:col-span-2">

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
                        <div className="flex justify-between font-bold text-lg mt-8">
                            <span>Default Address</span>
                        </div>

                        <div className="space-y-4 md:pb-8 pb-4">

                            <CardContent
                                sx={{ padding: 0 }}
                                className="flex justify-center items-start w-full"
                            >
                                <div className="w-full max-w-4xl space-y-6"> {/* max-w-4xl limits width on very large screens */}
                                    {/* Payment Method */}
                                    <div className="flex items-center gap-2 mt-4">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            id="creditCard"
                                            style={{ accentColor: PRIMARY_COLOUR }}
                                            className="w-4 h-4 "
                                        />

                                        <label htmlFor="creditCard" className="text-lg font-medium">
                                            Credit/Debit Card
                                        </label>
                                    </div>

                                    {/* Card Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                        {/* Card Number */}
                                        <div className="flex flex-col space-y-1">
                                            <label htmlFor="cardNumber" className="text-sm text-gray-600">
                                                Card Number
                                            </label>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                placeholder="8291 3746 XX89 2635"
                                                style={{ border: `1px solid ${PRIMARY_COLOUR}` }}
                                                className="w-full border px-4 py-2 focus:outline-none"
                                            />
                                        </div>

                                        {/* Card Holder Name */}
                                        <div className="flex flex-col space-y-1">
                                            <label htmlFor="cardName" className="text-sm text-gray-600">
                                                Card Holder Name
                                            </label>
                                            <input
                                                type="text"
                                                id="cardName"
                                                style={{ border: `1px solid ${PRIMARY_COLOUR}` }}
                                                className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                                            />
                                        </div>

                                        {/* Expiry Date */}
                                        <div className="flex flex-col space-y-1">
                                            <label htmlFor="expiryDate" className="text-sm text-gray-600">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                id="expiryDate"
                                                style={{ border: `1px solid ${PRIMARY_COLOUR}` }}
                                                className="w-full border border-gray-300 px-4 py-2"
                                            />
                                        </div>

                                        {/* CVC */}
                                        <div className="flex flex-col space-y-1">
                                            <label htmlFor="cvc" className="text-sm text-gray-600">
                                                CVC
                                            </label>
                                            <input
                                                type="password"
                                                id="cvc"
                                                style={{ border: `1px solid ${PRIMARY_COLOUR}` }}
                                                className="w-full border border-gray-300 px-4 py-2 focus:outline-none "
                                            />
                                        </div>
                                    </div>

                                    {/* Pay Now Button */}
                                    <button
                                        onClick={() => navigate('/revieworder')}
                                        style={{ background: PRIMARY_COLOUR }} className=" text-white px-6 py-3 cursor-pointer font-semibold hover:bg-[#916A55] transition">
                                        PAY NOW
                                    </button>

                                    {/* Paypal Option */}
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            id="paypal"
                                            style={{ accentColor: PRIMARY_COLOUR }}
                                            className="w-4 h-4"
                                        />
                                        <label htmlFor="paypal" className="text-lg font-medium">
                                            Paypal
                                        </label>
                                    </div>
                                </div>
                            </CardContent>


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
                            onClick={() => navigate('/revieworder')}
                            style={{ background: PRIMARY_COLOUR }}
                            className="text-white px-6 py-3 font-semibold w-full hover:bg-[#916A55] transition cursor-pointer">
                            CONTINUE
                        </button>


                    </CardContent>
                </Card>
            </div>
        </LayoutContainer >
    )
}
