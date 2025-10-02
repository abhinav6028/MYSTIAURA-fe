import type { Address } from "./address";
import type { CategoryImage } from "./adminTypes";
import type { ProductCategory } from "./categoryTypes";

export interface UserState {
  bestSellerProducts: BestSellerProduct[];
  wishlistProducts: Wishlist[];
  addCartList: CartData | null;
  addresses: Address[];
  singleProduct: SingleProduct | null;
  categories: ProductCategory[];
  selectedProductCategory: ProductCategory | null;
  selectedDashboad: null,
  orders: null
}

export interface SingleProductImage {
  _id: string;
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  size: number;
}

export interface ProductRatings {
  average: number;
  count: number;
}

export interface ProductSEO {
  keywords: string[];
}

export interface ProductReview {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  title: string;
  comment: string;
  rating: number;
  createdAt: string; // ISO date
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: CategoryImage;
  createdAt?: string;
  updatedAt?: string;
}

export interface SingleProduct {
  _id: string;
  name: string;
  description: string;
  category: Category;
  status: "active" | "inactive" | string; // if only active/inactive, narrow further
  material: string;
  occasion: string[];
  price: number;
  discountPrice: number;
  stock: number;
  images: SingleProductImage[];
  ratings: ProductRatings;
  tags: string[];
  isFeatured: boolean;
  seo: ProductSEO;
  isActive: boolean;
  is_deleted: boolean;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  __v: number;
  reviews: ProductReview[];
  averageRating: number;
  reviewCount: number;
  positiveReviewCount: number;
  negativeReviewCount: number;
  fiveStarCount: number;
  discountType: string;
}


export type BestSellerProduct = {
  _id: string;
  name: string;
  description: string;
  category: {
    _id: string;
    name: string;
    description: string;
    image: string;
    isActive: boolean;
    is_deleted: boolean;
    createdAt: string;
    __v: number;
  };
  ratings: {
    average: number;
    count: number;
  };
  seo: {
    keywords: string[];
  };
  status: string;
  material: string;
  occasion: string[];
  price: number;
  discountPrice: number;
  stock: number;
  images: {
    _id: string;
    public_id: string;
    secure_url: string;
  }[];
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}[];

// whislist types
export type ProductImage = {
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
};

export type WishProduct = {
  ratings: {
    average: number;
    count: number;
  };
  seo: {
    keywords: string[];
  };
  _id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  material: string;
  occasion: string[];
  price: number;
  discountPrice: number;
  stock: number;
  images: ProductImage[];
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Wishlist = {
  _id: string;
  totalCount: number;
  products: WishProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
// wishlist type end

// add cart types
export interface Cart {
  data: CartData;
}

export interface CartData {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  material: string;
  occasion: string[];
  price: number;
  discountPrice: number;
  stock: number;
  images: CartProductImage[];
  ratings: ProductRatings;
  tags: string[];
  isFeatured: boolean;
  seo: ProductSEO;
  isActive: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartProductImage {
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

export interface ProductRatings {
  average: number;
  count: number;
}

export interface ProductSEO {
  keywords: string[];
}
