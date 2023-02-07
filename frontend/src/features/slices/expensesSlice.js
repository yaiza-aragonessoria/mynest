import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


// const access = localStorage.getItem('access')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2MTkyOTU4LCJpYXQiOjE2NzU3NjA5NTgsImp0aSI6ImNkMmU4NzFkOGRhZDRjYWZiNTIxZTIzZDFjNmI3OGM5IiwidXNlcl9pZCI6NH0.LuFHXiDMusOqag_EZF7AIo1SXxCovL3JjKj_AxaGHwI"
const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
}

export const fetchExpenses = createAsyncThunk(
    "fetchExpenses",
    async () => {
        try {
            const response = await axios.get('https://mynest.propulsion-learn.ch/backend/api/expenses/home/', config)
            return response.data;
        } catch (error) {
            console.log(error)
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
            console.log("action", action);

        },

    }
})

export const {} = expensesSlice.actions;

export default expensesSlice.reducer;