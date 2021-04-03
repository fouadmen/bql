import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    productInfo : {
        name:"", 
        quantity:"", 
        minLimit:"", 
        unit:"kg", 
        buyingPrice:"", 
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
    setProduct(state, action){
        Object.getOwnPropertyNames(action.payload.data).forEach(d => state.productInfo[d] = action.payload.data[d]);
    },
    setProductImage(state, action){
        state.productImage.uri = action.payload.data;
    },
    resetProductState(state, action){
        state.productImage.uri = "";
        state.productInfo =  {
            name:"", 
            quantity:"", 
            minLimit:"", 
            unit:"", 
            buyingPrice:"", 
            sellingPrice:"",
            barcode:""
        }
    }
} 

const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers : productReducers
})

export const { setProductInfo, setProductImage, resetProductState, setProduct } = productSlice.actions 
export default productSlice;