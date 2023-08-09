import DriverWaitXHR from "./DriverWaitXHR";
import RideWs from "./RideWs";

export default  {
  DriverPoll: new DriverWaitXHR({}),
  RideWs: new RideWs({}),
} as const