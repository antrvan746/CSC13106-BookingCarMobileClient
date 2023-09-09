import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export type GetGeocodeFromIdParam = {
  place_id:string
};

export type GeocodeApiReturn = {
  results:{
    formatted_address:string
    geometry:{
      location:{
        lat:number,
        lng:number
      }
    },
    place_id:string
  }[],

};

const googleGeocodeApi = createApi({
  reducerPath: 'googleGeocodeApi',
  baseQuery: fetchBaseQuery({
    baseUrl:"https://maps.googleapis.com/maps/api/geocode/json"
  }),
  endpoints: (builder) => ({
      getGeocodeFromId: builder.query<GeocodeApiReturn,GetGeocodeFromIdParam>({
        query:({place_id}) => ({
          url: "",
          method:"GET",
          params:{
            place_id,
            key:"AIzaSyDekTKGUSYNDS2O17iZV8Lw9l0ysEWtT_A"
          }
        })
      })
  }),
});

export const {useGetGeocodeFromIdQuery,useLazyGetGeocodeFromIdQuery} = googleGeocodeApi;
export default googleGeocodeApi;