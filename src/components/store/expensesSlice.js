import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState={
    expenses:[],
    // amount:0,
    // description:'',
    // category:'',
}
export const expenseSlice=createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {
      setExpenses(state, action) {
        state.expenses = action.payload;
      },
      addExpense(state, action) {
        state.expenses.push(action.payload);
      },
      deleteExpense(state, action) {
        // Filter out the expense with the specified key
        state.expenses = state.expenses.filter(expense => expense.key !== action.payload);
      },
      // If you want to include additional actions for amount, description, category, you can add them here.
    },
  });
  
  export const expenseActions = expenseSlice.actions;
  
  export default expenseSlice.reducer;