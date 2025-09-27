import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient/apiClient";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";

export function useLoginWithGoogle() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: async () => {
            const res = await apiClient.get("/api/auth/google");
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

