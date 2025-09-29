
import { Dialog } from "@mui/material";
import { CheckCircle } from "lucide-react"; // or any icon you like

export default function PopUp() {
    return (
        <Dialog open={true} onClose={() => { }}>
            <div className="fixed inset-0 flex items-end sm:items-center justify-center bg-black/30 z-50">
                {/* Wrapper */}
                <div className="bg-white shadow-lg text-center relative w-full p-6  sm:w-[90%] md:w-[400px]">
                    {/* Icon */}
                    <div className="flex items-center justify-center mb-6">
                        <div
                            className="w-16 h-16 flex items-center justify-center rounded-full border-4"
                            style={{ borderColor: "#e6ccd9" }}
                        >
                            <div
                                className="w-10 h-10 flex items-center justify-center rounded-full"
                                style={{ backgroundColor: "#660033" }}
                            >
                                <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h2
                        style={{ fontFamily: "Prata" }}
                        className="lg:text-3xl text-2xl font-medium text-gray-900 mb-2"
                    >
                        Successfully Login
                    </h2>

                    {/* Message */}
                    <p className="text-gray-600 text-sm mb-6">
                        Your password has been updated successfully
                    </p>

                    {/* Button */}
                    <button
                        type="button"
                        className="w-full border border-[#660033] text-[#660033] font-semibold py-3 mb-2 hover:border-[#51052b] hover:text-[#51052b] transition"
                    >
                        BACK TO HOME PAGE
                    </button>
                </div>
            </div>
        </Dialog>
    );
}
