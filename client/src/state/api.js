import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Payments", "Members"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getPayments: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "income/payments",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Payments"],
    }),
    getMembers: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "management/members",
        method: "GET",
        params: { page, pageSize, sort, search },
        providesTags: ["Members"],
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetPaymentsQuery, useGetMembersQuery } = api;
