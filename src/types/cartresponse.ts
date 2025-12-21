export interface CartResponse {
  _id: string;
  user: string; // userId reference
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  product?: string;
  quantity?: number;
  totalCount?: number;
  __v: number;
  isAuthenticated?: boolean;
}

export interface CartItem {
  _id: string;
  product: CartProduct;
  quantity: number;
  price: number; // price at the time (with discount applied)
}

export interface CartProduct {
  _id: string;
  name: string;
  description: string;
  category: Category;
  status: string;
  material: string;
  occasion: string[];
  price: number;
  discountPrice: number;
  stock: number;
  images: CartImage[]; // ✅ FIXED: now objects, not strings
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;

  ratings: {
    average: number;
    count: number;
  };

  seo: {
    keywords: string[];
  };
}

export interface CartImage {
  _id: string;
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  size: number;
  folder: string;
  created_at: string; // sometimes snake_case in cloudinary
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  is_deleted: boolean;
  createdAt: string;
  __v: number;
}
