import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import apiClient from "../../apiClient/apiClient";
import { useEffect } from "react";
import { orders } from "../../../store/slices/userSlice";
import { useNotify } from "../../../utilsComp/useNotify";


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

export interface OrderPayload {
    items: {
        product: string;
        price: number;
        quantity: number;
    }[];
    shippingAddress: {
        name: string;
        phone: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    totalAmount: number;
    status: string;
}


export interface SingleOrder {
    shippingAddress: {
        name: string,
        addressLine1: string
        addressLine2: string,
        city: string,
        state: string,
        country: string,
        postalCode: string,
        phone: string
    },
    payment: {
        razorpayOrderId: string,
        status: string,
        razorpayPaymentId: string,
        razorpaySignature: string
    },
    _id: string,
    user: string,
    items: [
        {
            product: string,
            quantity: number,
            price: number,
            _id: string
        }
    ],
    totalAmount: number,
    orderStatus: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export function useOrderWithId(productId: string) {
    const dispatch = useDispatch();
    const query = useQuery<SingleOrder, Error>({
        queryKey: ["orders", productId],
        queryFn: async () => {
            const res = await apiClient.get(`api/order/${productId}`);
            return res.data.data;
        },
        retry: false,
        enabled: !!productId,
    });

    useEffect(() => {
        if (query.data) {
            // dispatch(setSingleProduct(query.data as any));
        }
    }, [query.data, dispatch]);

    return query;
}

export function useUpdateOrders() {
    const queryClient = useQueryClient();
    const notify = useNotify();

    return useMutation({
        mutationFn: async ({ payload, id }: { payload: OrderPayload; id: string }) => {
            console.log("PS", id);

            const res = await apiClient.put(`api/order/admin/${id}`, payload);
            return res.data;
        },
        onSuccess: (res) => {
            notify.success(res?.message || "Order updated successfully");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error: any) => {
            notify.error(error.response?.data?.message || "Order update failed");
        },
    });
}

export function useCreateOrders() {
    const queryClient = useQueryClient();
    const notify = useNotify();

    return useMutation({
        mutationFn: async (payload: OrderPayload) => {
            console.log("PS", payload);

            const res = await apiClient.post("api/order/admin", payload);
            return res.data;
        },
        onSuccess: (res) => {
            notify.success(res?.message || "Order created successfully");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error: any) => {
            notify.error(error.response?.data?.message || "Order creation failed");
        },
    });
}


export function useOrders(params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: "asc" | "desc";
    search?: string;
    category?: string;
}) {
    const dispatch = useDispatch();

    const query = useQuery<OrdersResponse, Error>({
        queryKey: [
            "orders",
            params?.page,
            params?.limit,
            params?.sortBy,
            params?.order,
            params?.search,
            params?.category,
        ],
        queryFn: async () => {
            const res = await apiClient.get("api/order/list", {
                params,
            });
            return res.data;
        },
        placeholderData: keepPreviousData,
        retry: false,
    });

    useEffect(() => {
        if (query.data) {
            dispatch(orders(query?.data?.orders?.data?.result || []));
        }
    }, [query.data, dispatch]);

    return query;
}

// 🔹 Update order status
export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();
    const notify = useNotify();

    return useMutation({
        mutationFn: async (payload: { _id: string; orderStatus: string }) => {
            const res = await apiClient.put(`api/order/status/${payload._id}`, {
                status: payload.orderStatus,
            });
            return res.data;
        },
        onSuccess: () => {
            notify.success("Order status updated");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error: any) => {
            notify.error(error.response?.data?.message || "Order status update failed");
        },
    });
}


export function useOrderedList() {

    const query = useQuery<OrdersResponse, Error>({
        queryKey: [
            "orders",
        ],
        queryFn: async () => {
            const res = await apiClient.get("api/order");
            return res.data?.orders;
        },
        placeholderData: keepPreviousData,
        retry: false,
    });

    return query;
}

