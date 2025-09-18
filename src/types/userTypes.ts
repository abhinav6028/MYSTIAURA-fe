export interface UserState {
    bestSellerProducts: BestSellerProduct[];
    wishlistProducts: Wishlist[];
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