import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient/apiClient";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";

export function useLoginWithGoogle1() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: async () => {
            const res = await apiClient.get("/api/auth/google/callback");
            return res.data;
        },
        onSuccess: (res) => {
            dispatch(
                setCredentials({
                  token: res.data.token,
                  user: {
                    email: res.data.email,
                    role: res.data.role,
                  },
                })
              );
            navigate("/user/home");
        },
    });
}

export function useLoginWithGoogle() {
  // This hook only returns a function to trigger Google login
  const login = () => {
    
    window.location.href = "https://api.mystiaura.net/api/auth/google";
  };

  return { login };
}
