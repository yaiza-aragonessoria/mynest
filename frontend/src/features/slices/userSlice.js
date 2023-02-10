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

        try {
            const response = await axios.get('https://mynest.propulsion-learn.ch/backend/api/users/me/', config)
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

const initialState = {
        userProfileSlice: [],
        isLoading: true, // Set true to avoid showing MustHaveHome when data is loading.
        loaded: false,
        rejected: false
    }

export const userProfileSlice = createSlice({
    name: "userProfileSlice",
    initialState: initialState,
    reducers: {
        cleanUserData: (state) => {
            const newState = initialState

            // newState.userProfileSlice = undefined // Set the data to undefined

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
          state.isLoading = true; // Set true to avoid showing MustHaveHome when data is loading.
          state.loaded = false;
          state.rejected = true;
        }
    }
})

export const {cleanUserData} = userProfileSlice.actions;

export default userProfileSlice.reducer;