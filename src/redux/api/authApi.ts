import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation<any, any>({
      query: (data) => ({
        url: "/otp/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: "/otp/resend-otp",
        method: "POST",
        body: { email: data },
      }),
    }),

    forgetPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    changepassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    // get my profile ---------------

    getMyProfile: builder.query<any, void>({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    // update profile api endpoint
    updateProfileinfo: builder.mutation<any, any>({
      query: (data) => ({
        url: "/users/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useSignInMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangepasswordMutation,
  useGetMyProfileQuery,
  useUpdateProfileinfoMutation,
} = authApi;
