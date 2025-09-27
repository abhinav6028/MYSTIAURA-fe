import React, { useState } from "react";
import SendOtpForm from "./Components/SendOtpForm";
import VerifyOtpForm from "./Components/VerifyOtpForm";
import PasswordSection from "./Components/PasswordSection";
import PublicPageBG from "./Components/Publicbg";

const Register: React.FC = () => {

  const [showForms, setShowForm] = useState(2)

  return ( 
    <div className="w-full">
      {showForms === 1 && <SendOtpForm setShowForm={setShowForm} />}
      {showForms === 2 && <VerifyOtpForm setShowForm={setShowForm} />}
      {showForms === 3 && <PasswordSection setShowForm={setShowForm} />}
      <PublicPageBG />
    </div>
  );
};

export default Register;
