import RideWebLinks from "../globals/RideWebLinks"

interface XHRListeners{
  ontimeout?: (e:ProgressEvent<EventTarget>) => void,
  onreadystatechange?:()=>void,
}

class DriverWaitXHR{
  xhr:XMLHttpRequest

  listeners:XHRListeners

  constructor(handlers:XHRListeners){
    this.xhr = new XMLHttpRequest();
    this.xhr.timeout = 10*60*1000;
    this.xhr.responseType = "arraybuffer";

    this.listeners = handlers;

    this.xhr.ontimeout = this.onTimeOut
    this.xhr.onreadystatechange = this.onReadyStateChange
    this.xhr.onload = (e)=>{
      const arr = new Uint8Array(this.xhr.response);

      const msg = String.fromCharCode.apply(null,arr as any);
      

      console.log("On load: ",arr,msg);
    }
  }

  private onTimeOut(e:ProgressEvent<EventTarget>){
    console.log("XHR timeout");
    if(!!this.listeners.ontimeout?.(e)){
      this.Connect();
    }
  }

  private onReadyStateChange(){
    console.log("On ready state changed");
    this.listeners?.onreadystatechange?.();
  }

  public Connect(){
    this.xhr.open("GET",RideWebLinks.driver_waiting_xhr,true);
    this.xhr.send();
  }

  public Close(){
    this.xhr.abort();
  }
}

export default {
  GlobalDriverWaithXHR: new DriverWaitXHR({})
} as const