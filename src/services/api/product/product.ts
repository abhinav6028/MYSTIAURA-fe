import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
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
export function useProducts(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  status?: string;        // Add    status
  start_date?: string;     // Add startDate
  end_date?: string;       // Add endDate
}) {
  const dispatch = useDispatch();

  const query = useQuery<AxiosResponse, Error>({
    queryKey: [
      "products",
      params?.page,
      params?.limit,
      params?.category,
      params?.search,
      params?.minPrice,
      params?.maxPrice,
      params?.status,      // Add status to queryKey
      params?.start_date,   // Add startDate to queryKey
      params?.end_date      // Add endDate to queryKey
    ],
    queryFn: async () => {
      // Create a new params object to avoid mutating the original
      const queryParams = { ...params };
      // Remove undefined values
      Object.keys(queryParams).forEach(key => 
        queryParams[key as keyof typeof queryParams] === undefined && 
        delete queryParams[key as keyof typeof queryParams]
      );
      
      return apiClient.get("api/product/all", {
        params: queryParams,
      });
    },
    placeholderData: keepPreviousData,
    retry: false,
  });

  useEffect(() => {
    if (query.data?.data) {  // Make sure data exists before dispatching
      // Only dispatch the data part, not the entire Axios response
      dispatch(selectedProductCategory(query.data.data));
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