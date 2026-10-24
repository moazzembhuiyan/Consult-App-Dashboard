import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotification: builder.query<any, any>({
      query: (query) => ({
        url: `/notification`,
        method: "GET",
        params: query,
      }),
      providesTags: ["notification"],
      transformResponse: (response: { data?: unknown; meta?: unknown }) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    markAsRead: builder.mutation<any, any>({
      query: () => ({
        url: `/notification`,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
    deleteNotification: builder.mutation<any, any>({
      query: () => ({
        url: `/notification/my-notifications`,
        method: "DELETE",
      }),
      invalidatesTags: ["notification"],
    }),
    deleteSingleNotification: builder.mutation<any, any>({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetMyNotificationQuery,
  useMarkAsReadMutation,
  useDeleteNotificationMutation,
  useDeleteSingleNotificationMutation,
} = notificationApi;
