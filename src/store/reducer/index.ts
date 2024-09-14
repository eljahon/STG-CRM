import { createSlice } from '@reduxjs/toolkit'

export const Auth = createSlice({
    name: 'auth',
    initialState: {
        isAuth: Boolean(localStorage.getItem('authToken'))
    },
    reducers: {
        isLogin: (state) => {
            state.isAuth = true
        },
        isLogout: (state) => {
            state.isAuth =false
            localStorage.removeItem('authToken')
        },
    },
})

// Action creators are generated for each case reducer function
export const { isLogin,isLogout } = Auth.actions

export default Auth.reducer