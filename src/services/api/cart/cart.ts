import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "../../../utilsComp/useNotify";
import apiClient from "../../apiClient/apiClient";
import type { CartResponse } from "../../../types/cartresponse";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAddCartList } from "../../../store/slices/userSlice";
import type { CartData } from "../../../types/userTypes";

export function useCart() {
  const dispatch = useDispatch();
  const query =  useQuery<CartData, Error>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await apiClient.get("api/cart");
      return res.data?.data as CartData;
    },
    retry: false,
  });

   useEffect(() => {
    if (query.data) {
      dispatch(setAddCartList(query.data));
    }
  }, [query.data, dispatch]);

  return query;
}

// Add to cart
export function useAddToCartProduct() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (payload: Partial<CartResponse>) => {
      const res = await apiClient.post("api/cart/add", payload);
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Add to cart success");
      queryClient.invalidateQueries({ queryKey: ["cart"], refetchType: "all" });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Cart not added");
    },
  });
}

//   update cart
export function useUpdateCart() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const res = await apiClient.put("api/cart/update", { productId, quantity });
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Cart updated");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Failed to update cart");
    },
  });
}

// delete cart
export function useDeleteCartItem() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await apiClient.delete(`api/cart/remove/${productId}`);
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Item removed from cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Failed to remove item");
    },
  });
}

// delete all cart
export function useDeleteAllCartItem() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.delete(`api/cart/removeAll`);
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Item removed from cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Failed to remove item");
    },
  });
}