export interface ProductImage {
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
  
  export interface ProductCategory {
    _id: string;
    name: string;
    description: string;
    images: ProductImage[];
    isActive: boolean;
    is_deleted: boolean;
    createdAt: string;    
    price: number;
    discountPrice: number;
    stock: number;
    __v: number;
  }
  
  export interface ProductCategoryAxiosResponse {
    data: ProductCategory[];
    count: number;
  }