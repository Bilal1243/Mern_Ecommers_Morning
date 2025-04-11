import { apiSlice } from './apiSlice'

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProducts: builder.query({
            query: ({ pageNumber, keyword }) => ({
                url: '/api/products',
                params: { pageNumber, keyword }
            }),
            providesTags: ["Products"]
        }),

        createProduct: builder.mutation({
            query: (data) => ({
                url: '/api/products',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Products']
        })

    })
})

export const {
    useCreateProductMutation
} = productApiSlice