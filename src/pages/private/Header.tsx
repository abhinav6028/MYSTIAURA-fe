import React from "react";
import { MenuItem, Select } from "@mui/material";
import logo from "../../assets/logo.svg"
import phone from "../../assets/phone.svg"
import { CircleUser, Heart, Search, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../services/api/auth/auth";
import LayoutContainer from "../../components/layout/LayoutContainer";

const Header: React.FC = () => {
  const [lang, setLang] = React.useState("EN");
  const [currency, setCurrency] = React.useState("USD");
  const logoutuser = useLogout();

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutuser();
    navigate("/login");
  }

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className=" py-2 text-sm border-b bg-gray-50">
        <LayoutContainer>
          <div className="sm:flex hidden justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={phone} alt="phone" />
              <span>(307) 555-0133</span>
            </div>
            <span className="text-center flex-1 font-medium">
              Get 50% OFF on Engagement Rings
            </span>
            <div className="flex items-center gap-4">
              {/* Language Dropdown */}
              <Select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                variant="standard"
                disableUnderline
                className="text-sm"
              >
                <MenuItem value="EN">EN</MenuItem>
                <MenuItem value="FR">FR</MenuItem>
                <MenuItem value="ES">ES</MenuItem>
              </Select>

              {/* Currency Dropdown */}
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                variant="standard"
                disableUnderline
                className="text-sm"
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </div>
          </div>
        </LayoutContainer>
      </div>

      {/* Main Navbar */}
      <LayoutContainer>
      <div className="flex justify-between items-center py-4">
        <img src={logo} alt="PeariGem" onClick={handleLogout} />

        {/* Navigation Links */}
        <nav className="flex gap-8 font-medium text-sm ">
          <a href="#" className="hover:text-gray-600">RINGS</a>
          <a href="#" className="hover:text-gray-600">EARRINGS</a>
          <a href="#" className="hover:text-gray-600">BRACELETS</a>
          <a href="#" className="hover:text-gray-600">PENDENTS</a>
          <a href="#" className="hover:text-gray-600">NECKLACES</a>
        </nav>

        {/* Icons */}
        <div className="flex gap-4 items-center">
          <Search className="cursor-pointer" size={25} strokeWidth={1} />
          <Heart className="cursor-pointer" size={25} strokeWidth={1} />
          <CircleUser className="cursor-pointer" size={25} strokeWidth={1} />
          <ShoppingCart onClick={() => navigate('/mycart')} className="cursor-pointer" size={25} strokeWidth={1} />

        </div>
      </div>
      </LayoutContainer>
    </header>

  );
};

export default Header;

