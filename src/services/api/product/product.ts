import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../apiClient/apiClient";
import { useNotify } from "../../../utilsComp/useNotify";
import type { IAdminFormInputs, Product } from "../../../types/adminTypes";
import { useUploadImages } from "../imageUpload";
import { useNavigate } from "react-router-dom";

// 🔹 Get all products
export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get("api/product/all");
      return res.data.products;
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
  const uploadImages = useUploadImages();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: IAdminFormInputs) => {
      let imageIds: string[] = [];

      // 1️⃣ Upload if images exist
      if (payload.images) {
        const uploadRes = await uploadImages.mutateAsync(payload.images as File[]);
        imageIds = uploadRes?.data?.images || [];
      }
      const res = await apiClient.post("api/product", {
        ...payload,
        images: imageIds,
      });
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Product created");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate(-1);
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Product creation failed ");
    },
  });
}

// 🔹 Update product
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const notify = useNotify();
  const uploadImages = useUploadImages();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ _id, payload }: { _id: string; payload: any }) => {
      let imageIds: string[] = [];

      // 1️⃣ Upload if images exist
      if (payload.images) {
        const uploadRes = await uploadImages.mutateAsync(payload.images as File[]);
        imageIds = uploadRes?.data?.images || [];
      }
      const res = await apiClient.put(`api/product/${_id}`, {
        ...payload,
        images: imageIds,
      });
      return res.data;
    },
    onSuccess: () => {
      notify.success("Product updated ✨");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate(-1);
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Product update failed");
    },
  });
}

// 🔹 Delete product
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await apiClient.delete(`api/product/${productId}`);
      return res.data;
    },
    onSuccess: () => {
      notify.success("Product deleted 🗑️");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Product deletion failed ");
    },
  });
}
