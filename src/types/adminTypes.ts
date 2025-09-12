// Admin product interface
export interface Product {
  id?: string;
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: Category;
  images?: Image[];
  createdAt?: string;
  updatedAt?: string;
  discountPrice?: number;
  discountType?: string;
  material?: string;
  ratings?: {
    average: number;
    count: number;
  };
}

export type ProductInput = Omit<Product, "_id" | "createdAt" | "updatedAt">;


export interface IAdminFormInputs {
  name: string;
  material: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  discountType: string;
  category: string;
  images?: File[];
}

 export interface CategoryImage {
  _id: string;
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  size: number;
  folder: string;
  created_at: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: CategoryImage;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryInput {
  name: string;
  description?: string;
  image?: File[] | string;
}

// 🔹 User types
export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
}

// export interface DialogBoxProps {
//   open: boolean;
//   onClose: () => void;
//   btnname1: string;
//   btnname2: string;
//   title: string;
//   description: string;
// }

interface Image {
  _id: string;
  public_id: string;
  secure_url: string;
  format: string;
  size: number;
  folder: string;
  createdAt: string;
  updatedAt: string;
}