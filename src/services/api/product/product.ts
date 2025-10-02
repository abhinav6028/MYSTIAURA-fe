import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../apiClient/apiClient";
import { useNotify } from "../../../utilsComp/useNotify";
import type { IAdminFormInputs } from "../../../types/adminTypes";
import { useUploadImages } from "../imageUpload";
import { useNavigate } from "react-router-dom";
import { selectedProductCategory, setSellerProducts, setSingleProduct } from "../../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import type { BestSellerProduct, SingleProduct } from "../../../types/userTypes";
import { useEffect } from "react";
import type { AxiosResponse } from "axios";

// 🔹 Get all products
export function useProducts(category?: string, page?: number, limit?: number) {
  const dispatch = useDispatch();

  const query = useQuery<AxiosResponse, Error>({
    queryKey: ["products", category, page, limit],
    queryFn: async () => {
      return apiClient.get("api/product/all", {
        params: category ? { category, page, limit } : { page, limit },
      });
    },
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(selectedProductCategory(query.data));
    }
  }, [query.data, dispatch]);

  return query;
}

// Product list with pagination
export function useProductList(page: number, limit: number) {
  const dispatch = useDispatch();

  const query = useQuery<BestSellerProduct, Error>({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const res = await apiClient.get("api/product/trending-products", {
        params: { isFeatured: true, page, limit },
      });
      return res.data.products as BestSellerProduct; // ✅ return the full object
    },
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setSellerProducts(query.data as any)); // ✅ already BestSellerProduct
    }
  }, [query.data, dispatch]);

  return query;
}

// 🔹 Get product by ID
export function useProductWithId(productId: string) {
  const dispatch = useDispatch();
  const query = useQuery<SingleProduct, Error>({
    queryKey: ["products", productId],
    queryFn: async () => {
      const res = await apiClient.get(`api/product/${productId}`);
      return res.data.data;
    },
    retry: false,
    enabled: !!productId,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setSingleProduct(query.data as any));
    }
  }, [query.data, dispatch]);

  return query;
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
      if (payload.images.length > 0) {
        const uploadRes = await uploadImages.mutateAsync(payload.images as File[]);
        imageIds = uploadRes?.data?.images || [];
      }
      const res = await apiClient.put(`api/product/${_id}`, {
        ...payload,
        images: [...payload.imageContainer, ...imageIds],
      });
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Product updated");
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
      notify.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Product deletion failed ");
    },
  });
}