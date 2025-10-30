import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: 'auth/login', method: 'POST', body }),
    }),
    register: builder.mutation({
      query: (body) => ({ url: 'auth/register', method: 'POST', body }),
    }),
    me: builder.query({
      query: () => ({ url: 'auth/me' }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = api;
