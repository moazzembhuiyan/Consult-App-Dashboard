import { baseApi } from "./baseApi";

const ContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContentsTermsandConditions: builder.query<any, void>({
      query: () => ({ url: `/contents?key=tramsAndCondition`, method: "GET" }),
      providesTags: ["content"],
    }),
    updateContentTermsandConditions: builder.mutation<any, any>({
      query: (data) => ({
        url: `/contents/tramsAndCondition`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["content"],
    }),
    getContentsPrivacyPolicy: builder.query<any, void>({
      query: () => ({ url: `/contents?key=privacyAndPolicy`, method: "GET" }),
      providesTags: ["content"],
    }),
    updateContentPrivacyPolicy: builder.mutation<any, any>({
      query: (data) => ({
        url: `/contents/privacyAndPolicy`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["content"],
    }),

    getGeneralSettings: builder.query<any, void>({
      query: () => ({ url: `/contents/general`, method: "GET" }),
      providesTags: ["content"],
    }),
    updateGeneralSettings: builder.mutation<any, any>({
      query: ({ payload }) => ({
        url: `/contents/generals`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["content"],
    }),

    // get setttings log
    getSettingsLogs: builder.query<any, any>({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/settings-logs`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["settingsLogs"],
    }),
  }),
});

export const {
  useGetContentsTermsandConditionsQuery,
  useUpdateContentTermsandConditionsMutation,
  useGetContentsPrivacyPolicyQuery,
  useUpdateContentPrivacyPolicyMutation,
  useGetGeneralSettingsQuery,
  useUpdateGeneralSettingsMutation,
  useGetSettingsLogsQuery,
} = ContentApi;
