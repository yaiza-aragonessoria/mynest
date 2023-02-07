import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const access = localStorage.getItem('access')
const config = {
    headers: {
        'Authorization': `Bearer ${access}`,
    }
}

export const fetchUser = createAsyncThunk(
    "fetchUsers",
    async () => {
        try {
            const response = await axios.get('https://mynest.propulsion-learn.ch/backend/api/users/me/', config)
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

)

export const userProfileSlice = createSlice({
    name: "userProfileSlice",
    initialState: {
        userProfileSlice: []
    },
    reducers: {},
    extraReducers: {
        [fetchUser.fulfilled]: (state, action) => {

            state.userProfileSlice = action.payload
            console.log("action", action);

        },

    }
})

export const {} = userProfileSlice.actions;

export default userProfileSlice.reducer;