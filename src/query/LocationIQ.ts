import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type LocationIQ_SuggestItem = {
  place_id: string,
  lat: string,
  lon: string,
  display_name: string
}
export type LocationIQ_Directions = {
  "routes":{
    "geometry":string,
    "distance": number,
    "duration": number,
  }[],
  "waypoints": { "location": [number, number] }[]
}


type LoactionIQ_SuggestGetParams = {
  apiKey: string,
  search: string
}

type LocationIQ_RoutingParams = {
  coord: { lon: number, lat: number }[],
  apiKey: string
}

//"https://us1.locationiq.com/v1/search?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json"
const locationIQApi = createApi({
  reducerPath: "locationIQAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://us1.locationiq.com/v1/"
  }),
  endpoints: (builder) => ({
    getSuggest: builder.query<LocationIQ_SuggestItem[], LoactionIQ_SuggestGetParams>({
      query: ({ apiKey, search }) => ({
        url: "/search",
        method: "GET",
        params: {
          key: apiKey,
          q: search,
          limit: 5,
          bounded: 1,
          viewbox: "106.875,10.72265625,106.5234375,10.8984375",
          countrycodes: "vn",
          format: "json"
        }
      })
    }),
    getRoute: builder.query<LocationIQ_Directions, LocationIQ_RoutingParams>({
      query: ({ apiKey, coord }) => {
        const urlParam = coord.map(v => `${v.lon},${v.lat}`).join(";");
        console.log("SearchParam",urlParam)
        return{
          url: `/directions/driving/${urlParam}`,
          method: "GET",
          params: {
            steps: "false",
            alternatives: "false",
            overview: "simplified",
            key: apiKey,
            geometries:"polyline",
            //https:us1.locationiq.com/v1/directions/driving/?key=<Your_API_Access_Token>&steps=false&alternatives=false&overview=full
          },
        }
        
      }
    })
  }),
});

export const {
  useGetSuggestQuery,
  useLazyGetSuggestQuery,
  useGetRouteQuery,
  useLazyGetRouteQuery
} = locationIQApi;

export default locationIQApi;
