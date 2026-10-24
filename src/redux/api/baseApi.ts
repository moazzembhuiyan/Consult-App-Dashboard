import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/authSlice";

type AuthState = {
  auth?: {
    token?: string | null;
    user?: unknown;
  };
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AuthState).auth?.token;
    if (typeof token === "string" && token) {
      headers.set("Authorization", token);
    }
    const signUpToken = localStorage.getItem("signupToken");
    if (signUpToken) {
      headers.set("token", signUpToken);
    }
    const guestToken = sessionStorage.getItem("guestToken");
    if (guestToken) {
      headers.set("token", guestToken);
    }
    const forgetPasswordToken = localStorage.getItem("forgetPasswordToken");
    if (forgetPasswordToken) {
      headers.set("Authorization", forgetPasswordToken);
    }

    return headers;
  },
});
const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const auth = (api.getState() as AuthState).auth;
    const token = auth?.token;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        // credentials: 'include',
      },
    );

    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = auth?.user;

      api.dispatch(setUser({ user, token: data.data.accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: [
    "transactions",
    "content",
    "user",
    "auth",
    "notification",
    "categories",
    "services",
    "banner",
    "productsCategory",
    "delivery-charge",
    "refundRequests",
    "withdrawalRequests",
    "faq",
    "contentModeration",
    "categories",
    "complain",
    "withdrawals",
    "PointManagement",
    "ReportedContent",
    "booking",
    "settingsLogs",
    "settings",
    "subCription",
    "subscriptionHistory",
  ],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
