import { apiSlice } from './apiSlice'

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProducts: builder.query({
            query: ({ pageNumber, keyword } = {}) => ({
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
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/api/products/${productId}`,
                method: 'DELETE'
            }),
            providesTags: ["Product"]
        })

    })
})

export const {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation
} = productApiSlice