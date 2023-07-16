import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export type LocationIQ_SuggestItem = {
  place_id: string,
  lat: string,
  lon: string,
  display_name: string
}



type LoactionIQ_SuggestGetParams = {
  apiKey: string,
  search: string
}

//"https://us1.locationiq.com/v1/search?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json"
const locationIQApi = createApi({
  reducerPath: "locationIQAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://us1.locationiq.com/v1/search"
  }),
  endpoints: (builder) => ({
    getSuggest: builder.query<LocationIQ_SuggestItem[], LoactionIQ_SuggestGetParams>({
      query: ({ apiKey, search }) => ({
        url: "",
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

  }),
});

export const {
  useGetSuggestQuery: useGetSuggestQueryLocationIQ,
  useLazyGetSuggestQuery: useLazyGetSuggestQueryLocationIQ
} = locationIQApi;

export default locationIQApi;
