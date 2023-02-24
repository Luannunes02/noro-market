import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocalizationState {
  messageCep: string;
  cep: undefined;  
  cart: Array<object>;
  bought: Array<object>;
  freightInitialCep: any;
  freightBuy: any;
  buyTotalValue: number;
}

const initialState: LocalizationState = {
  messageCep: '',
  cep: undefined,  
  cart: [],
  bought: [],
  freightInitialCep: undefined,
  freightBuy: undefined,
  buyTotalValue: 0,
};

const localizationSlice = createSlice({
  name: 'localization',
  initialState,
  reducers: {
    updateMessageCep(state: any, action: PayloadAction<string>) {
      state.messageCep = action.payload;
    },
    updateFreightForCep(state: any, action: PayloadAction<any>) {
      state.freightInitialCep = action.payload;
    },
    updateFreightBuy(state: any, action: PayloadAction<any>) {
      state.freightBuy = action.payload;
    },
    updateBuyTotalValue(state: any, action: PayloadAction<any>) {
      state.buyTotalValue = action.payload;
    },
    updateCep(state: any, action: PayloadAction<string>) {
      state.cep = action.payload;
    },
    updateCart(state: any, action: PayloadAction<object>) {
      state.cart = [...state.cart, action.payload];
    },
    updateChangeCart(state: any, action: PayloadAction<any>) {
      state.cart[action.payload[1]].buyQuant = action.payload[0];
    },
    updateRemoveItemInCart(state: any, action: PayloadAction<number>) {        
      state.cart = state.cart.filter((_: any, index: any) => index !== action.payload);
    },
    updateBought(state: any, action: PayloadAction<object>) {
      state.bought = [...state.bought, action.payload];
    },    
    updateDeleteCartBought(state: any) {
      state.cart = [];      
    },  
  },
});

export const { updateCep, updateFreightForCep,  updateDeleteCartBought,updateBuyTotalValue,updateFreightBuy,updateCart, updateBought, updateMessageCep, updateChangeCart, updateRemoveItemInCart } = localizationSlice.actions;
export default localizationSlice.reducer;