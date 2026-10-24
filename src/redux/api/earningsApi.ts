import { baseApi } from "./baseApi";

const earningsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarnings: builder.query<any, any>({
      query: ({ currentPage }) => ({
        url: `/payments/dashboard-data?page=${currentPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllEarningsQuery } = earningsApi;
