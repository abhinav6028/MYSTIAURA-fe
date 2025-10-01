import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import type { AxiosResponse } from "axios";
import apiClient from "../../apiClient/apiClient"; import { useEffect } from "react";
import { selectedProductCategory } from "../../../store/slices/userSlice";

export function useOrders(category?: string) {
    const dispatch = useDispatch();

    const query = useQuery<AxiosResponse, Error>({
        queryKey: ["orders", category],
        queryFn: async () => {
            return apiClient.get("api/dashboard/orders", {
                params: category ? { category } : {},
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