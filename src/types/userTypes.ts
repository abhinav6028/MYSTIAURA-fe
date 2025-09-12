export interface UserState {
    bestSellerProducts: BestSellerProduct[];
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
  