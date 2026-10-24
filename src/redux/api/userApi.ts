import { baseApi } from "./baseApi";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllusers: builder.query<any, any>({
      query: ({ limit, page, searchText }) => ({
        url: `/users?limit=${limit}&page=${page}&searchTerm=${searchText}`,
        method: "GET",
      }),
      providesTags: ["user", "notification"],
    }),
    // get single user
    getSingleUser: builder.query<any, any>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["user", "notification"],
    }),
    changeUserStatus: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/users/change-status`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["user", "notification"],
    }),
    deleteUser: builder.mutation<any, any>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllusersQuery,
  useChangeUserStatusMutation,
  useDeleteUserMutation,
  useGetSingleUserQuery,
} = UserApi;
