import React from "react";
import {
  // Facebook,
  Instagram,
  // YouTube,
  // Twitter,
} from "@mui/icons-material";
import shipping from "../../assets/footer/shipping.svg";
// import returnSvg from "../../assets/footer/return.svg"
import cutomerSvg from "../../assets/footer/customer.svg";
import paymentSvg from "../../assets/footer/payment.svg";
import klarnaSvg from "../../assets/footer/klarna.svg";
import visaSvg from "../../assets/footer/visa.svg";
import paypalSvg from "../../assets/footer/paypal.svg";
import amexSvg from "../../assets/footer/amex.svg";
import discoverSvg from "../../assets/footer/discover.svg";
import mastercardSvg from "../../assets/footer/mastercard.svg";
import { PRIMARY_COLOUR } from "../../utils";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/threads.png"

const topInfoRow = [
  {
    id: 1,
    image: shipping,
    title: "Free Shipping",
    content: "You will love at great low prices",
  },
  {
    id: 3,
    image: cutomerSvg,
    title: "Customer Support",
    content: "24 hours a day, 7 days a week",
  },
  {
    id: 4,
    image: paymentSvg,
    title: "Flexible Payment",
    content: "Pay with multiple credit cards",
  },
];

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full">
      {/* Top Info Row */}
      <div
        style={{ background: PRIMARY_COLOUR }}
        className="text-white py-6 px-6 sm:px-10 xl:px-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-10 px-6 py-5 text-center sm:text-left">
          {topInfoRow.map((val, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
            >
              <div>
                <img
                  src={val.image}
                  alt="img"
                  className="w-16 h-16 mx-auto sm:mx-0"
                />
              </div>
              <div>
                <p className="font-semibold text-xl mb-1">{val.title}</p>
                <p className="text-sm leading-relaxed">{val.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Contact + Subscribe */}
      <div className="py-10 border-b px-6 sm:px-10 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left items-center">

          {/* CONTACT */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold mb-2">CONTACT US</h3>
            <p style={{ color: PRIMARY_COLOUR }}>+91 9895 380 343</p>
          </div>

          {/* POLICIES */}
          <div className="flex flex-col items-center space-y-1">
            <p
              onClick={() => navigate("/privacy-policy")}
              className="cursor-pointer hover:underline"
            >
              Privacy Policy
            </p>
            <p
              onClick={() => navigate("/terms-condition")}
              className="cursor-pointer hover:underline"
            >
              Terms & Conditions
            </p>
            <p
              onClick={() => navigate("/refund-policy")}
              className="cursor-pointer hover:underline"
            >
              Refund Policy
            </p>
          </div>

          {/* SOCIAL */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-bold mb-2">SOCIAL NETWORKS</h3>
            <div className="flex gap-4">
              <a href="https://www.threads.com/@mysti__aura">
                <img src={logo} alt="" className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/mysti__aura?igsh=Y2Y5eTY3OGg3OWNw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="cursor-pointer hover:scale-110 transition" />
              </a>
            </div>
          </div>

        </div>
      </div>


      {/* Copyright + Payment */}
      <div
        style={{ background: PRIMARY_COLOUR }}
        className=" text-white text-sm py-4"
      >
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
