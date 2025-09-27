import { useEffect, useRef, useState } from "react";
import { Badge } from "@mui/material";
import logo from "../../assets/logohorizontal.svg"
import phone from "../../assets/phone.svg"
import { CircleUser, Heart, Search, ShoppingCart, Menu, X, Instagram, Facebook, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useLogout } from "../../services/api/auth/auth";
import LayoutContainer from "../../components/layout/LayoutContainer";
import { useAppSelector } from "../../store/hooks";
import { useWishList } from "../../services/api/wishlist/wishlist";
import { useCart } from "../../services/api/cart/cart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: wishlistData } = useWishList();
  const { data: cartData } = useCart();
  const wishlistCount = wishlistData?.totalCount ?? 0;
  const cartCount = cartData?.totalCount ?? 0;
  // const logoutuser = useLogout();

  const navigate = useNavigate();

  // const handleLogout = () => {
  //   logoutuser();
  //   navigate("/login");
  // }

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const navItems = [
    { name: 'RINGS', href: 'RINGS' },
    { name: 'EARRINGS', href: 'EARRINGS' },
    { name: 'BRACELETS', href: 'BRACELETS' },
    { name: 'PENDENTS', href: 'PENDENTS' },
    { name: 'NECKLACES', href: 'NECKLACES' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = () => {
    setIsMenuOpen(false);
  };

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const socials = [
    { name: "Instagram", icon: Instagram },
    { name: "Facebook", icon: Facebook },
    { name: "Twitter", icon: Twitter },
  ];

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white backdrop-blur-md shadow-lg border-b border-gray-200/20'
        : 'bg-white backdrop-blur-sm'
        }`}>

        <LayoutContainer>

          <div className="w-full hidden lg:flex  justify-between items-center   sm:py-2 py-2 md:py-3 lg:py-3">
            <div className="flex items-center md:gap-1 lg:gap-2 md:text-[18px] sm:text-[15px] text-[10px]">
              <img src={phone} alt="phone" className="w-3 h-3 lg:w-6 lg:h-6 md:w-6 md:h-6 sm:w-5 sm:h-5" />
              <span className="ml:1">(307) 555-0133</span>
            </div>
            <span className="text-center flex-1 font-medium md:text-[18px] text-[10px]"> Get 50% OFF on Engagement Rings
            </span>
            <div className="flex items-center sm:gap-2 md:gap-3 lg:gap-4">
              {/* Language Dropdown */}

              {!isAuthenticated &&
                <button onClick={() => navigate('/login')} className="md:flex hidden bg-[#660033] text-white font-semibold md:py-2 py-2 md:px-4 cursor-pointer px-2 text-sm sm:text-md hover:bg-[#51052b] transition-colors w-full sm:w-auto">
                  LOG IN
                </button>
              }
            </div>
          </div>

        </LayoutContainer>

        <LayoutContainer>
          <div className="flex justify-between items-center py-4">

            <img
              src={logo}
              alt="PeariGem"
              onClick={() => navigate('/')}
              className="w-35 sm:w-28 md:w-32 lg:w-40 xl:w-48 h-auto cursor-pointer"

            />


            {/* Navigation Links */}
            <nav className="hidden lg:flex gap-8 font-medium text-sm">
              {
                navItems?.map((data, index) =>
                  <a key={index} onClick={() => navigate(`categories/${data?.href}`)} className="hover:text-gray-600 cursor-pointer">{data?.name}</a>
                )
              }

            </nav>

            {/* Icons */}
            <div className="flex sm:gap-2 gap-2 md:gap-4 items-center">
              <Search className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7" strokeWidth={1} />

              <Badge badgeContent={wishlistCount} color="primary">

                <Heart onClick={() => navigate('/user/wishlist')} className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7" strokeWidth={1} />

              </Badge>



              {
                isAuthenticated &&
                <div className="relative" ref={menuRef}>
                  <CircleUser
                    className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                    strokeWidth={1}
                    onClick={() => setOpen((prev) => !prev)}
                  />

                  {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg py-2 z-50">
                      <button className="w-full px-4 py-2 text-md font-medium text-gray-700 hover:bg-gray-100 text-left cursor-pointer">
                        Profile
                      </button>
                      <button className="w-full px-4 py-2 text-md font-medium text-[#660033] hover:bg-gray-100 text-left cursor-pointer">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              }

              <Badge badgeContent={cartCount} color="primary">

                <ShoppingCart onClick={() => navigate('/user/mycart')} className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7" strokeWidth={1} />
              </Badge>


              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className={`lg:hidden z-50 p-2 rounded-lg transition-all duration-300 ${isMenuOpen
                  ? 'bg-white text-gray-900'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <div className="relative w-6 h-6">
                  <Menu strokeWidth={1} className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                    }`} />
                  {/* <X /> */}
                  <X strokeWidth={1} className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                    }`} />
                </div>
              </button>

            </div>
          </div>
        </LayoutContainer>

      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMenuOpen
        ? 'opacity-100 pointer-events-auto'
        : 'opacity-0 pointer-events-none'
        }`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={toggleMenu}
        ></div>

        {/* Full-screen menu sliding from left */}
        <div className={`absolute top-0 left-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-all duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {/* Menu */}
            </h2>
          </div>

          {/* Navigation Items */}
          <div className="px-6 py-8 space-y-2">
            {navItems.map((item, index) => {
              // const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleItemClick()}
                  className={`flex items-center space-x-4 px-4 py-2 rounded-xl text-lg transition-all duration-300 group relative overflow-hidden`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <a href="#" className="hover:text-gray-600">{item.name}</a>
                  {/* <span className="relative z-10">{item.name}</span> */}
                </a>
              );
            })}

          </div>

          <div className={`px-6 pb-6 border-t border-gray-200 pt-6 transition-all duration-500 ${isMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: isMenuOpen ? '700ms' : '0ms' }}
          >
            <p className="text-sm text-gray-500 mb-4">Connect with us</p>
            <div className="flex space-x-4">
              {socials.map((social, index) => {
                const Icon = social.icon; // alias to render as a component
                return (
                  <div
                    key={`${social.name}-${index}`}   // ✅ unique string key
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 cursor-pointer transform hover:scale-110"
                  >
                    <Icon size={18} strokeWidth={1} />   {/* ✅ render component */}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slideInFromLeft 0.5s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }

        /* Custom scrollbar for mobile menu */
        .mobile-menu::-webkit-scrollbar {
          width: 4px;
        }

        .mobile-menu::-webkit-scrollbar-track {
          background: transparent;
        }

        .mobile-menu::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 2px;
        }

        .mobile-menu::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </>
  );
};

export default Header;


