export interface OrderType {
  _id: string;
  user: string;
  shippingAddress: {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phone: string;
  };
  payment: {
    razorpayOrderId: string;
    status: "pending" | "completed" | "failed" | string;
  };
  items: {
    product: {
      _id: string;
      name: string;
      description: string;
      category: string;
      status: string;
      material: string;
      occasion: string[];
      price: number;
      discountPrice?: number;
      stock: number;
      images: string[]; // product image IDs or URLs
      tags: string[];
      isFeatured: boolean;
      isActive: boolean;
      is_deleted: boolean;
      ratings: {
        average: number;
        count: number;
      };
      seo: {
        keywords: string[];
      };
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    quantity: number;
    price: number;
    _id: string;
  }[];
  totalAmount: number;
  orderStatus: "placed" | "processing" | "shipped" | "delivered" | "cancelled" | string;
  createdAt: string;
  updatedAt: string;
  invoice_url: string;
  __v: number;
}
