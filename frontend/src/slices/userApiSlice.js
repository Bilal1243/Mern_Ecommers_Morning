import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: '/api/user',
                method: 'POST',
                body: data
            })
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/api/user/auth',
                method: 'POST',
                body: data
            })
        })
    })
})


export const {
    useRegisterUserMutation,
    useLoginUserMutation
} = userApiSlice