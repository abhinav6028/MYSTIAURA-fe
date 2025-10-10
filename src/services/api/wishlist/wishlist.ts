import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "../../../utilsComp/useNotify";
import apiClient from "../../apiClient/apiClient";
import type { Wishlist } from "../../../types/userTypes";
import { setWishlistProducts } from "../../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

// --- Get Wishlist ---
export function useWishList(isAuthenticated?: boolean) {
  const dispatch = useDispatch();

  const query = useQuery<Wishlist, Error>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await apiClient.get("api/wishList");
      return res.data?.data as Wishlist;
    },
    retry: false,
    enabled: !!isAuthenticated, // <-- ensure it's a boolean
  });

  useEffect(() => {
    if (query.data && isAuthenticated) { // only dispatch if authenticated
      dispatch(setWishlistProducts([query.data]));
    }
  }, [query.data, dispatch, isAuthenticated]);

  return query;
}



// --- Add to Wishlist ---
export function useAddToWishList() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (payload: { productid: string }) => {
      const res = await apiClient.post("/api/wishList/add", payload);
      return res.data;
    },
    onSuccess: () => {
      // notify.success(res?.message || "Added to wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"], refetchType: "all" });
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
    onSuccess: () => {
      // notify.success(res?.message || "Removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Failed to remove from wishlist");
    },
  });
}
