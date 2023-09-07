import React, { useEffect, useState } from "react"
import { Alert, Modal, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { GlobalStyles } from "../../styles/colors"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectAppState, updateAppState } from "../../redux/AppState"
import GlobalServices from "../../query/Services/GlobalServices"
import { RindeRequestInfo } from "../../query/Services/RideWs"

interface DriverInfo {
  phone: string;
  name: string;
  vehicle: {
    plate_number: string;
    model: string;
    color: string | null;
    type: string | null;
  }
}


function WaitingDriver(req: RindeRequestInfo) {
  return (
    <View style={styles.statusTxtWrapper}>
      <Text style={styles.mainTxt}>Tài xế bạn đang tới</Text>
      <Text style={[styles.mainTxt, { textAlign: "right" }]}>15 phút</Text>
      <Text style={styles.descTxt}>
        {req.sadr}
      </Text>
    </View>);
}

function FindingDriver() {
  return (<View style={[styles.statusTxtWrapper, { paddingVertical: 15 }]}>
    <Text style={[styles.mainTxt, { maxWidth: "100%", fontSize: 24, textAlign: "center" }]} >
      Finding a driver...
    </Text>
  </View>)
}

function GoingWithDriver(req: RindeRequestInfo) {
  return (<View style={styles.statusTxtWrapper}>
    <Text style={[styles.mainTxt, { maxWidth: "100%" }]} >Currently traveling</Text>
    <Text style={styles.descTxt}>
      {req.eadr}
    </Text>
  </View>)
}


function DriverInfo(driver: DriverInfo) {

  return (<View style={styles.infoWrapper}>
    <View style={styles.driverInfoWrapper}>
      <View style={styles.iconWrapper}>
        <Icon name="person" size={36} style={styles.icon}
          color={GlobalStyles.mainWhite.color} />
      </View>
      <Text style={{ marginLeft: 10 }}>
        {driver.name}
      </Text>
    </View>

    <View style={styles.vehicleInfoWrapper}>
      <Text style={{ textAlign: "center" }}>{driver.vehicle.plate_number}</Text>
      <Text>{driver.vehicle.model}</Text>
    </View>
  </View>)
}

interface RideInfoProps {
  onDriverUpdate: (lon: number, lat: number) => void,
  onTripDone: ()=>void,
  req: RindeRequestInfo,
}

function RideInfo(props: RideInfoProps): JSX.Element {
  const appState = useAppSelector(selectAppState);
  const dispatch = useAppDispatch();

  const [driverInfo, setDriverInfo] = useState<DriverInfo | null>(null);

  function CallUpdateDriver(loc: any) {
    props.onDriverUpdate(loc.lon, loc.lat);
  }

  const GetDriverInfo = async function (driver_id: string) {
    try {
      const req = await fetch(encodeURI(`http://10.0.2.2:3000/api/drivers/find_info?driver_id=${driver_id}`));
      if (req.status !== 200) {
        console.log(await req.json())
        return null;
      }
      return (await req.json()) as DriverInfo;
    } catch (error) {
      console.warn(error);
      return null;
    }
  }

  console.log(driverInfo);

  useEffect(() => {
    console.log("Connecting to websocket");
    //GlobalServices.RideWs.Connect();
    GlobalServices.DriverLoc.listeners.onDriverLoc = (loc)=>{
      CallUpdateDriver(loc);
    };

    GlobalServices.RideWs.client_listeners.onDriverAtPick = () => {
      Alert.alert("Driver arrived", "Tài xế đã đến nơi đón, bạn hãy nhìn xung quanh xem !")
    }

    GlobalServices.RideWs.client_listeners.onTripStart = () => {
      dispatch(updateAppState({ state: "Going" }));
    }

    GlobalServices.RideWs.client_listeners.onDriverAtDrop = () => {
      GlobalServices.RideWs.Close();
      GlobalServices.DriverLoc.Disconnect();
      Alert.alert("You has arrived", "Bạn đã tới đích của bạn. ",[],{
        cancelable:true,
        onDismiss: ()=>{
          props.onTripDone();
        }
      });
      
    }

    GlobalServices.RideWs.client_listeners.onDriverFound = (i) => {
      GetDriverInfo(i.driver_id).then(v => {
        console.log("Watch driver location: ", i.driver_id)
        GlobalServices.DriverLoc.Connect(i.driver_id);
        dispatch(updateAppState({ state: "Waiting" }));        
        setDriverInfo(v);
        if (v == null) {
          console.warn("Cant find driver info")
          return;
        }
        const msg = `
        Driver name: ${v.name}
        Vehicle: ${v.vehicle.model}
        Plate: ${v.vehicle.plate_number}`;
        Alert.alert("Driver found", msg,
          [
            { text: "Ok" }
          ]
        );
      });


    }

  })
  return (<View>

    {appState.state == "Finding" ? <FindingDriver /> : null}
    {appState.state == "Waiting" ? <WaitingDriver {...props.req} /> : null}
    {appState.state == "Going" ? <GoingWithDriver {...props.req} /> : null}

    {appState.state != "Finding" && driverInfo ? <DriverInfo {...driverInfo} /> : null}

  </View>)
}

const styles = StyleSheet.create({
  statusTxtWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: GlobalStyles.mainWhite.color,
    borderRadius: 15
  },
  mainTxt: {
    fontWeight: "bold",
    minWidth: "40%",
    flex: 1,
  },
  descTxt: {
    minWidth: "85%"
  },

  infoWrapper: {
    backgroundColor: GlobalStyles.mainWhite.color,
    marginTop: 16,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 10
  },
  driverInfoWrapper: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrapper: {
    justifyContent: "center",
    alignContent: "center",
  },
  icon: {
    backgroundColor: GlobalStyles.green500.color,
    padding: 4,
    borderRadius: 22
  },
  vehicleInfoWrapper: {
    alignItems: "center",
    flex: 1
  }
})

export default RideInfo;