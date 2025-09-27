import { Dialog } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForgotPassword, useResetPassword } from '../../../services/api/auth/auth'; // add reset API
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Validation schemas
const emailSchema = yup.object({
  email: yup.string().required("Pls enter email").email("Pls enter valid email"),
});

const passwordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type EmailForm = yup.InferType<typeof emailSchema>;
type PasswordForm = yup.InferType<typeof passwordSchema>;

export default function ForgotPassword({ setShowForm }: { setShowForm: (form: number) => void }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const forgotPassword = useForgotPassword();
  const resetPassword = useResetPassword();

  // Create two concrete forms to keep typings aligned with their schemas
  const emailForm = useForm<EmailForm>({
    resolver: yupResolver(emailSchema),
  });
  const passwordForm = useForm<PasswordForm>({
    resolver: yupResolver(passwordSchema),
  });

  // Submit handlers for each flow
  const onSubmitEmail = () => {
    const email = emailForm.getValues("email");
    forgotPassword.mutate(
      { email }
    );
  };

  const onSubmitPassword = () => {
    const password = passwordForm.getValues("password");
    if (!id) return; // safety guard
    resetPassword.mutate(
      { code: id, password },
      {
        onSuccess: () => {
          navigate("/login");
          setShowForm(1);
        },
      }
    );
  };

  return (
    <Dialog open={true}>
      <div className="fixed inset-0 flex md:items-center items-baseline-last justify-center bg-opacity-100 z-50">
        <div className="bg-white w-[100%] md:w-[500px] shadow-lg p-6 relative">
          {/* Title */}
          <h2
            style={{ fontFamily: 'Prata' }}
            className="lg:text-3xl text-2xl font-medium text-gray-900 md:mb-1"
          >
            {id ? "Reset Password" : "Forgot Password"}
          </h2>
          <p className="text-gray-600 sm:text-lg md:mb-4 mb-2">
            {id ? "Please enter your new password" : "Please enter your email"}
          </p>

          {!id ? (
            <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} noValidate>
              {/* Email field */}
              <div className="mb-3">
                <label className="block text-gray-700 mb-2">Email</label>
                <Controller
                  name="email"
                  control={emailForm.control}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        {...field}
                        type="email"
                        placeholder="Enter Email"
                        className={`w-full border px-4 py-2 focus:outline-none focus:ring-0 ${
                          fieldState.error ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#660033] text-white font-semibold py-3 cursor-pointer hover:bg-[#51052b] md:mb-4 mb-2 transition"
              >
                NEXT
              </button>
            </form>
          ) : (
            <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} noValidate>
              {/* Password */}
              <div className="mb-3">
                <label className="block text-gray-700 mb-2">Password</label>
                <Controller
                  name="password"
                  control={passwordForm.control}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        {...field}
                        type="password"
                        placeholder="Enter Password"
                        className={`w-full border px-4 py-2 focus:outline-none focus:ring-0 ${
                          fieldState.error ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <Controller
                  name="cpassword"
                  control={passwordForm.control}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        {...field}
                        type="password"
                        placeholder="Confirm Password"
                        className={`w-full border px-4 py-2 focus:outline-none focus:ring-0 ${
                          fieldState.error ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#660033] text-white font-semibold py-3 cursor-pointer hover:bg-[#51052b] md:mb-4 mb-2 transition"
              >
                RESET PASSWORD
              </button>
            </form>
          )}
        </div>
      </div>
    </Dialog>
  );
}
