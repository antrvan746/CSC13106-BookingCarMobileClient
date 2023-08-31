package com.ridehailingmobileclient;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import okhttp3.CacheControl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.sse.EventSource;
import okhttp3.sse.EventSourceListener;
import okhttp3.sse.EventSources;

public class MySSE extends ReactContextBaseJavaModule {
  static final String MSG_EV = "message";
  static final String OPEN_EV = "opened";
  static final String FAIL_EV = "failed";
  static final String CLOSED_EV = "closed";
  public class MyEvSrcListener extends EventSourceListener {
    @Override
    public void onClosed(@NonNull EventSource eventSource) {
      super.onClosed(eventSource);
      MySSE.this.sendEvent(CLOSED_EV,null);
      MySSE.this.ev = null;
      MySSE.this.okHttpClient = null;
    }

    @Override
    public void onEvent(@NonNull EventSource eventSource, @Nullable String id, @Nullable String type, @NonNull String data) {
      super.onEvent(eventSource, id, type, data);
      WritableMap params = Arguments.createMap();
      params.putString("data", data);
      MySSE.this.sendEvent(MSG_EV,params);
    }

    @Override
    public void onFailure(@NonNull EventSource eventSource, @Nullable Throwable t, @Nullable Response response) {
      super.onFailure(eventSource, t, response);
      if(t != null){
        WritableMap params = Arguments.createMap();
        params.putString("message", t.getMessage());
        MySSE.this.sendEvent(FAIL_EV,params);
      }else{
        MySSE.this.sendEvent(FAIL_EV,null);
      }

    }

    @Override
    public void onOpen(@NonNull EventSource eventSource, @NonNull Response response) {
      super.onOpen(eventSource, response);
      WritableMap params = Arguments.createMap();
      params.putString("code", String.valueOf(response.code()));
      MySSE.this.sendEvent(OPEN_EV,params);
    }
  }

  private OkHttpClient.Builder httpClientBuilder = new OkHttpClient.Builder()
          .connectTimeout(15, TimeUnit.MINUTES)
          .callTimeout(15, TimeUnit.MINUTES)
          .readTimeout(15, TimeUnit.MINUTES)
          .writeTimeout(15, TimeUnit.MINUTES);
  @Nullable private String lastEvId;
  @Nullable private EventSource ev;
  @Nullable private  OkHttpClient okHttpClient;
  private final ReactApplicationContext context;

  private void sendEvent(String eventName, @Nullable WritableMap params) {
    context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
  }

  MySSE(ReactApplicationContext ctx){
    super(ctx);
    context = ctx;
  }


  @ReactMethod
  public boolean ConnectSSE(String url){
    if(this.ev == null || this.httpClientBuilder == null){
      return false;
    }

    Request.Builder reqBuilder = new Request.Builder()
            .get()
            .url(url)
            .cacheControl(CacheControl.FORCE_NETWORK);

    if(lastEvId != null){
      reqBuilder.header("Last-Event-ID", lastEvId);
    }
    okHttpClient = httpClientBuilder.build();
    ev = EventSources
            .createFactory(okHttpClient)
            .newEventSource(reqBuilder.build(),new MyEvSrcListener());

    return true;
  }

  @ReactMethod
  public boolean Disconnect(){
    if(this.ev != null){
      this.ev.cancel();
    }
    if(this.okHttpClient != null){
      this.okHttpClient.dispatcher().cancelAll();
    }
    return true;
  }

  @NonNull
  @Override
  public String getName() {
    return "MySSE";
  }

  @Nullable
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put("OPEN_EVENT",OPEN_EV);
    constants.put("MSG_EVENT",MSG_EV);
    constants.put("FAIL_EVENT",FAIL_EV);
    constants.put("CLOSE_EVENT",CLOSED_EV);
    return constants;
  }
}
