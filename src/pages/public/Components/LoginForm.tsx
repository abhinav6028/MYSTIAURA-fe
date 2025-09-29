import { Dialog } from '@mui/material'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLogin } from '../../../services/api/auth/auth';
import { Google } from '@mui/icons-material';
import { useLoginWithGoogle } from '../../../services/api/loginWithGoogle';
import type { SendOtpFormProps } from '../../../types/authTypes';
import PopUp from '../../../components/UI/PopUp';


export default function LoginForm({ setShowForm }: SendOtpFormProps) {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const loginUser = useLogin();
    const loginMutation = useLoginWithGoogle();


    const schema = yup.object({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    });

    type FormData = yup.InferType<typeof schema>;

    const {
        handleSubmit,
        control,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const [showPopUp, setShowPopUp] = useState(true)

    // Handle Submit
    const onSubmit = (data: FormData) => {
        loginUser.mutate(data, {
            onSuccess: () => {
                setShowPopUp(!showPopUp)
                // navigate('/home');
            },
        })
    };



    return (

        <>

            {
                showPopUp ?

                    <Dialog open={true}>
                        <div className="fixed inset-0 flex md:items-center items-baseline-last justify-center bg-opacity-100 z-50">
                            <div className="bg-white w-[100%] md:w-[500px] shadow-lg p-6 relative">
                                {/* Title */}
                                <div className='w-full flex items-center justify-between'>

                                    <h2 style={{ fontFamily: 'Prata' }} className="lg:text-3xl text-2xl font-medium text-gray-900 md:mb-1">Welcome</h2>
                                    <X onClick={() => navigate('/')} className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7" strokeWidth={1} />
                                </div>
                                <p className="text-gray-600 sm:text-lg md:mb-4 mb-2">Please login here</p>

                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    {/* Email Field */}
                                    <div className="mb-3">
                                        <label className="block text-gray-700 mb-2">Email Address</label>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <input
                                                        {...field}
                                                        type="email"
                                                        placeholder="alexa.williams@example.com"
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

                                    {/* Password Field */}
                                    <div className="md:mb-4 mb-2">
                                        <label className="block text-gray-700 mb-2">Password</label>
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

                                    {/* Remember Me & Forgot Password */}
                                    <div className="flex items-center justify-between md:mb-5 mb-4">
                                        <label className="flex items-center text-gray-700">
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="w-4 h-4 text-[#660033] border-gray-300 focus:ring-[#660033]"
                                            />
                                            <span className="ml-2">Remember Me</span>
                                        </label>
                                        <p className="text-[#660033] cursor-pointer hover:underline text-sm" onClick={() => setShowForm(2)}>
                                            Forgot Password?
                                        </p>
                                    </div>

                                    {/* Login Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-[#660033] text-white font-semibold py-3 cursor-pointer hover:bg-[#51052b] md:mb-4 mb-2 transition"
                                    >
                                        LOGIN
                                    </button>

                                    {/* Register Button */}
                                    <button
                                        onClick={() => navigate('/register')}
                                        type="button"
                                        className="w-full border border-[#660033] text-[#660033] font-semibold py-3 md:mb-4 mb-2 hover:border-[#51052b] cursor-pointer hover:text-[#51052b] transition"
                                    >
                                        REGISTER
                                    </button>

                                    <button
                                        type="button"
                                        className="w-full border flex items-center justify-center gap-2 border-[PRIMARY_COLOUR] text-[#660033] font-semibold py-3 hover:border-[#51052b] cursor-pointer hover:text-[#51052b] transition"
                                        onClick={() => loginMutation.mutate()}
                                    >
                                        <Google className="w-5 h-5" />
                                        LOGIN WITH GOOGLE
                                    </button>
                                </form>
                            </div>
                        </div>
                    </Dialog>

                    :
                    <PopUp />

            }

        </>
    )
}
