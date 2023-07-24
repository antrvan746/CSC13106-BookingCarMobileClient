import Links from "../globals/RideWebLinks";

interface SocketListener {
  onOpen: (() => void),
  onMessage: ((e: WebSocketMessageEvent) => void),
  onError: ((e: WebSocketErrorEvent) => void),
  onClose: ((e: WebSocketCloseEvent) => void)
}

interface RideWsConstrucProps {
  onOpen?: SocketListener["onOpen"]
  onMessage?: SocketListener["onMessage"]
  onError?: SocketListener["onError"]
  onClose?: SocketListener["onClose"]
}

class RideWs {
  private ws: WebSocket | undefined

  public client_listeners: RideWsConstrucProps

  constructor(listeners: RideWsConstrucProps) {
    this.client_listeners = listeners;
  }

  public Connect() {
    if (this.ws) {
      return
    }

    this.ws = new WebSocket(Links.client_trip_ws);
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
    console.log("Web socket message: ", e.data);
    this?.client_listeners?.onMessage?.(e)
  }

  private _onWsError(e: WebSocketErrorEvent) {
    console.log("Web socket error: ", e.message);
    this?.client_listeners?.onError?.(e)
  }

  private _onWsClose(e: WebSocketCloseEvent) {
    console.log(`Web socket closed. Code: ${e.code}. Message: ${e.message}. Reason: ${e.reason}`);
    this?.client_listeners?.onClose?.(e)
  }

  public Close() {
    try {
      this.ws?.close();
      this.ws = undefined;
    } catch (e) {
      console.log("Web socket closing error: ", e);
    }
  }

  public Send(data: string | ArrayBuffer | ArrayBufferView | Blob) {
    try { this.ws?.send(data) } catch (e) {
      console.log("Web socket send error: ", e);
    }
  }

}

export default {
  GlobalRideWs: new RideWs({})
} as const;