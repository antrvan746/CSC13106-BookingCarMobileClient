import { DriverInfo } from "../../components/RideScreen/RideInfo";
import { UserDetailInfo } from "../UserData";
import DriverLocSSE from "./DriverLocSSE";
import RideWs from "./RideWs";


async function GetPricing(dist: number, time: number) {
  const url = `http://10.0.2.2:3080/api/pricing?distance=${dist}&estimated_time=${time}`;
  try {
    const req = await fetch(encodeURI(url));
    const price = (await req.json()).price;
    if (typeof price == "number") {
      return price
    }
    return Error("There is no price respond");
  } catch (e) {
    return e as Error;
  }
}

async function GetDriverFullInfo(driver_id: string) {
  try {
    const req = await fetch(encodeURI(`http://10.0.2.2:3080/api/drivers/find_info?driver_id=${driver_id}`));
    if (req.status !== 200) {
      return Error(JSON.stringify(await req.json()));
    }
    return (await req.json()) as DriverInfo;
  } catch (error) {
    return error as Error;
  }
}

async function GetUserInfo(phone: string) {
  try {
    const req = await fetch(`http://10.0.2.2:3080/api/users?phone=${phone.replace("+84", "0")}`);
    const json = (await req.json()) as UserDetailInfo[];
    console.log(json);
    return json[0] || null;
  } catch (e) {
    console.warn(e)
    return null;
  }
}

export {
  GetUserInfo,
  GetPricing,
  GetDriverFullInfo
}

export default {
  // DriverPoll: new DriverWaitXHR({}),
  RideWs: new RideWs({}),
  DriverLoc: new DriverLocSSE()
} as const



