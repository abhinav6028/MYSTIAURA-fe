import { useState } from 'react'
import { Dialog } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from 'lucide-react';
import type { SendOtpFormProps } from '../../../types/authTypes';
import { useVerifyOtp } from '../../../services/api/auth/auth';
import { useAppSelector } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    otp: yup.string().matches(/^\d{6}$/, "OTP must be exactly 6 digits").required("OTP is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    cpassword: yup.string().oneOf([yup.ref("password"), undefined], "Passwords must match").required("Confirm password is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function PasswordSection({ setShowForm }: SendOtpFormProps) {

    const [showPassword, setShowPassword] = useState(false);
    const state = useAppSelector(state => state.auth);
    const verifyOtp = useVerifyOtp();
    const navigate = useNavigate();


    const { handleSubmit, control } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: state.email ?? "",
        },
    });

    const onSubmit = (data: FormData) => {
        verifyOtp.mutate(data, {
            onSuccess: () => {
                navigate('/login');
            },
        });
    };

    return (
        <Dialog open={true}>
            <div className="fixed inset-0 flex md:items-center items-baseline-last justify-center bg-opacity-100 z-50">
                <div className="bg-white w-[100%] md:w-[500px] shadow-lg p-6 relative">
                    {/* Title */}
                    <h2 style={{ fontFamily: 'Prata' }}
                        className="lg:text-3xl text-2xl font-medium text-gray-900 md:mb-1 flex items-center gap-2">
                        <IoArrowBack
                            className="cursor-pointer hover:text-gray-700"
                            onClick={() => setShowForm(1)}
                            size={28} // you can adjust size
                        />
                        Verify OTP & Set Password
                    </h2>
                    <p className="text-gray-600 sm:text-sm md:mb-4 mb-2">
                        Enter the 6-digit OTP sent to your email and create your new password.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Enter Email */}
                        <div className="md:mb-4 mb-2">
                            <label className="block text-gray-700 mb-2">Your Email</label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <input
                                            {...field}
                                            type="email"
                                            disabled
                                            placeholder="Enter Email"
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
                        {/* Enter otp */}
                        <div className="md:mb-4 mb-2">
                            <label className="block text-gray-700 mb-2">Enter Your OTP</label>
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
                                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                        />
                                        {fieldState.error && (
                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        {/* Email Field */}
                        <div className="md:mb-4 mb-2">
                            <label className="block text-gray-700 mb-2">Enter password</label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <div className="relative">
                                            <input
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className={`w-full border px-4 py-2 pr-10 focus:outline-none focus:ring-0 ${fieldState.error ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                        {fieldState.error && (
                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="md:mb-4 mb-2">
                            <label className="block text-gray-700 mb-2">Confirm password</label>
                            <Controller
                                name="cpassword"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <div className="relative">
                                            <input
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className={`w-full border px-4 py-2 pr-10 focus:outline-none focus:ring-0 ${fieldState.error ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
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
                            SUBMIT
                        </button>

                    </form>
                </div>
            </div>
        </Dialog>
    )
}
