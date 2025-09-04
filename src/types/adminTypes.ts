// Admin product interface
export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type ProductInput = Omit<Product, "_id" | "createdAt" | "updatedAt">;


export interface IAdminFormInputs {
    productName: string;
    material: string;
    description: string;
    actualPrice: number;
    discountPrice: number;
    stock: number;
    discountType: string;
    productCategory: string;
  }