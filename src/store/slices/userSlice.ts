import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BestSellerProduct, CartData, FilterParams, SingleProduct, UserState, Wishlist } from "../../types/userTypes";
import type { Address } from "../../types/address";
import type { ProductCategory } from "../../types/categoryTypes";

const initialState: UserState = {
  bestSellerProducts: [],
  wishlistProducts: [],
  addCartList: null,
  addresses: [],
  singleProduct: null,
  categories: [],
  selectedProductCategory: null,
  selectedDashboad: null,
  orders: null,
  categoryFilter: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSellerProducts: (state, action: PayloadAction<BestSellerProduct[]>) => {
      state.bestSellerProducts = action.payload || [];
    },
    setWishlistProducts: (state, action: PayloadAction<Wishlist[]>) => {
      state.wishlistProducts = action.payload || [];
    },
    setAddCartList: (state, action: PayloadAction<CartData>) => {
      state.addCartList = action.payload;
    },
    setAddresses(state, action: PayloadAction<Address[]>) {
      state.addresses = action.payload;
    },
    setSingleProduct(state, action: PayloadAction<SingleProduct | null>) {
      state.singleProduct = action.payload;
    },
    setCategories(state, action: PayloadAction<ProductCategory[]>) {
      state.categories = action.payload;
    },
    selectedProductCategory(state, action: PayloadAction<any>) {
      state.selectedProductCategory = action.payload;
    },
    selectedDashboad(state, action: PayloadAction<any>) {
      state.selectedDashboad = action.payload;
    },
    orders(state, action: PayloadAction<any>) {
      state.orders = action.payload;
    },
    setCategoryFilter(state, action: PayloadAction<FilterParams>) {
      state.categoryFilter = action.payload;
    },
    clearUserState: () => initialState,
  },
});

export const { setSellerProducts, setWishlistProducts, setAddCartList, setAddresses, setSingleProduct, setCategories, selectedProductCategory, selectedDashboad, orders, setCategoryFilter, clearUserState } = userSlice.actions;
export default userSlice.reducer;
