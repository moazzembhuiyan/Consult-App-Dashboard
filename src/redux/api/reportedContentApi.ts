import { baseApi } from "./baseApi";

const ReportedContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReportedContent: builder.query<any, any>({
      query: ({ limit, page, searchText }) => {
        let url = "/reports";

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
      providesTags: ["ReportedContent"],
    }),
    getSingleReportedContent: builder.query<any, any>({
      query: (id) => ({
        url: `/reports/${id}`,
        method: "GET",
      }),
      providesTags: ["ReportedContent"],
    }),
  }),
});

export const { useGetReportedContentQuery, useGetSingleReportedContentQuery } =
  ReportedContentApi;
