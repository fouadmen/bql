import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    profile : {
        name:"", 
        email:"", 
        phone:"",
        storeName:"", 
        openingHours:"", 
        address:"", 
        image: {
            uri: "",
            filename: ""
        }
    }
}

//move this it utils

const productReducers = {
    setProfileInfo(state, action){
        state.profile[action.payload.target] = action.payload.data;
    },
} 

const profileSlice = createSlice({
    name : 'profile',
    initialState,
    reducers : productReducers
})

export const { setProfileInfo } = profileSlice.actions 
export default profileSlice;