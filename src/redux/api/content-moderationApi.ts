import { baseApi } from "./baseApi";

const ContentModerationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    moderateContent: builder.mutation<any, any>({
      query: (data) => ({
        url: "/content-moderation/moderate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contentModeration"],
    }),
    getContentModeration: builder.query<any, any>({
      query: ({ limit, page, searchText }) => {
        let url = "/feeds";

        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (searchText) params.append("searchTerm", searchText);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["contentModeration"],
    }),
    deleteContentModeration: builder.mutation<any, any>({
      query: (id) => ({
        url: `/content-moderation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contentModeration"],
    }),
    getContentModerationById: builder.query<any, any>({
      query: (id) => ({
        url: `/feeds/${id}`,
        method: "GET",
      }),
      providesTags: ["contentModeration"],
    }),
    updateContentModeration: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/feeds/${id}/moderation`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["contentModeration"],
    }),
  }),
});

export const {
  useModerateContentMutation,
  useGetContentModerationQuery,
  useDeleteContentModerationMutation,
  useGetContentModerationByIdQuery,
  useUpdateContentModerationMutation,
} = ContentModerationApi;
