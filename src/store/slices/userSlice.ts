import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { BestSellerProduct, UserState } from "../../types/userTypes";

const initialState: UserState = {
 bestSellerProducts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSellerProducts: (state, action: PayloadAction<BestSellerProduct[]>) => {
        console.log(action.payload);
      state.bestSellerProducts = action.payload;
    },
  },
});

export const { setSellerProducts } = userSlice.actions;
export default userSlice.reducer;
