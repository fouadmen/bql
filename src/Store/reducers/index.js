import { combineReducers } from '@reduxjs/toolkit';
import cartSlice, {setcartItems} from './cart_reducer';
import productSlice, {setProductInfo, setProductImage, resetProductState} from './product_reducer';
import profileSlice, { setProfileInfo } from "./profile_reducer";
import authSlice, { logIn, signOut, signUp, retreiveToken } from "./auth_reducer";
import storeSlice, { fetchStore, onboarding, redirect } from "./store_reducer";
const reducers = combineReducers({cart : cartSlice.reducer, product : productSlice.reducer, profile: profileSlice.reducer, auth: authSlice.reducer, store : storeSlice.reducer });
export {setcartItems, setProductInfo, setProductImage, resetProductState, setProfileInfo, logIn, signOut, signUp, retreiveToken, fetchStore, onboarding, redirect}
export default reducers ;