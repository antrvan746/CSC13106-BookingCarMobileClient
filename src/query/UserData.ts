import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import server_endpoint from "./globals/RideWebLinks";
export type UserDetailInfo = {
  id:string  
  email?:string 
  phone?:String 
  name:string
  is_vip:boolean
}

export type GetUsersDetailQueries = {
  phone:string
}

export type PostUserDetailBody = {
  email?:string,
  phone:string,
  name:string
}

const UserDetailApi = createApi({
  reducerPath: "UserDetailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: server_endpoint.user_api
  }),
  endpoints: (builder) =>({
    getUserDetail: builder.query<UserDetailInfo[],GetUsersDetailQueries>({
      query:({phone}) => ({
        url:"",
        method:"GET",
        params:{phone,limit:1}
      })
    }),
    addUserDetail: builder.mutation<UserDetailInfo,PostUserDetailBody>({
      query:(body)=>({
        url:"",
        method:"POST",
        body:{...body}
      })
    })
  })
});

export const  {
  useGetUserDetailQuery,
  useLazyGetUserDetailQuery,
  useAddUserDetailMutation,
} = UserDetailApi
export default UserDetailApi;