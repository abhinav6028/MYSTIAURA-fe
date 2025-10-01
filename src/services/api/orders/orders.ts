import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import apiClient from "../../apiClient/apiClient";
import { useEffect } from "react";
import { orders } from "../../../store/slices/userSlice";

type OrderItem = {
    _id: string;
    quantity: number;
    price: number;
    product: {
        _id: string;
        name: string;
        price: number;
        discountPrice: number;
        images: { secure_url: string }[];
    };
};

type Order = {
    _id: string;
    items: OrderItem[];
    totalAmount: number;
    orderStatus: string;
    createdAt: string;
    total: number;
};

type OrdersResponse = {
    status: boolean;
    orders: {
        status: boolean;
        data: {
            result: Order[];
            total: number;
        };
    };
};

export function useOrders(category?: string) {
    const dispatch = useDispatch();

    const query = useQuery<OrdersResponse, Error>({
        queryKey: ["orders", category],
        queryFn: async () => {
            const res = await apiClient.get("api/order/list", {
                params: category ? { category } : {},
            });
            return res.data;
        },
        retry: false,
    });

    useEffect(() => {
        if (query.data) {
            dispatch(orders(query.data.orders.data.result));
        }
    }, [query.data, dispatch]);

    return query;
}
