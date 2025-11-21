import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import apiClient from "../../apiClient/apiClient";
import { useNotify } from "../../../utilsComp/useNotify";
import type { User, UserInput } from "../../../types/adminTypes";
import { useNavigate } from "react-router-dom";
import type { AxiosResponse } from "axios";

interface UsersResponse {
    users: User[];
    total: number;
}


// 🔹 Get all users
export function useUsers(params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  search?: string;
  role?: string;
  isVerified?: boolean;
}) {
  return useQuery<AxiosResponse<UsersResponse>, Error>({
    queryKey: ["users", params],
    queryFn: async () => {
      const res = await apiClient.get("/api/user", { params });
      return res;
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
}

// 🔹 Get user by ID
export function useUser(userId: string) {
  return useQuery<User, Error>({
    queryKey: ["users", userId],
    queryFn: async () => {
      const res = await apiClient.get(`/api/user/${userId}`);
      return res.data.data;
    },
    enabled: !!userId,
  });
}

// 🔹 Create user
export function useCreateUser() {
  const queryClient = useQueryClient();
  const notify = useNotify();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: UserInput) => {
      const res = await apiClient.post("/api/user", payload);
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "User created");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/admin/users");
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "User creation failed");
    },
  });
}

// 🔹 Update user
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const notify = useNotify();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UserInput }) => {
      const res = await apiClient.patch(`/api/user/${id}`, payload);
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "User updated");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/admin/users");
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "User update failed");
    },
  });
}


// 🔹 Delete user
export function useDeleteUser() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await apiClient.delete(`/api/user/${userId}`);
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "User deleted");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "User deletion failed");
    },
  });
}

// user own profile edit section

// userdata fetch
export function useUserProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await apiClient.get("/api/user/profile");
      return res.data.data; // should return { name, email, phone, address }
    },
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await apiClient.put("/api/user/profile", payload);
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Failed to update profile");
    },
  });
}


