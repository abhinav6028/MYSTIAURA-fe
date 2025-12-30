import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "../../../utilsComp/useNotify";
import apiClient from "../../apiClient/apiClient";
import { useAppSelector } from "../../../store/hooks";

interface ICheckout {
  items: {
    product: string;
    quantity: number;
    price: number;
  }
  selectAddress: string;
}

// Add to cart
export function useCheckout() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  return useMutation({
    mutationFn: async (payload: Partial<ICheckout>) => {
      const res = await apiClient.post(
        isAuthenticated ? "/api/order/create" : "/api/order/guest/create",
        payload);
      // /order/guest/create
      return res.data;
    },
    onSuccess: (_res) => {
      // notify.success(res?.message || "Add to cart success");
      queryClient.invalidateQueries({ queryKey: ["cart"], refetchType: "all" });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Cart not added");
    },
  });
}