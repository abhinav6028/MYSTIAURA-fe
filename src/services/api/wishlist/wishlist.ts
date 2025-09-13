import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "../../../utilsComp/useNotify";
import apiClient from "../../apiClient/apiClient";

// --- Wishlist Types (you can replace with proper type if available) ---
export type WishListResponse = {
  _id: string;
  products: Array<{
    productId: string;
    name: string;
    price: number;
    image: string;
  }>;
};

// --- Get Wishlist ---
export function useWishList() {
  return useQuery<WishListResponse, Error>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await apiClient.get("api/wishList");
      return res.data?.data as WishListResponse;
    },
  });
}

// --- Add to Wishlist ---
export function useAddToWishList() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (payload: { productId: string }) => {
      const res = await apiClient.post("api/wishList/add", payload);
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Added to wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Failed to add to wishlist");
    },
  });
}

// --- Remove from Wishlist ---
export function useRemoveFromWishList() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await apiClient.delete(`api/wishList/remove/${productId}`);
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Failed to remove from wishlist");
    },
  });
}
