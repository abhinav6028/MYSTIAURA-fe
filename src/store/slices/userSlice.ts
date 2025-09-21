import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BestSellerProduct, CartData, UserState, Wishlist } from "../../types/userTypes";
import type { Address } from "../../types/address";

const initialState: UserState = {
  bestSellerProducts: [],
  wishlistProducts: [],
  addCartList: null,
  addresses: [],
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
  },
});

export const { setSellerProducts, setWishlistProducts, setAddCartList, setAddresses } = userSlice.actions;
export default userSlice.reducer;
