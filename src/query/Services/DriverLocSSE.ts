import ReactNative, { NativeEventEmitter } from "react-native";
interface MySSEConst {
  OPEN_EVENT: string,
  MSG_EVENT: string,
  FAIL_EVENT: string,
  CLOSE_EVENT: string
}
interface MySSENative {
  ConnectSSE: (url: string) => boolean,
  MessageEvent: {
    id: string | null,
    type: string | null,
    data: string
  },
  OpenEvent:{
    code:string
  },
  FailEvent:{
    message:string
  }|undefined,
  CloseEvent:{},

  getConstants:()=>MySSEConst
}

class DriverLocSSE {
  private MySSE = ReactNative.NativeModules.MySSE as MySSENative;
  private eventEmitter = new NativeEventEmitter(ReactNative.NativeModules.MySSE);
  private SSEConst = this.MySSE.getConstants();

  constructor() {
    if (!this.MySSE) {
      return
    }

    this.eventEmitter.addListener(this.SSEConst.MSG_EVENT, (e: MySSENative["MessageEvent"]) => {
      console.log("SSE message: ", e.data);
    });
    this.eventEmitter.addListener(this.SSEConst.OPEN_EVENT, (e: MySSENative["OpenEvent"]) => {
      console.log("SSE Open: ", e.code);
    });
    this.eventEmitter.addListener(this.SSEConst.FAIL_EVENT, (e: MySSENative["FailEvent"]) => {
      console.log("SSE fail: ", e?.message);
    });
    this.eventEmitter.addListener(this.SSEConst.CLOSE_EVENT, (e: MySSENative["CloseEvent"]) => {
      console.log("SSE closed: ");
    });

    this.Connect();
  }
  public Connect() {
    this.MySSE.ConnectSSE("http://10.0.2.2:3080/sse/driver_loc");
  }
}

export default DriverLocSSE;