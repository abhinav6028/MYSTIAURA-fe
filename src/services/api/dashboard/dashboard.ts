import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import apiClient from "../../apiClient/apiClient";
import { useEffect } from "react";
import { selectedDashboad } from "../../../store/slices/userSlice";

export function useDashBoardStatus(category?: string) {
    const dispatch = useDispatch();

    const query = useQuery<AxiosResponse, Error>({
        queryKey: ["dashboard", category],
        queryFn: async () => {
            return apiClient.get("api/dashboard/stats?startDate=2025-09-01&endDate=2025-10-2", {
                params: category ? { category } : {},
            });
        },
        retry: false,
    });

    useEffect(() => {
        if (query.data) {
            dispatch(selectedDashboad(query.data));
        }
    }, [query.data, dispatch]);

    return query;
}

export function useDashBoardLatestProducts(category?: string) {
    const dispatch = useDispatch();

    const query = useQuery<AxiosResponse, Error>({
        queryKey: ["latestProducts", category],
        queryFn: async () => {
            return apiClient.get("api/dashboard/latest-products", {
                params: category ? { category } : {},
            });
        },
        retry: false,
    });

    useEffect(() => {
        if (query.data) {
            dispatch(selectedDashboad(query.data));
        }
    }, [query.data, dispatch]);

    return query;
}


export function useDashBoardLatestOrders(category?: string) {
    const dispatch = useDispatch();

    const query = useQuery<AxiosResponse, Error>({
        queryKey: ["latestOrders", category],
        queryFn: async () => {
            return apiClient.get("api/dashboard/latest-orders", {
                params: category ? { category } : {},
            });
        },
        retry: false,
    });

    useEffect(() => {
        if (query.data) {
            dispatch(selectedDashboad(query.data));
        }
    }, [query.data, dispatch]);

    return query;
}


// latest orders