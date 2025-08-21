import React from "react";
import { MenuItem, Select } from "@mui/material";
import { Search, FavoriteBorder, PersonOutline, ShoppingCart } from "@mui/icons-material";
import logo from "../../assets/logo.svg"
import phone from "../../assets/phone.svg"
import LayoutContainer from "../../components/layout/LayoutContainer";

const Header: React.FC = () => {
  const [lang, setLang] = React.useState("EN");
  const [currency, setCurrency] = React.useState("USD");

  return (
    <header className="w-full border-b">
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
          {/* Logo */}
          <img src={logo} alt="PeariGem" className="w-24 sm:w-40" />

          {/* Navigation Links */}
          <nav className="sm:flex hidden gap-8 font-medium text-sm">
            <a href="#" className="hover:text-gray-600">RINGS</a>
            <a href="#" className="hover:text-gray-600">EARRINGS</a>
            <a href="#" className="hover:text-gray-600">BRACELETS</a>
            <a href="#" className="hover:text-gray-600">PENDENTS</a>
            <a href="#" className="hover:text-gray-600">NECKLACES</a>
          </nav>

          {/* Icons */}
          <div className="flex gap-4 items-center">
            <Search className="cursor-pointer !hidden sm:!flex" />
            <FavoriteBorder className="cursor-pointer" />
            <PersonOutline className="cursor-pointer" />
            <ShoppingCart className="cursor-pointer" />
          </div>
        </div>
      </LayoutContainer>
    </header>
  );
};

export default Header;
