import { Dialog } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../../services/api/auth/auth';
import type { Sendotp, SendOtpFormProps } from '../../../types/authTypes';
import { HiHome } from 'react-icons/hi';

const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    name: yup.string().required("Name is required"),
});


type FormData = yup.InferType<typeof schema>;

export default function SendOtpForm({ setShowForm }: SendOtpFormProps) {

    const navigate = useNavigate();
    const registerMutation = useRegister();

    const { handleSubmit, control } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: Sendotp) => {
        registerMutation.mutate(data, {
            onSuccess: () => {
                setShowForm(3);
            },
        });
    };

    return (
        <Dialog open={true}>
            <div className="fixed inset-0 flex md:items-center items-baseline-last justify-center bg-opacity-100 z-50">
                <div className="bg-white w-[100%] md:w-[500px] shadow-lg p-6 relative">
                    {/* Title */}
                    <HiHome size={40} color="#fff"
                    onClick={() => navigate('/home')}
                    className='cursor-pointer absolute top-[50%] right-[-20px] translate-x-1/2 z-[9999] w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-10 lg:h-10 bg-primary rounded-full p-2' />

                    <h2 style={{ fontFamily: 'Prata' }} className="lg:text-3xl text-2xl font-medium text-gray-900 md:mb-1">Create New Account</h2>
                    <p className="text-gray-600 sm:text-lg md:mb-4 mb-2">Please Enter Details</p>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>

                        {/* Name Field */}
                        <div className="md:mb-4 mb-2">
                            <label className="block text-gray-700 mb-2">Name</label>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="alexa williams"
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

                        {/* Email Field */}
                        <div className="md:mb-4 mb-2">
                            <label className="block text-gray-700 mb-2">Email</label>
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

                        {/* Login Button */}
                        <button
                            onClick={() => { setShowForm(2) }}
                            type="submit"
                            className="w-full bg-[#660033] text-white font-semibold py-3 cursor-pointer hover:bg-[#51052b] md:mb-4 mb-2 transition"
                        >
                            SEND OTP
                        </button>

                        {/* Register Button */}
                        <button
                            onClick={() => navigate('/login')}
                            type="button"
                            className="w-full border border-[#660033] text-[#660033] font-semibold py-3 md:mb-4 mb-2 hover:border-[#51052b] cursor-pointer hover:text-[#51052b] transition"
                        >
                            LOGIN
                        </button>
                    </form>
                </div>
            </div>
        </Dialog>

    )
}
