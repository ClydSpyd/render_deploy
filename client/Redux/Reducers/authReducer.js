import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/getCookie';

const initialState = {
    isLoggedIn: !!getCookie('auth_token'),
    user: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            return {
                isLoggedIn: true,
                user: action.payload
            }
        },
        logout: () => {
            return {
                isLoggedIn: false,
                user: null
            }
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;