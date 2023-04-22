import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const invoicesAdapter = createEntityAdapter({});

const initialState = invoicesAdapter.getInitialState();

export const invoicesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Invoice"],
  endpoints: (build) => ({
    // invoices
    getInvoice: build.query({
      query: (id) => `income/invoices/${id}`,
      providesTags: ["Invoice"],
    }),
    getInvoices: build.query({
      query: () => "/invoices",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedInvoices = responseData.map((invoice) => {
          invoice.id = invoice._id;
          return invoice;
        });
        return invoicesAdapter.setAll(initialState, loadedInvoices);
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
  }),
});

export const {
  useGetInvoiceQuery,
  useGetInvoicesQuery,
  useAddInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoicesApi;

// returns the query result object
export const selectInvoicesResult = invoicesApi.endpoints.getInvoices.select();

// creates memoized selector
const selectInvoicesData = createSelector(
  selectInvoicesResult,
  (invoicesResult) => invoicesResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllInvoices,
  selectById: selectInvoiceById,
  selectIds: selectInvoiceIds,
  // Pass in a selector that returns the invoices slice of state
} = invoicesAdapter.getSelectors(
  (state) => selectInvoicesData(state) ?? initialState
);
