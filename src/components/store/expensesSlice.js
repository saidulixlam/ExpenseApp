import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState={
    expenses:[],
    amount:0,
    description:'',
    category:'',
}
export const expenseSlice=createSlice({
    name:'expense',
    initialState: initialExpenseState,
    reducers:{
        addExpenses(state,action) {
            state.expenses.push(action.payload);
        },
        addAmount(state,action){
            state.amount=action.payload;
        },
        addDescription(state,action){
            state.description=action.payload;
        },
        addCategory(state,action) {
            state.category=action.payload;
        }
    }
})
export const expenseAction=expenseSlice.actions;