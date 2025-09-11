import { useMutation } from "@tanstack/react-query";
import { useNotify } from "../../utilsComp/useNotify";
import apiClient from "../apiClient/apiClient";

export function useUploadImages() {
  const notify = useNotify();

  return useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });

      const res = await apiClient.post("/api/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data; 
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Image uploaded successfully");
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Image upload failed");
    },
  });
}

export function useDeleteImage() {
  const notify = useNotify();

  return useMutation({
    mutationFn: async ({
      productId,
      imageId,
    }: {
      productId: string;
      imageId: string;
    }) => {
      const res = await apiClient.delete(
        `/api/image/delete/${productId}?image_id=${imageId}`
      );
      return res.data;
    },
    onSuccess: (res) => {
      notify.success(res?.message || "Image deleted successfully");
    },
    onError: (error: any) => {
      notify.error(error.response?.data?.message || "Image deletion failed");
    },
  });
}
