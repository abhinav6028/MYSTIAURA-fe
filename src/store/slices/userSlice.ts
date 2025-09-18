import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { BestSellerProduct, UserState, Wishlist } from "../../types/userTypes";

const initialState: UserState = {
 bestSellerProducts: [],
 wishlistProducts: [],
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
  },
});

export const { setSellerProducts,setWishlistProducts } = userSlice.actions;
export default userSlice.reducer;
