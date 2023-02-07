import { configureStore } from "@reduxjs/toolkit";
import { expensesSlice } from "../features/slices/expensesSlice";

const store = configureStore({
    reducer: {
         expenses: expensesSlice.reducer
    }
})

export default store;
