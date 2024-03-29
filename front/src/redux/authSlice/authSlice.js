import { apiSlice } from "../apiSlice/apiSlice";

export const apiAuth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/user/login",
        method: "POST",
        body: credentials,
      }), 
    }),
  }),
});

export const { useLoginMutation } = apiAuth;
