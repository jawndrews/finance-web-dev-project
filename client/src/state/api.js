import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({});
const paymentsAdapter = createEntityAdapter({});
const invoicesAdapter = createEntityAdapter({});

const initialUserState = usersAdapter.getInitialState();
const initialPaymentState = paymentsAdapter.getInitialState();
const initialInvoiceState = invoicesAdapter.getInitialState();

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Users", "Payments", "Invoices"],
  endpoints: (build) => ({
    // users
    getUser: build.query({
      query: (id) => `general/users/${id}`,
      providesTags: ["Users"],
    }),
    getUsers: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "general/users",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    addUser: build.mutation({
      query: (initialUserData) => ({
        url: "general/users",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: build.mutation({
      query: (initialUserData) => ({
        url: "general/users",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: build.mutation({
      query: ({ id }) => ({
        url: `general/users`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    // payments
    getPayment: build.query({
      query: (id) => `income/payments/${id}`,
      providesTags: ["Payments"],
    }),
    getPayments: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "income/payments",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Payment", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Payment", id })),
          ];
        } else return [{ type: "Payment", id: "LIST" }];
      },
    }),
    addPayment: build.mutation({
      query: (initialPaymentData) => ({
        url: "income/payments",
        method: "POST",
        body: {
          ...initialPaymentData,
        },
      }),
      invalidatesTags: [{ type: "Payment", id: "LIST" }],
    }),
    updatePayment: build.mutation({
      query: (initialPaymentData) => ({
        url: "income/payments",
        method: "PATCH",
        body: {
          ...initialPaymentData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Payment", id: arg.id },
      ],
    }),
    deletePayment: build.mutation({
      query: ({ id }) => ({
        url: `income/payments`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Payment", id: arg.id },
      ],
    }),

    // invoices
    getInvoice: build.query({
      query: (id) => `income/invoices/${id}`,
      providesTags: ["Invoices"],
    }),
    getInvoices: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "income/invoices",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Invoice", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Invoice", id })),
          ];
        } else return [{ type: "Invoice", id: "LIST" }];
      },
    }),
    addInvoice: build.mutation({
      query: (initialInvoiceData) => ({
        url: "income/invoices",
        method: "POST",
        body: {
          ...initialInvoiceData,
        },
      }),
      invalidatesTags: [{ type: "Invoice", id: "LIST" }],
    }),
    updateInvoice: build.mutation({
      query: (initialInvoiceData) => ({
        url: "income/invoices",
        method: "PATCH",
        body: {
          ...initialInvoiceData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Invoice", id: arg.id },
      ],
    }),
    deleteInvoice: build.mutation({
      query: ({ id }) => ({
        url: `income/invoices`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Invoice", id: arg.id },
      ],
    }),

    //dashboard
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetPaymentQuery,
  useGetPaymentsQuery,
  useAddPaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useGetInvoiceQuery,
  useGetInvoicesQuery,
  useAddInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
  useGetDashboardQuery,
} = api;

// returns the query result object
export const selectUsersResult = api.endpoints.getUsers.select();
export const selectPaymentsResult = api.endpoints.getPayments.select();
export const selectInvoicesResult = api.endpoints.getInvoices.select();

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);
const selectPaymentsData = createSelector(
  selectPaymentsResult,
  (paymentsResult) => paymentsResult.data // normalized state object with ids & entities
);
const selectInvoicesData = createSelector(
  selectInvoicesResult,
  (invoicesResult) => invoicesResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialUserState
);
export const {
  selectAll: selectAllPayments,
  selectById: selectPaymentById,
  selectIds: selectPaymentIds,
  // Pass in a selector that returns the payments slice of state
} = paymentsAdapter.getSelectors(
  (state) => selectPaymentsData(state) ?? initialPaymentState
);
export const {
  selectAll: selectAllInvoices,
  selectById: selectInvoiceById,
  selectIds: selectInvoiceIds,
  // Pass in a selector that returns the invoices slice of state
} = invoicesAdapter.getSelectors(
  (state) => selectInvoicesData(state) ?? initialInvoiceState
);
