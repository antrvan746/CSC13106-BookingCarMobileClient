import react, { useEffect, useRef } from "react";
import { useAppSelector } from "../redux/hooks";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../styles/colors";
//import RideWs from "../query/websocket/RideWs";
import { selectRideWsState } from "../redux/RideWsState";
import ReduxStore from "../redux/store";

import RideWs from "../query/websocket/RideWs";

function RideStatusBar(): JSX.Element | null {
  const rideWsState = useAppSelector(selectRideWsState);

  const wsRef = useRef(RideWs.GlobalRideWs);

  useEffect(() => {
    wsRef.current.client_listeners = { onOpen, onMessage, onError, onClose };
  }, [])

  if (rideWsState.state === "Available") {
    wsRef.current.Connect();
  } else {
    wsRef.current.Close();
  }

  function onOpen() {

  }

  function onMessage(e: WebSocketMessageEvent) {

  }

  function onError(e: WebSocketErrorEvent) {

  }

  function onClose(e: WebSocketCloseEvent) {

  }


  return (<>
    {
      rideWsState.state === "Unavailable" ? null :
        <View style={styles.rootConatiner}>
          <Text>{`Socket state ${rideWsState.state}`}</Text>
        </View>
    }
  </>);
}

const styles = StyleSheet.create({
  rootConatiner: {
    backgroundColor: GlobalStyles.mainWhite.color,
    padding: 12,
    borderRadius: 12
  }
});

export default RideStatusBar;
