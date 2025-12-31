
import LayoutContainer from '../../components/layout/LayoutContainer'
import { FONT_FAMILY } from '../../utils'

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Divider,
} from "@mui/material";
import { ArrowLeft, Edit, MapPin, Phone, Trash2 } from "lucide-react";

import AddNewAddressModal from '../../components/AddressSection/AddNewAddressModal';
import { useAddresses, useDeleteAddress } from '../../services/api/selectAddress/selectAddress';
import ReviewOrder from '../private/ReviewOrder';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductWithId } from '../../services/api/product/product';
import { useCart } from '../../services/api/cart/cart';
import { useAppSelector } from '../../store/hooks';

type SelectAddressProps = {
    showItems: boolean;
};

export default function SelectAdress({ showItems }: SelectAddressProps) {

    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    const { data: userCart } = useCart(isAuthenticated);
    const { data: apiAddresses } = useAddresses();
    const deleteAdress = useDeleteAddress();

    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(null);
    const [selectedCheckAddress, setSelectedCheckAddress] = useState<any>(null);
    const [addressList, setAddressList] = useState<any[]>([]);
    const [showComponent, setShowComponent] = useState(1);

    const { id } = useParams();
    const { data: singleProduct } = useProductWithId(id as string);

    console.log("singleProduct", singleProduct);



    const navigate = useNavigate();

    // ------------------ Helpers ------------------
    const getLocalAddresses = () => {
        try {
            return JSON.parse(localStorage.getItem("localAdress") || "[]");
        } catch {
            return [];
        }
    };

    // ------------------ Sync Addresses ------------------
    useEffect(() => {
        if (isAuthenticated) {
            if (apiAddresses) {
                setAddressList(apiAddresses);
            }
        } else {
            setAddressList(getLocalAddresses());
        }
    }, [isAuthenticated, apiAddresses]);

    // ------------------ Handlers ------------------
    const handleEdit = (item: any) => {
        setSelectedData(item);
        setOpen(true);
    };


    const handleDelete = (item: any) => {
        // If deleted item is currently selected → clear selection
        if (selectedCheckAddress?._id === item._id) {
            setSelectedCheckAddress(null);
        }

        if (isAuthenticated) {
            // 🔹 API delete
            deleteAdress.mutate(item._id, {
                onSuccess: () => {
                    // optional: optimistic UI update
                    setAddressList((prev) =>
                        prev.filter(addr => addr._id !== item._id)
                    );
                }
            });
        } else {
            // 🔹 LocalStorage delete
            const updated = addressList.filter(
                addr => addr._id !== item._id
            );

            localStorage.setItem("localAdress", JSON.stringify(updated));
            setAddressList(updated);
        }
    };

    // ------------------ Delivery Charge ------------------
    const deliveryCharge = selectedCheckAddress
        ? selectedCheckAddress.country === "India"
            ? selectedCheckAddress.state === "Kerala"
                ? 50
                : 100
            : 300
        : 0;

    // ------------------ Render ------------------
    const localCart = JSON.parse(
        localStorage.getItem("guest_cart") || "[]"
    );

    // isAuthenticated
    return (
        <>
            {showComponent === 2 && (
                <ReviewOrder
                    deleveryCharge={deliveryCharge}
                    discountAmount={singleProduct?.discountPrice}
                    selectedCheckAddress={selectedCheckAddress}
                    singleProduct={singleProduct?.discountPrice}
                />
            )}

            {showComponent === 1 && (
                <LayoutContainer>
                    <div className="flex items-center">
                        {showItems && (
                            <ArrowLeft
                                size={30}
                                onClick={() => navigate("/user/mycart")}
                                className="cursor-pointer"
                            />
                        )}
                        <h1
                            style={{ fontFamily: FONT_FAMILY }}
                            className={`text-4xl ${!showItems ? "my-3" : ""}`}
                        >
                            {showItems ? "Select Address" : "Address Section"}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* LEFT: ADDRESS LIST */}
                        <div className="md:col-span-2">
                            <div className="flex justify-between font-bold text-lg mt-8">
                                <span>Other Address</span>
                            </div>

                            <div className="space-y-4">
                                {addressList.map((item) => (
                                    <Card
                                        key={item._id}
                                        className="border border-green-100"
                                        sx={{ borderRadius: 0, boxShadow: "none" }}
                                    >
                                        <CardContent className="flex justify-between p-4">
                                            <div className="flex items-start">
                                                <input
                                                    type="radio"
                                                    name="selectedAddress"
                                                    checked={selectedCheckAddress?._id === item._id}
                                                    onClick={() => setSelectedCheckAddress(item)}
                                                    onChange={() => setSelectedCheckAddress(item)}
                                                    className="mt-2"
                                                />

                                                <div className="ml-4">
                                                    <h3 className="font-medium">{item.name}</h3>

                                                    <div className="flex gap-2 text-gray-600 mt-2">
                                                        <MapPin size={16} />
                                                        <span>{item.addressLine1}</span>
                                                    </div>

                                                    <div className="flex gap-2 text-gray-600 mt-1">
                                                        <Phone size={16} />
                                                        <span>{item.phone}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(item)}>
                                                    <Edit className="text-blue-500" />
                                                </button>
                                                <button onClick={() => handleDelete(item)}>
                                                    <Trash2 className="text-red-500" />
                                                </button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <AddNewAddressModal
                                open={open}
                                setOpen={setOpen}
                                selectedData={selectedData}
                            />
                        </div>

                        {/* RIGHT: SUMMARY */}
                        {showItems && (
                            <div>
                                <Card sx={{ borderRadius: 0, boxShadow: "none" }}>
                                    <CardContent>
                                        <div className="flex justify-between py-2">
                                            <span>Subtotal</span>
                                            <span>
                                                ₹{
                                                    id ? (id
                                                        ? singleProduct?.discountPrice ?? 0
                                                        : userCart?.totalPrice ?? 0
                                                    ) :
                                                        isAuthenticated
                                                            ? (id
                                                                ? singleProduct?.discountPrice ?? 0
                                                                : userCart?.totalPrice ?? 0)
                                                            : localCart.reduce(
                                                                (sum: number, i: any) =>
                                                                    sum + i.discountPrice * i.quantity,
                                                                0
                                                            )
                                                }
                                            </span>

                                            {/* <span>
                                                ₹{id ? singleProduct?.discountPrice : userCart?.totalPrice || 0}..
                                            </span> */}
                                        </div>

                                        <div className="flex justify-between py-2">
                                            <span>Delivery</span>
                                            <span>₹{deliveryCharge}</span>
                                        </div>

                                        <Divider />

                                        <div className="flex justify-between font-bold py-3">
                                            <span>Grand Total</span>
                                            <span>
                                                ₹{
                                                    id ? (id
                                                        ? singleProduct?.discountPrice ?? 0
                                                        : userCart?.totalPrice ?? 0
                                                    ) + deliveryCharge :
                                                        isAuthenticated
                                                            ? (
                                                                (id
                                                                    ? singleProduct?.discountPrice ?? 0
                                                                    : userCart?.totalPrice ?? 0
                                                                ) + deliveryCharge
                                                            )
                                                            : (
                                                                localCart.reduce(
                                                                    (sum: number, i: any) =>
                                                                        sum + i.discountPrice * i.quantity,
                                                                    0
                                                                ) + deliveryCharge
                                                            )
                                                }
                                            </span>

                                        </div>

                                        <button
                                            onClick={() => setShowComponent(2)}
                                            disabled={!selectedCheckAddress}
                                            className="w-full bg-primary text-white py-3 disabled:bg-gray-400"
                                        >
                                            CONTINUE
                                        </button>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </LayoutContainer>
            )}
        </>
    );
}
