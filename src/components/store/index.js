import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { expenseSlice } from './expensesSlice';
// import { darkModeSlice } from './darkModeSLice';
// import { csvExportSLice } from './csvExportSLice';
// import { premiumSlice } from './premiumSlice';
const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        expense:expenseSlice.reducer,
        // darkMode:darkModeSlice.reducer,
        // premium:premiumSlice.reducer,
        // csv:csvExportSLice.reducer,
    }
})
export default store;