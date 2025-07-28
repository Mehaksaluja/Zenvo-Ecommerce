import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: '/api/products',
      }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: '/api/products',
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `/api/products/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      // ...
    }),
    // --- ADD THIS ENDPOINT ---
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/api/products/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      // ...
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery, // EXPORT NEW HOOK
  useCreateProductMutation,
  useUpdateProductMutation, // EXPORT NEW HOOK
  useDeleteProductMutation,
} = productsApiSlice;