import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ArrayElement } from '../types/Utilis'
//https://maps.googleapis.com/maps/api/place/autocomplete/json?input=LeVanTam&location=10.788350595150893%2C106.69378372372894&radius=500&key=
//API key = AIzaSyDekTKGUSYNDS2O17iZV8Lw9l0ysEWtT_A
//10.788329516735738, 106.69383736790647

export type GooglePlaceQueryParam = {
  input: string,
  lat: number,
  lon: number,
  radius: number
}
export type GooglePlaceSuggestList = {
  predictions:{
    description:string,
    place_id:string,
    detail?:{
      name:string,
      address:string,
      lat?:number,
      lon?:number,
      place_id?:string
    }
  }[]
}

export type GooglePlaceSuggest = ArrayElement<GooglePlaceSuggestList["predictions"]>

const googlePlaceApi = createApi({
  reducerPath: 'googlePlaceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://maps.googleapis.com/maps/api/place/autocomplete/json`
  }),
  endpoints: (builder) => ({
    getSuggestPlace: builder.query<GooglePlaceSuggestList, GooglePlaceQueryParam>({
      query: ({ input, lon, lat, radius }) => ({
        url:"",
        method:"GET",
        params:{
          input,radius,
          location:`${lat},${lon}`,
          key:"AIzaSyDekTKGUSYNDS2O17iZV8Lw9l0ysEWtT_A"
        }
      })
    })
  })
});

export const {useGetSuggestPlaceQuery,useLazyGetSuggestPlaceQuery} = googlePlaceApi;
export default googlePlaceApi;
