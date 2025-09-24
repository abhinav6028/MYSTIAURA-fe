import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BestSellerProduct, CartData, SingleProduct, UserState, Wishlist } from "../../types/userTypes";
import type { Address } from "../../types/address";

const initialState: UserState = {
  bestSellerProducts: [],
  wishlistProducts: [],
  addCartList: null,
  addresses: [],
  singleProduct: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSellerProducts: (state, action: PayloadAction<BestSellerProduct[]>) => {
      state.bestSellerProducts = action.payload;
    },
    setWishlistProducts: (state, action: PayloadAction<Wishlist[]>) => {
      state.wishlistProducts = action.payload;
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
  },
});

export const { setSellerProducts, setWishlistProducts, setAddCartList, setAddresses, setSingleProduct } = userSlice.actions;
export default userSlice.reducer;
