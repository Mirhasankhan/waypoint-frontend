import { JWTDecode } from "@/utils/jwt";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,

    prepareHeaders: (headers) => {
      const { token } = JWTDecode();

      headers.set("Authorization", token as string);

      // if (token) {
      //   headers.set("Authorization", `${token}`);
      // }
      return headers;
    },
  }),
  tagTypes: [
    "users",
    "bookings",
    "service",
    "post",
    "subscription",
    "earnings",
    "availability",
  ],
  endpoints: () => ({}),
});
