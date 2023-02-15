import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {fetchUser} from "./userSlice";


export const fetchExpenses = createAsyncThunk(
    "fetchExpenses",
    async (searchTerm) => {
        const access = localStorage.getItem('access')
        const config = {
            headers: {
                'Authorization': `Bearer ${access}`,
            },
             params: {search: searchTerm}
        }

        const response = await axios.get('https://mynest.propulsion-learn.ch/backend/api/expenses/home/', config)
        return response.data;
    }
)
export const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState: {
        expensesSlice: [],
        isLoading: false,
        loaded: false,
        rejected: false
    },
    reducers: {},
    extraReducers: {
        [fetchExpenses.pending]: (state, action) => {
          console.log("Loading expenses...");
          state.isLoading = true;
          state.loaded = false;
          state.rejected = false;
        },
        [fetchExpenses.fulfilled]: (state, action) => {
            console.log("Expenses fetched.")
            state.expensesSlice = action.payload;
            state.isLoading = false;
            state.loaded = true;
            state.rejected = false;
        },
        [fetchExpenses.rejected]: (state) => {
          console.log("Request rejected.")
          state.isLoading = false;
          state.loaded = false;
          state.rejected = true;
        }

    }
})

export const {} = expensesSlice.actions;

export default expensesSlice.reducer;