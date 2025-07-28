import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/api/orders',
        method: 'POST',
        body: { ...order },
      }),
    }),
    // --- ADD THIS NEW ENDPOINT ---
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `/api/orders/${orderId}`,
      }),
      keepUnusedDataFor: 5, // Keep the data in cache for 5 seconds
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `/api/orders/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: '/api/orders',
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `/api/orders/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
});

// RTK Query automatically creates a hook for our new endpoint
export const { useCreateOrderMutation, useGetOrderDetailsQuery, useGetMyOrdersQuery,
  useGetOrdersQuery, useDeliverOrderMutation, } = ordersApiSlice;