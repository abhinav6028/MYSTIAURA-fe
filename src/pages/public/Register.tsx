import React, { useState } from "react";
import Header from "../private/Header";
import LayoutContainer from "../../components/layout/LayoutContainer";
import HeroBannerSection from "../../components/homepage/HeroBannerSection";
import ShopByCategory from "../../components/homepage/ShopByCategory";
import ShopByShape from "../../components/homepage/ShopByShape";
import SendOtpForm from "./Components/SendOtpForm";
import VerifyOtpForm from "./Components/VerifyOtpForm";
import PasswordSection from "./Components/PasswordSection";

const Register: React.FC = () => {

  const [showForms, setShowForm] = useState(1)

  

  return ( 
    <div className="w-full">

      {showForms === 1 && <SendOtpForm setShowForm={setShowForm} />}

      {showForms === 2 && <VerifyOtpForm setShowForm={setShowForm} />}

      {showForms === 3 && <PasswordSection setShowForm={setShowForm} />}

      <div>
        <Header />
        <LayoutContainer>
          <HeroBannerSection />
          <ShopByCategory />
          <ShopByShape />
        </LayoutContainer>
      </div>
    </div>
  );
};

export default Register;
