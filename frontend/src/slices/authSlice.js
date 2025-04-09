import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: localStorage.getItem('userData') ?
        JSON.parse(localStorage.getItem('userData')) : null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentails: (state, action) => {
            state.userData = action.payload
            localStorage.setItem('userData', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.userData = null
            localStorage.clear()
        }
    }
})


export const { setCredentails, logout } = authSlice.actions
export default authSlice.reducer