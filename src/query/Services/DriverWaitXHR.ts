interface Listeners {
  onrespond?: (msg: string) => void
}

class DriverWaitXHR {

  listeners: Listeners
  _my_red_loop: number | undefined | NodeJS.Timeout

  constructor(handlers: Listeners) {
    this.listeners = handlers;
    this._reqloop = this._reqloop.bind(this)
  }

  private async _reqloop() {
    const res = await fetch("http://10.0.2.2:3080/xhr/driver/w3gv", {
      method: "GET",
    });
    const msg = res.text();
    console.log("Get message: ", msg);
    this._my_red_loop = setTimeout(()=>{this._reqloop()}, 5000);
  }

  public Connect() {
    this.Close();
    this._reqloop();
  }

  public Close() {
    if (this._my_red_loop) {
      clearTimeout(this._my_red_loop);
    }
  }
}

export default DriverWaitXHR;