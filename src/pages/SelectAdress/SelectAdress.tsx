import LayoutContainer from '../../components/layout/LayoutContainer'
import { FONT_FAMILY, PRIMARY_COLOUR } from '../../utils'
import bestSeller from "../../assets/homepage/bestseller2 (1).png";
import bestSeller2 from "../../assets/homepage/bestseller2 (4).png";

import { useState } from "react";
import {
    Card,
    CardContent,
    Divider,
} from "@mui/material";
import { ArrowLeft, Edit, MapPin, Phone, Trash2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import AddNewAddressModal from '../../components/AddressSection/AddNewAddressModal';
import { useAddresses, useDeleteAddress } from '../../services/api/selectAddress/selectAddress';
import ReviewOrder from '../private/ReviewOrder';
import { useNavigate } from 'react-router-dom';


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
        id: "Review",
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
    {
        id: "payment",
        title: "Payment",
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
]

type SelectAddressProps = {
    showItems: boolean;
};

export default function SelectAdress({ showItems }: SelectAddressProps) {

    const [cart] = useState<CartItem[]>(initialCart);
    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(null);
    const [selectedCheckAddress, setSelectedCheckAddress] = useState<any>(null);
    const { data: selectAdressState } = useAddresses();
    const deleteAdress = useDeleteAddress();

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const taxes = 25;
    const deliveryFee = 0;
    const grandTotal = subtotal + taxes + deliveryFee;

    const currentStep = 0 // Address step is active

    const navigate = useNavigate()


    const handleEdit = (item: any) => {
        setOpen(true);
        setSelectedData(item);
    }

    const handleDelete = (item: any) => {
        deleteAdress.mutate(item._id);
    }

    const [showomponet, setShowComponent] = useState(1)

    return (

        <>

            {
                showomponet == 2 && <ReviewOrder selectedCheckAddress={selectedCheckAddress} />
            }

            {
                showomponet == 1 &&


                <LayoutContainer>

                    <div className='flex items-center'>

                        {
                            !showItems &&
                            <ArrowLeft size={30} onClick={() => navigate("/user/mycart")} className='cursor-pointer' />
                        }
                        <h1 style={{ fontFamily: FONT_FAMILY }} className={`text-4xl ${!showItems ? "my-3" : ''}`}>{!showItems ? "Select Address" : 'Address Section'}</h1>

                    </div>

                    <div className={`grid grid-cols-1 ${!showItems ? 'md:grid-cols-3' : 'md:grid-cols-2'} md:grid-cols-2 gap-6`}>
                        <div className="md:col-span-2">

                            {
                                !showItems &&

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
                            }

                            <>
                                <div className="flex justify-between font-bold text-lg mt-8">
                                    <span>Other Address</span>
                                </div>

                                <div className="space-y-4">
                                    {selectAdressState?.map((item) => (
                                        <Card
                                            key={item._id}
                                            className="mb-4 border border-green-100 md:mt-3 mt-2"
                                            style={{ borderRadius: 0, boxShadow: "none" }}
                                        >
                                            <CardContent className="flex md:flex-row md:gap-10 items-start p-4">
                                                <div className="flex-1 space-y">
                                                    <div className="flex items-center">
                                                        <input
                                                            type="radio" // ✅ make it radio
                                                            name="selectedAddress" // ✅ group name
                                                            checked={selectedCheckAddress?._id === item._id} // ✅ only one selected
                                                            className="w-4 h-4 mt-2 rounded-full border border-gray-300 text-green-600 focus:ring-green-500 focus:ring-2 mb-auto"
                                                            onChange={() => setSelectedCheckAddress(item)}
                                                        />

                                                        <div className="md:ml-5 ml-3  mt--2">
                                                            <div className='flex'>
                                                                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>

                                                            </div>

                                                            {/* Address */}
                                                            <div className="flex items-start gap-2 text-gray-600 mt-4">
                                                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                                <span className="text-sm leading-relaxed break-words sm:w-auto w-[200px]">
                                                                    {item.addressLine1}
                                                                </span>
                                                            </div>

                                                            {/* Phone */}
                                                            <div className="flex items-center gap-2 text-gray-600 my-2">
                                                                <Phone className="w-4 h-4 flex-shrink-0" />
                                                                <span className="text-sm">{item.phone}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2 flex-shrink-0">
                                                    {/* Edit Button */}
                                                    <button
                                                        className="h-8 w-8 p-0 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded"
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        <Edit className="w-4 h-4 text-blue-500" />
                                                    </button>

                                                    {/* Delete Button */}
                                                    <button
                                                        className="h-8 w-8 p-0 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded"
                                                        onClick={() => handleDelete(item)}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                    </button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </>
                            <AddNewAddressModal open={open} setOpen={setOpen} selectedData={selectedData} />
                            {/* */}
                        </div>

                        {/* Right Section (Summary) */}

                        {
                            !showItems &&

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
                                        <span>₹{grandTotal.toFixed(2)}</span>
                                    </div>

                                    <button
                                        onClick={() => {
                                            // handleCreate()
                                            setShowComponent(2)
                                        }}
                                        disabled={selectedCheckAddress === null}
                                        className="text-white px-6 py-3 font-semibold w-full transition
                                    bg-primary cursor-pointer
                                    disabled:bg-gray-400 disabled:cursor-not-allowed
                                "
                                    >
                                        CONTINUE
                                    </button>
                                </CardContent>
                            </Card>
                        }

                    </div>

                </LayoutContainer >
            }
        </>


    )
}