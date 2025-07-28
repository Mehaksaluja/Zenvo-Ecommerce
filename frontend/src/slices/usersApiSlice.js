import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/api/users/profile`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/api/users/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: '/api/users',
      }),
      providesTags: ['User'], // Caching tag
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/users/${userId}`,
        method: 'DELETE',
      }),
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `/api/users/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/api/users/${data.userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'], // This will refetch the user list
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useGetUsersQuery, // EXPORT NEW HOOK
  useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation, } = usersApiSlice;