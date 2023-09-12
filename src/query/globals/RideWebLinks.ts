const user_api = "http://10.0.2.2:3080/api/users"
const client_trip_ws = "ws://10.0.2.2:8080/ridehail/trip/ws/client"
const client_driver_sse = "http://10.0.2.2:8080/ridehail/sse/sse/driver_loc"
export default {
  user_api,
  client_trip_ws,
  client_driver_sse
} as const;
