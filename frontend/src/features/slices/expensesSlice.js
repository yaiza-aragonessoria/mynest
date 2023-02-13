import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


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

        try {
            const response = await axios.get('https://mynest.propulsion-learn.ch/backend/api/expenses/home/', config)
            return response.data;
        } catch (error) {
        }
    }
)
export const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState: {
        expensesSlice: []
    },
    reducers: {},
    extraReducers: {
        [fetchExpenses.fulfilled]: (state, action) => {

            state.expensesSlice = action.payload
        },

    }
})

export const {} = expensesSlice.actions;

export default expensesSlice.reducer;