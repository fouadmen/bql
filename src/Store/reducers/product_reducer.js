import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    productInfo : {
        name:"", 
        quantity:"", 
        minQuantity:"", 
        unit:"", 
        purchasePrice:"", 
        sellingPrice:"",
        barcode:""
    },
    productImage:{
        uri: ""
    }
}

//move this it utils

const productReducers = {
    setProductInfo(state, action){
        state.productInfo[action.payload.target] = action.payload.data;
    },
    setProductImage(state, action){
        state.productImage.uri = action.payload.data;
    },
    resetProductState(state, action){
        state = initialState;
    }
} 

const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers : productReducers
})

export const { setProductInfo, setProductImage, resetProductState } = productSlice.actions 
export default productSlice;