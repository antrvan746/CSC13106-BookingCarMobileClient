import Links from "../globals/RideWebLinks";

interface SocketListener {
  onOpen: (() => void),
  onMessage: ((e: WebSocketMessageEvent) => void),
  onError: ((e: WebSocketErrorEvent) => void),
  onClose: ((e: WebSocketCloseEvent) => void)
}

interface DriverInfo {
  driver_id: string
}

export interface RindeRequestInfo {
  "slon": number,
  "slat": number,
  "sadr": string,

  "elon": number,
  "elat": number,
  "eadr": string,

  "user_id": string,
  "price": number
}

interface RideWsConstrucProps {
  onOpen?: SocketListener["onOpen"]
  onMessage?: SocketListener["onMessage"]
  onError?: SocketListener["onError"]
  onClose?: SocketListener["onClose"],
  onDriverFound?: (info: DriverInfo) => void,
  onDriverAtPick?: () => void,
  onDriverAtDrop?: () => void
  onTripStart?: () => void,
  onNoDriver?: () => void,
}

class RideWs {
  private ws: WebSocket | undefined
  static readonly StatusMsg = {
    DriverFound: "DRF߷",
    NoDriver: "NDR߷",
    DriverCancel: "DCX߷",
    ClientCancel: "CCX߷",
    DriverArrivePick: "DAP߷",
    DriverArriveDrop: "DAD߷",
    TripId: "TID߷",
    Message: "MSG߷",
    DriverStratTrip: "DST߷",
  }
  public client_listeners: RideWsConstrucProps

  constructor(listeners: RideWsConstrucProps) {
    this.client_listeners = listeners;

    this._onWsOpen = this._onWsOpen.bind(this);
    this._onWsError = this._onWsError.bind(this);
    this._onWsClose = this._onWsClose.bind(this);
    this._onWsMessage = this._onWsMessage.bind(this);
  }

  public Connect(info: RindeRequestInfo) {
    if (this.ws) {
      console.log("Already socket ");
      return
    }

    const queries = Object.entries(info).map(([k, v]) => `${k}=${v}`).join("&");
    const url = `ws://10.0.2.2:3081/ws/client/w3gv7?${queries}`;
    console.log("Creating websocket")
    this.ws = new WebSocket(encodeURI(url), "ws");
    //this.ws = new WebSocket(url,"ws");
    this.ws.onopen = this._onWsOpen;
    this.ws.onmessage = this._onWsMessage;
    this.ws.onerror = this._onWsError;
    this.ws.onclose = this._onWsClose;
  }

  private _onWsOpen() {
    console.log(this.client_listeners);
    console.log("Web socket open");
    this.client_listeners?.onOpen?.()
  }



  private _onWsMessage(e: WebSocketMessageEvent) {
    if (!e.data || typeof e.data !== "string") {
      return
    }
    const msg = e.data as string
    //console.log("Web socket message: ", e.data);
    const cmd = msg.length <= 4 ? msg : msg.substring(0, 4)
    switch (cmd) {
      case RideWs.StatusMsg.NoDriver:
        this.client_listeners?.onNoDriver?.()
        this.Close();
        break;
      case RideWs.StatusMsg.Message:
        console.log("Driver msg: ", e.data);
        break;
      case RideWs.StatusMsg.DriverArrivePick:
        console.log("Driver arrive at pickup");
        this.client_listeners?.onDriverAtPick?.();
        break;
      case RideWs.StatusMsg.DriverArriveDrop:
        console.log("Driver has drop you off");
        this.client_listeners?.onDriverAtDrop?.();
        break;
      case RideWs.StatusMsg.DriverStratTrip:
        this.client_listeners?.onTripStart?.();
        break;
      case RideWs.StatusMsg.DriverFound:
        try {
          const driver = JSON.parse(msg.substring(4))
          this.client_listeners?.onDriverFound?.(driver);
        } catch (e) {
          console.log(e)
        }
        break
      default:
        console.log("Unknow ws cmd:", cmd, msg)
    }

  }

  private _onWsError(e: WebSocketErrorEvent) {
    console.log("Web socket error: ", e.message);
    this.client_listeners?.onError?.(e)
  }

  private _onWsClose(e: WebSocketCloseEvent) {
    console.log(`Web socket closed. Code: ${e.code}. Reason: ${e.reason}`);
    this._onWsMessage({ data: e.reason });

    this.client_listeners.onClose?.(e);
    this.Close();
  }

  public Close() {
    try {
      this.ws?.close();
    } catch (e) {
      console.log("Web socket closing error: ", e);
    }
    this.ws = undefined;
  }

  public Send(data: string | ArrayBuffer | ArrayBufferView | Blob) {
    try { this.ws?.send(data) } catch (e) {
      console.log("Web socket send error: ", e);
    }
  }

}

export default RideWs;