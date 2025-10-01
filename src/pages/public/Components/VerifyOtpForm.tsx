import { Dialog } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    otp: yup.string().required("Pls enter OTP"),
});

type FormData = yup.InferType<typeof schema>;

export default function VerifyOtpForm({ setShowForm }: { setShowForm: (form: number) => void }) {

    const { handleSubmit, control } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = () => {
        setShowForm(3)
    };

    return (
        <Dialog open={true}>
            <div className="fixed inset-0 flex md:items-center items-baseline-last justify-center bg-opacity-100 z-50">
                <div className="bg-white w-[100%] md:w-[500px] shadow-lg p-6 relative">
                    {/* Title */}
                    <h2 style={{ fontFamily: 'Prata' }} className="lg:text-3xl text-2xl font-medium text-gray-900 md:mb-1">Verify OTP</h2>
                    <p className="text-gray-600 sm:text-lg md:mb-4 mb-2">Please Enter OTP</p>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Email Field */}
                        <div className="mb-3">
                            <label className="block text-gray-700 mb-2">Enter OTP</label>
                            <Controller
                                name="otp"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <input
                                            {...field}
                                            type="number"
                                            placeholder="Enter OTP"
                                            className={`w-full border px-4 py-2 focus:outline-none focus:ring-0 ${fieldState.error ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        {fieldState.error && (
                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#660033] text-white font-semibold py-3 cursor-pointer hover:bg-[#51052b] md:mb-4 mb-2 transition"
                        >
                            VERIFY OTP
                        </button>

                    </form>
                </div>
            </div>
        </Dialog>
    )
}
