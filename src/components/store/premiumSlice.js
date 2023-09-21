import { createSlice } from "@reduxjs/toolkit";
const initialPremiumState={
    isPremium:false,
}
export const premiumSlice=createSlice({
    name:'premium',
    initialState:initialPremiumState,
    reducers:{
        setPremium(state){
            state.isPremium=true
        },
        disablePremium(state){
            state.isPremium=false
        }
    }
})

export const premiumActions=premiumSlice.actions;