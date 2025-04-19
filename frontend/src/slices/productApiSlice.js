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
        }),

        getProductById: builder.query({
            query: (id) => ({
                url: `/api/products/${id}`
            }),
            providesTags: ['Product']
        }),

        createProductReview: builder.mutation({
            query: (data) => ({
                url: `/api/products/${data.productId}/review`,
                method: 'POST',
                body: data
            })
        }),

        updateProduct: builder.mutation({
            query: ({ productId, data }) => ({
                url: `/api/products/${productId}`,
                method: 'PUT',
                body: data
            })
        })

    })
})

export const {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useCreateProductReviewMutation,
    useUpdateProductMutation
} = productApiSlice