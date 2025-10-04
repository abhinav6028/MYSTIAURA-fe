import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import apiClient from "../../apiClient/apiClient";
import { useNotify } from "../../../utilsComp/useNotify";
import type { Category, CategoryInput } from "../../../types/adminTypes";
import { useUploadImages } from "../imageUpload";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "../../../store/slices/userSlice";
import type { AxiosResponse } from "axios";

// 🔹 Get all categories
export function useCategories(params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  search?: string;
}) {
  const dispatch = useDispatch();
  const query = useQuery<AxiosResponse, Error>({
    queryKey: ["categories", params?.page, params?.limit, params?.sortBy, params?.order, params?.search],
    queryFn: async () => {
      const res = await apiClient.get("/api/category", { params });
      return res ;
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
  
  useEffect(() => {
    if (query.data) {
      dispatch(setCategories(query.data as any));
    }
  }, [query.data, dispatch]);

  return query;
}

// 🔹 Get category by ID
export function useCategoryWithId(categoryId: string) {
  return useQuery<Category, Error>({
    queryKey: ["categories", categoryId],
    queryFn: async () => {
      const res = await apiClient.get(`/api/category/${categoryId}`);
      return res.data.category;
    },
    enabled: !!categoryId,
  });
}

// 🔹 Create category
export function useCreateCategory() {
  const queryClient = useQueryClient();
  const notify = useNotify();
  const uploadImages = useUploadImages();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: CategoryInput) => {

      let imageIds: string[] = [];

      // 1️⃣ Upload if images exist
      if (payload.image) {
        const uploadRes = await uploadImages.mutateAsync(payload.image as File[]);
        imageIds = uploadRes?.data?.images?.[0] || [];
      }
      // Directly send JSON
      const res = await apiClient.post("/api/category", {
        name: payload.name,
        description: payload.description,
        image: imageIds,
      });

      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Category created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      navigate("/admin/category");
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Category creation failed");
    },
  });
}

// 🔹 Update category
export function useUpdateCategory() {
  const notify = useNotify();
  const queryClient = useQueryClient();
  const uploadImages = useUploadImages();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ _id, payload }: { _id: string; payload: CategoryInput }) => {
      let imageIds: string[] | string = [];
      console.log(payload);

      // 1️⃣ Upload if images exist
      if (payload.image instanceof FileList) {
        const uploadRes = await uploadImages.mutateAsync(Array.from(payload.image));
        imageIds = uploadRes?.data?.images || [];
      } else if (Array.isArray(payload.image) && payload.image[0] instanceof File) {
        const uploadRes = await uploadImages.mutateAsync(payload.image);
        imageIds = uploadRes?.data?.images || [];
      } else if (typeof payload.image === "string") {
        // It’s an existing image URL from Cloudinary → skip upload
        imageIds = payload.image;
      }

      const res = await apiClient.patch(`/api/category/${_id}`, {
        ...payload,
        image: imageIds,
      });

      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Category updated");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      navigate("/admin/category");
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Update failed");
    },
  });
}

// 🔹 Delete category
export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: async (categoryId: string) => {
      const res = await apiClient.delete(`/api/category/${categoryId}`);
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Category deleted 🗑️");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Category deletion failed ❌");
    },
  });
}
