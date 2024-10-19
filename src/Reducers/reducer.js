import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.error = null;
        },
    },
});

export const { setUser, setError, clearUser } = userSlice.actions;
export default userSlice.reducer;