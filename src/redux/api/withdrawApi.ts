import { baseApi } from "./baseApi";

const withDrawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===================== WITHDRAW LIST =====================
    getWithdrawalRequests: builder.query<any, any>({
      query: ({ page, limit, searchTerm, status, startDate, endDate }) => ({
        url: `/withdraw`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm: searchTerm || undefined,
          status: status || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        },
      }),
      providesTags: ["withdrawalRequests"],
    }),

    // ===================== SINGLE WITHDRAW =====================
    getWithdrawalById: builder.query<any, any>({
      query: (id) => ({
        url: `/withdraw/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "withdrawalRequests", id }],
    }),

    // ===================== MANUAL HOLD =====================
    manualHoldWithdraw: builder.mutation<any, any>({
      query: ({ id, reason }) => ({
        url: `/withdraw/${id}/manual-hold`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: ["withdrawalRequests"],
    }),

    // ===================== MANUAL RELEASE =====================
    manualReleaseWithdraw: builder.mutation<any, any>({
      query: ({ id, reason }) => ({
        url: `/withdraw/${id}/manual-release`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: ["withdrawalRequests"],
    }),

    // (keep your old refund endpoints if still needed)
    getRefundRequests: builder.query<any, any>({
      query: ({ page, limit, searchText }) => ({
        url: `/refunds?page=${page}&limit=${limit}&searchTerm=${searchText}`,
        method: "GET",
      }),
      providesTags: ["refundRequests"],
    }),
    updateRefundRequest: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/refunds/status/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["refundRequests"],
    }),
    deniedRefundRequest: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/refunds/${id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["refundRequests"],
    }),
  }),
});

export const {
  useGetWithdrawalRequestsQuery,
  useGetWithdrawalByIdQuery,
  useManualHoldWithdrawMutation,
  useManualReleaseWithdrawMutation,
  useGetRefundRequestsQuery,
  useUpdateRefundRequestMutation,
  useDeniedRefundRequestMutation,
} = withDrawApi;
