import DriverLocSSE from "./DriverLocSSE";
import DriverWaitXHR from "./DriverWaitXHR";
import RideWs from "./RideWs";

export default  {
  DriverPoll: new DriverWaitXHR({}),
  RideWs: new RideWs({}),
  DriverLoc: new DriverLocSSE()
} as const