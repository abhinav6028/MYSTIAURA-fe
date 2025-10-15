import React from "react";
import {
    Facebook,
    Instagram,
    YouTube,
    Twitter,
} from "@mui/icons-material";
import shipping from "../../assets/footer/shipping.svg"
import returnSvg from "../../assets/footer/return.svg"
import cutomerSvg from "../../assets/footer/customer.svg"
import paymentSvg from "../../assets/footer/payment.svg"
import logo from "../../assets/logo.svg"
import klarnaSvg from "../../assets/footer/klarna.svg";
import visaSvg from "../../assets/footer/visa.svg";
import paypalSvg from "../../assets/footer/paypal.svg";
import amexSvg from "../../assets/footer/amex.svg";
import discoverSvg from "../../assets/footer/discover.svg";
import mastercardSvg from "../../assets/footer/mastercard.svg";
import { PRIMARY_COLOUR } from "../../utils";

const topInfoRow = [
    {
        id: 1,
        image: shipping,
        title: "Free Shipping",
        content: "You will love at great low prices"
    },
    {
        id: 2,
        image: returnSvg,
        title: "15 Days Returns",
        content: "Within 15 days for an exchange"
    },
    {
        id: 3,
        image: cutomerSvg,
        title: "Customer Support",
        content: "24 hours a day, 7 days a week"
    },
    {
        id: 4,
        image: paymentSvg,
        title: "Flexible Payment",
        content: "Pay with multiple credit cards"
    },

]

const Footer: React.FC = () => {
    return (
        <footer className="w-full">
            {/* Top Info Row */}
            <div
                style={{ background: PRIMARY_COLOUR }}
                className="text-white py-6 px-6 sm:px-10 xl:px-20"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
                    {topInfoRow.map((val, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5"
                        >
                            <div>
                                <img src={val.image} alt="img" className="mx-auto sm:mx-0" />
                            </div>
                            <div>
                                <p className="font-semibold text-[20px]">{val.title}</p>
                                <p className="text-sm">{val.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Middle Contact + Subscribe */}
            <div className="py-10 border-b px-6 sm:px-10 xl:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
                    {/* Contact */}
                    <div className="flex flex-col justify-center items-center md:items-start">
                        <h3 className="font-bold mb-2">CONTACT US</h3>
                        <p style={{ color: PRIMARY_COLOUR }}>(405) 555-0128</p>
                    </div>

                    {/* Social */}
                    <div className="flex flex-col justify-center items-center md:items-end">
                        <h3 className="font-bold mb-2">SOCIAL NETWORKS</h3>
                        <div className="flex justify-center md:justify-end gap-4">
                            <Facebook className="cursor-pointer" />
                            <Instagram className="cursor-pointer" />
                            <Twitter className="cursor-pointer" />
                            <YouTube className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright + Payment */}
            <div style={{ background: PRIMARY_COLOUR }} className=" text-white text-sm py-4">
                <div className="px-10 xl:px-20 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>Copyright © 2025 MYSTIAURA. All Rights Reserved.</p>
                    <div className="flex gap-4 items-center">
                        <img src={klarnaSvg} alt="klarna" />
                        <img src={visaSvg} alt="visa" />
                        <img src={paypalSvg} alt="paypal" />
                        <img src={amexSvg} alt="amex" />
                        <img src={discoverSvg} alt="discover" />
                        <img src={mastercardSvg} alt="mastercard" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
