import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const paymentsAdapter = createEntityAdapter({});

const initialState = paymentsAdapter.getInitialState();

export const paymentsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Payment"],
  endpoints: (build) => ({
    // payments
    getPayment: build.query({
      query: (id) => `income/payments/${id}`,
      providesTags: ["Payment"],
    }),
    getPayments: build.query({
      query: () => "income/payments",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedPayments = responseData.map((payment) => {
          payment.id = payment._id;
          return payment;
        });
        return paymentsAdapter.setAll(initialState, loadedPayments);
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
  }),
});

export const {
  useGetPaymentQuery,
  useGetPaymentsQuery,
  useAddPaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentsApi;

// returns the query result object
export const selectPaymentsResult = paymentsApi.endpoints.getPayments.select();

// creates memoized selector
const selectPaymentsData = createSelector(
  selectPaymentsResult,
  (paymentsResult) => paymentsResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllPayments,
  selectById: selectPaymentById,
  selectIds: selectPaymentIds,
  // Pass in a selector that returns the payments slice of state
} = paymentsAdapter.getSelectors(
  (state) => selectPaymentsData(state) ?? initialState
);
