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
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/api/user/logout',
                method: 'POST'
            })
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: '/api/user/profile',
                method: 'PUT',
                body: data
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: '/api/user'
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5
        }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `/api/user/${id}`
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `/api/user/${data.userId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/api/user/${userId}`,
                method: 'DELETE'
            })
        })

    })
})


export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useUpdateUserProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation
} = userApiSlice