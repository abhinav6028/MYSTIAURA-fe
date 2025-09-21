import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "../../../utilsComp/useNotify";
import apiClient from "../../apiClient/apiClient";

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

  return useMutation({
    mutationFn: async (payload: Partial<ICheckout>) => {
      const res = await apiClient.post("/api/order/create", payload);
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