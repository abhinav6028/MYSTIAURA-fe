import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNotify } from "../../../utilsComp/useNotify";
import apiClient from "../../apiClient/apiClient";
import { logout, setCredentials, setEmail } from "../../../store/slices/authSlice";
import type { Sendotp } from "../../../types/authTypes";

//  Register mutation
export function useRegister() {
    const dispatch = useDispatch();
    const notify = useNotify();

    return useMutation({
        mutationFn: async (payload: Sendotp) => {
            const res = await apiClient.post("/auth/register", payload);
            return res.data;
        },
        onSuccess: (data) => {
            dispatch(setEmail(data?.data?.email));
            notify.success("Registration successful");
        },
        onError: (error: any) => {
            notify.error(error.response?.data?.message || "Registration failed");
        },
    });
}

// verify otp
export function useVerifyOtp() {
    const notify = useNotify();

    return useMutation({
        mutationFn: async (payload: { email: string; otp: string; password: string; cpassword: string }) => {
            const res = await apiClient.post("/auth/verify", payload);
            return res.data;
        },
        onSuccess: () => {
            notify.success("OTP verified successfully");
        },
        onError: (error: any) => {
            notify.error(error.response?.data?.message || "OTP verification failed");
        },
    });
}

//  Login mutation
export function useLogin() {
    const dispatch = useDispatch();
    const notify = useNotify();
  
    return useMutation({
      mutationFn: async (payload: { email: string; password: string }) => {
        const res = await apiClient.post("/auth/login", payload);
        return res.data;
      },
      onSuccess: (data) => {
        const userData = data?.data?.users;
        if (userData) {
          dispatch(
            setCredentials({
              token: userData.token,
              user: {
                email: userData.email,
                role: userData.role,
              },
            })
          );
        }
        notify.success(data?.message || "Login successful 🎉");
      },
      onError: (error: any) => {
        notify.error(error.response?.data?.message || "Login failed ❌");
      },
    });
  }

//  Logout (optional)
export function useLogout() {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    return () => {
        dispatch(logout());
        queryClient.clear(); // clears cached queries
        localStorage.removeItem("token"); // optional
    };
}
