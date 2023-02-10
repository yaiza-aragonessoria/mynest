import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";




export const fetchUser = createAsyncThunk(
    "fetchUsers",
    async () => {
        const access = localStorage.getItem('access')
        const config = {
            headers: {
                'Authorization': `Bearer ${access}`,
            }
        }

        const response = await axios.get('https://mynest.propulsion-learn.ch/backend/api/users/me/', config)
        return response.data;
    }
)

const initialState = {
        userProfileSlice: [],
        isLoading: false,
        loaded: false,
        rejected: false
    }

export const userProfileSlice = createSlice({
    name: "userProfileSlice",
    initialState: initialState,
    reducers: {
        cleanUserData: (state) => {
            const newState = initialState

            return newState
        },},
    extraReducers: {
        [fetchUser.pending]: (state, action) => {
          console.log("Loading user data...");
          state.isLoading = true;
          state.loaded = false;
          state.rejected = false;
        },
        [fetchUser.fulfilled]: (state, action) => {
          console.log("User data fetched.")
            state.userProfileSlice = action.payload;
            state.isLoading = false;
            state.loaded = true;
            state.rejected = false;
        },
        [fetchUser.rejected]: (state) => {
          console.log("Request rejected.")
          state.isLoading = false;
          state.loaded = false;
          state.rejected = true;
        }
    }
})

export const {cleanUserData} = userProfileSlice.actions;

export default userProfileSlice.reducer;