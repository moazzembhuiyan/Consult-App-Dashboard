import { baseApi } from "./baseApi";

const SubCriptionAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubCription: builder.query<any, any>({
      query: () => ({ url: `/packages`, method: "GET" }),
      providesTags: ["subCription"],
    }),
    CreateSubCription: builder.mutation<any, any>({
      query: (data) => ({ url: "/packages", method: "POST", body: data }),
      invalidatesTags: ["subCription"],
    }),
    deleteSubCription: builder.mutation<any, any>({
      query: (id) => ({ url: `/packages/${id}`, method: "DELETE" }),
      invalidatesTags: ["subCription"],
    }),
    updateSubCription: builder.mutation<any, any>({
      query: ({ id, value }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: value,
      }),
      invalidatesTags: ["subCription"],
    }),

    // subscription history api
    getAllSubscriptionHistory: builder.query<any, any>({
      query: ({ page, limit, searchText }) => ({
        url: `/subscriptions`,
        method: "GET",
        params: { page, limit, searchTerm: searchText },
      }),
      providesTags: ["subscriptionHistory"],
    }),

    pasueSubscription: builder.mutation<any, any>({
      query: ({ id, status }) => ({
        url: `/subscriptions/status/${id}`,
        method: "PATCH",
        body: { status: status },
      }),
      invalidatesTags: ["subscriptionHistory"],
    }),
  }),
});

export const {
  useGetAllSubCriptionQuery,
  useCreateSubCriptionMutation,
  useDeleteSubCriptionMutation,
  useUpdateSubCriptionMutation,
  useGetAllSubscriptionHistoryQuery,
  usePasueSubscriptionMutation,
} = SubCriptionAPi;
