import { combineReducers } from '@reduxjs/toolkit';
import cartSlice, {setcartItems} from './cart_reducer';
import productSlice, {setProductInfo, setProductImage, resetProductState} from './product_reducer';

const reducers = combineReducers({cart : cartSlice.reducer, product : productSlice.reducer});
export {setcartItems, setProductInfo, setProductImage, resetProductState}
export default reducers ;