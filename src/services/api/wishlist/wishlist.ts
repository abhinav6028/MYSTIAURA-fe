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
    // enabled: !!isAuthenticated, 
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
    mutationFn: async (payload: { productid: any, isAuthenticated: boolean }) => {
      if (!payload.isAuthenticated) {
        const existingWishlist = JSON.parse(
          localStorage.getItem("wishlist_temp") ?? "[]"
        );

        existingWishlist.push(payload.productid);

        localStorage.setItem(
          "wishlist_temp",
          JSON.stringify(existingWishlist)
        );
        return;
      }
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
    mutationFn: async ({ productId, isAuthenticated }: { productId: string, isAuthenticated?: boolean }) => {
      if (!isAuthenticated) {
        // For guest users - remove from localStorage
        const existingWishlist: string[] = JSON.parse(
          localStorage.getItem("wishlist_temp") ?? "[]"
        );
        console.log("existingWishlist",existingWishlist);
        
        
        // Filter out the product ID
        const updatedWishlist = existingWishlist.filter((id: any) => id?._id !== productId);
        
        localStorage.setItem("wishlist_temp", JSON.stringify(updatedWishlist));
        return { success: true, message: "Removed from wishlist" };
      }
      
      // For authenticated users - call the API
      const res = await apiClient.delete(`api/wishList/remove/${productId}`);
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (variables.isAuthenticated) {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      } else {
        // Force re-render for guest users
        window.dispatchEvent(new Event("storage"));
      }
      notify.success(data?.message || "Removed from wishlist");
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Failed to remove from wishlist");
    },
  });
}
