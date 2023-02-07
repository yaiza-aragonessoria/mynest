import {configureStore} from "@reduxjs/toolkit";
import {expensesSlice} from "../features/slices/expensesSlice";
import authSlice from "../features/slices/authSlice";

const store = configureStore({
    reducer: {
        expenses: expensesSlice.reducer,
        auth: authSlice.reducer,
    }
})

export default store