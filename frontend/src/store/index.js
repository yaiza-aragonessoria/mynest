import {configureStore} from "@reduxjs/toolkit";
import {expensesSlice} from "../features/slices/expensesSlice";
import authSlice from "../features/slices/authSlice";
import {userProfileSlice} from "../features/slices/userSlice";

const store = configureStore({
    reducer: {
        expenses: expensesSlice.reducer,
        auth: authSlice.reducer,
        userProfile: userProfileSlice.reducer

    }
})

export default store