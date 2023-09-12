import ReactNative, { NativeEventEmitter } from "react-native";
import Links from "../globals/RideWebLinks"
interface MySSEConst {
  OPEN_EVENT: string,
  MSG_EVENT: string,
  FAIL_EVENT: string,
  CLOSE_EVENT: string
}
interface MySSENative {
  ConnectSSE: (url: string) => boolean,
  Disconnect: () => boolean,

  MessageEvent: {
    id: string | null,
    type: string | null,
    data: string
  },
  OpenEvent: {
    code: string
  },
  FailEvent: {
    message: string
  } | undefined,
  CloseEvent: {},

  getConstants: () => MySSEConst
}


interface LocationObject {
  lon: number,
  lat: number,
  driver_id: string
}

interface listerners {
  onDriverLoc?: (loc: LocationObject) => void
}

class DriverLocSSE {
  private MySSE;
  private eventEmitter = new NativeEventEmitter(ReactNative.NativeModules.MySSE);
  private SSEConst: MySSEConst | undefined;
  public listeners: listerners = {};

  isRunning = false;

  constructor() {
    this.MySSE = ReactNative.NativeModules.MySSE as MySSENative;
    this.SSEConst = this.MySSE.getConstants();
    console.log(this.SSEConst);
    console.log(this.MySSE.ConnectSSE);
    this.eventEmitter.addListener(this.SSEConst.MSG_EVENT, (e: MySSENative["MessageEvent"]) => {
      const data = e.data;
      console.log("SSE message: ", data);
      try {
        const obj = JSON.parse(e.data) as LocationObject;
        console.log("My SSE Client listeners: ", this.listeners);
        this.listeners?.onDriverLoc?.(obj);
      } catch (e) {
        console.log(e);
      }
    });
    this.eventEmitter.addListener(this.SSEConst.OPEN_EVENT, (e: MySSENative["OpenEvent"]) => {
      this.isRunning = true;
      console.log("SSE Open: ", e.code);
    });
    this.eventEmitter.addListener(this.SSEConst.FAIL_EVENT, (e: MySSENative["FailEvent"]) => {
      console.log("SSE fail: ", e?.message);
    });
    this.eventEmitter.addListener(this.SSEConst.CLOSE_EVENT, (e: MySSENative["CloseEvent"]) => {
      console.log("SSE closed: ");
      this.isRunning = false;
    });

    //this.Connect();
  }
  public Connect(driver_id: string) {
    const success = this.MySSE.ConnectSSE(encodeURI(`${Links.client_driver_sse}/${driver_id}`));
    console.log("Connecting to see result: ", success);

    this.isRunning = true;
  }
  public Disconnect() {
    if (this.isRunning == true) {
      this.MySSE.Disconnect();
    }
  }
}

export default DriverLocSSE;