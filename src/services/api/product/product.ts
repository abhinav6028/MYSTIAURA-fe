import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../apiClient/apiClient";
import { useNotify } from "../../../utilsComp/useNotify";
import type { IAdminFormInputs, Product, ProductInput } from "../../../types/adminTypes";

// 🔹 Get all products
export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get("/products");
      return res.data.data;
    },
  });
}

// 🔹 Get product by ID
export function useProduct(productId: string) {
  return useQuery<Product, Error>({
    queryKey: ["products", productId],
    queryFn: async () => {
      const res = await apiClient.get(`/products/${productId}`);
      return res.data.data;
    },
    enabled: !!productId,
  });
}

// 🔹 Create product
export function useCreateProduct() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (payload: IAdminFormInputs) => {
      const res = await apiClient.post("/product", payload);
      return res.data;
    },
    onSuccess: () => {
      notify.success("Product created ✅");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Product creation failed ");
    },
  });
}

// 🔹 Update product
export function useUpdateProduct(productId: string) {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (payload: ProductInput) => {
      const res = await apiClient.put(`/products/${productId}`, payload);
      return res.data;
    },
    onSuccess: () => {
      notify.success("Product updated ✨");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Product update failed ❌");
    },
  });
}

// 🔹 Delete product
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await apiClient.delete(`/products/${productId}`);
      return res.data;
    },
    onSuccess: () => {
      notify.success("Product deleted 🗑️");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Product deletion failed ❌");
    },
  });
}
