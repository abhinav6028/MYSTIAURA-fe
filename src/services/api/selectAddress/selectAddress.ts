import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../apiClient/apiClient";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import type { Address } from "../../../types/address";
import { setAddresses } from "../../../store/slices/userSlice";
import { useNotify } from "../../../utilsComp/useNotify";

// Get all addresses and store in Redux
export function useAddresses() {
  const dispatch = useDispatch();

  const query = useQuery<Address[], Error>({
    queryKey: ["addresses"],
    queryFn: async () => {
      const res = await apiClient.get("/api/address");
      return res.data?.data || []; // assuming API returns { data: Address[] }
    },
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setAddresses(query.data));
    }
  }, [query.data, dispatch]);

  return query;
}

export function useCreateAddress() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (newAddress: Address) => {
      const res = await apiClient.post("/api/address", newAddress);
      return res.data.address; // assuming API returns { address: Address }
    },
    onSuccess: () => {
      notify.success("Address created successfully!");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (err: any) => {
      notify.error(err.response?.data?.message || "Failed to create address");
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (updatedAddress: Address) => {
      if (!updatedAddress._id) throw new Error("Address ID is required");
      const res = await apiClient.put(`/api/address/${updatedAddress._id}`, updatedAddress);
      return res.data.address;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Address updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (err: any) => {
      notify.error(err.response?.data?.message || "Failed to update address");
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (addressId: string) => {
      const res = await apiClient.delete(`/api/address/${addressId}`);
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res.message || "Address deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (err: any) => {
      notify.error(err.response?.data?.message || "Failed to delete address");
    },
  });
}