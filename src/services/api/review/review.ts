import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "../../../utilsComp/useNotify";
import apiClient from "../../apiClient/apiClient";

export function useCreateReview(productId: string) {
    const queryClient = useQueryClient();
    const notify = useNotify();
    return useMutation({
      mutationFn: async (payload: any) => {
        const res = await apiClient.post("api/review", {
          ...payload,
        });
        return res.data;
      },
      onSuccess: (res) => {
        notify.success(res?.message || "Review created");
        queryClient.invalidateQueries({ queryKey: ["products", productId] });
      },
      onError: (error: any) => {
        notify.error(error?.response?.data?.message || "Review creation failed ");
      },
    });
  }