import { baseApi } from "./baseApi";

const TransactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query<any, any>({
      query: ({ page, limit, searchText, status, startDate, endDate }) => ({
        url: "/meta/transaction",
        method: "GET",
        params: {
          page,
          limit,
          searchTerm: searchText || undefined,
          status: status || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        },
      }),
      providesTags: ["transactions"],
    }),
    getTransactionById: build.query<any, any>({
      query: ({ transactionID }) => ({
        url: `/payments/${transactionID}`,
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),
    createTransaction: build.mutation<any, any>({
      query: (payload) => ({
        url: "/transactions",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["transactions"],
    }),
    updateTransaction: build.mutation<any, any>({
      query: ({ payload, id }) => ({
        url: `/transactions/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["transactions"],
    }),
    deleteTransaction: build.mutation<any, any>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transactions"],
    }),

    // refund
    createRefund: build.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/payments/${id}/refund`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transactions"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionByIdQuery,
  useCreateRefundMutation,
} = TransactionApi;
