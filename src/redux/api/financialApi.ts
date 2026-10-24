import { baseApi } from "./baseApi";

const FinancialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionsData: builder.query<any, any>({
      query: ({ page, limit, searchText }) => ({
        url: `/payments?page=${page}&limit=${limit}&searchTerm=${searchText}`,
        method: "GET",
      }),
    }),
    getWithdrawalRequests: builder.query<any, any>({
      query: ({ page, limit, searchText }) => ({
        url: `/withdraw?page=${page}&limit=${limit}&searchTerm=${searchText}`,
        method: "GET",
      }),
      providesTags: ["withdrawalRequests"],
    }),
    updateWithdrawalRequest: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/withdraw/status/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["withdrawalRequests"],
    }),
    deniedWithdrawalRequest: builder.mutation<any, any>({
      query: (id) => ({
        url: `/withdraw/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["withdrawalRequests"],
    }),

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
  useGetTransactionsDataQuery,
  useGetWithdrawalRequestsQuery,
  useUpdateWithdrawalRequestMutation,
  useDeniedWithdrawalRequestMutation,
  useGetRefundRequestsQuery,
  useUpdateRefundRequestMutation,
  useDeniedRefundRequestMutation,
} = FinancialApi;
