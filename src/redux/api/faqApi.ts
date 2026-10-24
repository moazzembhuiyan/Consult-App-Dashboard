import { baseApi } from "./baseApi";

const FaqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<any, any>({
      query: ({ searchText, currentPage, type }) => ({
        url: `/faq?limit=10&page=${currentPage}&searchTerm=${searchText}&audience=${type}`,
        method: "GET",
      }),
      providesTags: ["faq"],
    }),
    // cretae faq
    createFaq: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/faq`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["faq"],
    }),
    getSingleFaq: builder.query<any, any>({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: "GET",
      }),
      providesTags: ["faq"],
    }),
    // update faq
    updateFaq: builder.mutation<any, any>({
      query: ({ id, values }) => ({
        url: `/faq/${id}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["faq"],
    }),

    // delete faq
    deleteFaq: builder.mutation<any, any>({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useGetSingleFaqQuery,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useCreateFaqMutation,
} = FaqApi;
