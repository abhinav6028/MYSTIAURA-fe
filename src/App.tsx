// import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import logo from "../src/assets/whatsapp.png"

function App() {

  return (
    <Router>
      <div>
        <div
          className="cursor-pointer jump"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px",
            borderRadius: "50%",
            zIndex: 1000,
            // backgroundColor: "#25D366", // WhatsApp green
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            const phoneNumber = "9895380343";
            const message = encodeURIComponent("Hello!");
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
          }}
        >
          <img
            src={logo}
            alt=""
            className="h-15 w-15"
          />

        </div>
        <AppRoutes />
      </div>
    </Router >
  );
}
export default App;