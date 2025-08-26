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
import { FONT_FAMILY, PRIMARY_COLOUR } from "../../utils";

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
            <div style={{ background: PRIMARY_COLOUR }} className="text-white py-6 px-10 xl:px-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        topInfoRow.map((val, index) => {
                            return <div className="flex items-center gap-5" key={index}>
                                <div>
                                    <img src={val.image} alt="img" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[24px]">{val.title}</p>
                                    <p className="text-sm">{val.content}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>

            {/* Middle Contact + Subscribe */}
            <div className="py-10 border-b px-10 xl:px-20">
                <div className="grid grid-cols-1 md:grid-cols-[25%_50%_22%] gap-8 text-center md:text-left">
                    {/* Contact */}
                    <div className="flex justify-center flex-col">
                        <h3 className="font-bold mb-2">CONTACT US</h3>
                        <p style={{ color: PRIMARY_COLOUR }}>(405) 555-0128</p>
                    </div>

                    {/* Subscribe */}
                    <div>
                        <h3 style={{ fontFamily: FONT_FAMILY }} className="font-bold md:text-3xl text-xl mb-2">Let’s Get In Touch!</h3>
                        <p style={{ color: PRIMARY_COLOUR }} className="text-sm mb-4">
                            What’s inside? Exclusive sales, new arrivals & much more.
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="border border-gray-300 px-3 py-3 w-2/4 focus:outline-none"
                            />
                            <button style={{ background: PRIMARY_COLOUR }} className=" text-white px-8">
                                SIGN UP
                            </button>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="flex flex-col justify-center">
                        <h3 className="font-bold mb-2">SOCIAL NETWORKS</h3>
                        <div className="flex justify-center md:justify-start gap-4">
                            <Facebook className="cursor-pointer" />
                            <Instagram className="cursor-pointer" />
                            <Twitter className="cursor-pointer" />
                            <YouTube className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Links */}
            <div className="py-6 px-10 xl:px-20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <div className="flex gap-6">
                    <a href="#">RINGS</a>
                    <a href="#">BRACELETS</a>
                    <a href="#">ABOUT US</a>
                    <a href="#">CONTACT US</a>
                </div>
                <img src={logo} alt="logo" />
                <div className="flex gap-6">
                    <a href="#">TERMS & CONDITIONS</a>
                    <a href="#">PRIVACY POLICY</a>
                </div>
            </div>

            {/* Copyright + Payment */}
            <div style={{ background: PRIMARY_COLOUR }} className=" text-white text-sm py-4">
                <div className="px-10 xl:px-20 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>Copyright © 2025 PeariGem. All Rights Reserved.</p>
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
