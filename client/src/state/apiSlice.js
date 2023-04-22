import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: ["User", "Payment", "Invoice", "Member"],
  reducerPath: "adminApi",
  endpoints: (builder) => ({}),
});
