import apiClient from "../../services/apiClient/apiClient";
import { RAZORPAYKEY_ID } from "../../utils";

const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

interface RazorPayDetail { orderId: string; amount: number; currency: string; }

export default function CheckoutButton({ razorPayDetail }: { razorPayDetail: RazorPayDetail }) {


    const handlePayment = async () => {
        const loaded = await loadRazorpayScript();

        if (!loaded) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: RAZORPAYKEY_ID,
            amount: razorPayDetail.amount,
            currency: razorPayDetail.currency,
            name: "MYSTIAURA",
            description: "Order Payment",
            order_id: razorPayDetail.orderId,
            handler: async function (response: any) {
                const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
                await apiClient.post("/api/order/verify-payment", { razorpay_order_id, razorpay_payment_id, razorpay_signature });
            },
            prefill: {
                name: "MYSTIAURA JEWELS",
                email: "Vipinm500@gmail.com",
                contact: "+918139886630",
            },
            theme: { color: "#3399cc" },
        };

        console.log("options", options);


        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <button
            onClick={handlePayment}
            className="text-white px-6 py-3 mt-3 font-semibold w-full bg-primary hover:bg-transparent hover:text-primary border border-primary transition cursor-pointer"
        >
            PAY NOW
        </button>
    );
}
