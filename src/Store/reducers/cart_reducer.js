import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cartItems : []
}

const cartReducers = {
    setcartItems(state, action){
        console.log(action);
        state.cartItems = action.payload.data;
    },
} 

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : cartReducers
})

export const { setcartItems } = cartSlice.actions 
export default cartSlice;