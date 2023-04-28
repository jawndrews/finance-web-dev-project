// authApiSlice.js
import { api } from "../api.js";
import { logOut } from "./authSlice";
import { setCredentials } from "./authSlice";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCredentials({ accessToken: result.data.accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          dispatch(api.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
