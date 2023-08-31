import React, { createRef, useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import BookVehicle from "../components/RideScreen/BookVehicle";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectAppState, updateAppState } from "../redux/AppState";
import { StackScreenProps } from "../types/Screens";
import RideInfo from "../components/RideScreen/RideInfo";
import MapView, { Marker, Polyline } from "react-native-maps";
import { selectRideLocationState, setRideLocationState } from "../redux/RideLocation";
import { useLazyGetGeocodeFromIdQuery } from "../query/GoogleGeocode";
import MapViewDirections from "react-native-maps-directions";
import { LocationIQ_Directions, useLazyGetRouteQuery } from "../query/LocationIQ";
import polyline from "@mapbox/polyline"
import GlobalServices from "../query/Services/GlobalServices";
import { RindeRequestInfo } from "../query/Services/RideWs";
//google map place auto complete -> google map geocode

//Le Van Tam Park
const mockInitalRegion = {
  latitude: 10.788350595150893,
  longitude: 106.69378372372894,
  latitudeDelta: 0.0001,
  longitudeDelta: 0.0001,
}
function DecodePolyline(code: string): { latitude: number, longitude: number }[] {
  const coord = polyline.decode(code, 5)
  return coord.map(v => ({
    latitude: v[0],
    longitude: v[1]
  }))
}



function RideScreen({ navigation, route }: StackScreenProps): JSX.Element {
  const appState = useAppSelector(selectAppState);
  const dispatch = useAppDispatch();
  const [queryTrigger] = useLazyGetGeocodeFromIdQuery();
  const rideLocState = useAppSelector(selectRideLocationState);
  const [routeTrigger, routing] = useLazyGetRouteQuery();
  const rideReqInfo = useRef<RindeRequestInfo>({
    sadr: "", eadr: "",
    slat: 0, slon: 0, elat: 0, elon: 0,
    user_id: "abc"
  })
  //console.log(JSON.stringify(routing.data?.routes));

  const [driverCoord, setDriverCoord] = useState<{ lon?: number, lat?: number }>({})

  const [coordinate, setCoordinate] = useState<{
    pick: number[],
    drop: number[]
  }>()

  async function DropOff() {
    if (!rideLocState.dropOff) {
      return null;
    }

    if (rideLocState.dropOff?.lon && rideLocState.dropOff?.lat) {
      return [rideLocState.dropOff.lat, rideLocState.dropOff.lon];
    }

    if (rideLocState.dropOff.id) {
      const data = await QueryLocation(rideLocState.dropOff.id);
      if (!data) { return data; }
      return [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
    }
    return null
  }

  async function PickUp() {
    if (!rideLocState.pickUp) {
      return null;
    }

    if (rideLocState.pickUp.lon && rideLocState.pickUp.lat) {
      return [rideLocState.pickUp.lat, rideLocState.pickUp.lon];
    }

    if (rideLocState.pickUp.id) {
      const data = await QueryLocation(rideLocState.pickUp.id);
      if (!data) {
        return data;
      }
      return [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
    }

    return null;
  }

  async function GetCoordinate() {
    const pick = await PickUp();
    const drop = await DropOff();

    console.log(rideLocState.dropOff?.id, rideLocState.pickUp?.id);

    console.log("Drop", drop);
    console.log("Pick", pick);
    if (pick && drop) {
      setCoordinate({ pick, drop });
      routeTrigger({
        coord: [
          { lat: pick[0], lon: pick[1] },
          { lat: drop[0], lon: drop[1] }
        ],
        apiKey: "pk.6290201b4314f0a31f29a0867aa0bf85"
      })

      rideReqInfo.current = {
        slat: pick[0], slon: pick[1],
        sadr: rideLocState.pickUp?.name || rideLocState.pickUp?.address || rideLocState.pickUp?.id || "",
        elat: drop[0], elon: drop[1],
        eadr: rideLocState.dropOff?.name || rideLocState.dropOff?.address || rideLocState.dropOff?.id || "",
        user_id: "test_user"
      }

    }
  }

  async function QueryLocation(place_id: string) {
    const geoData = (await queryTrigger({ place_id })).data;

    console.log(geoData);

    return geoData ? geoData : null;
  }

  useEffect(() => {
    const LeVanTamPark = [10.788329516745137, 106.69377299541277];
    const TanDinhChurch = [10.788540300830162, 106.69074746365344];
    if (!rideLocState.dropOff && !rideLocState.pickUp) {
      dispatch(setRideLocationState({
        pickUp: {
          name: "Le Van Tam Park", id: "123",
          lat: LeVanTamPark[0], lon: LeVanTamPark[1]
        },
        dropOff: {
          name: "Tan Dinh Church", id: "123",
          lat: TanDinhChurch[0], lon: TanDinhChurch[1]
        }
      }));
      GetCoordinate();
    } else {
      GetCoordinate();
    }


  }, []);

  const mapViewRef = createRef<MapView>();

  const BookBtnClickHandler = () => {
    dispatch(updateAppState({
      state: "Finding",
    }));
    if (coordinate) {
      GlobalServices.RideWs.Connect(rideReqInfo.current);
    }

  }

  function onMapLayout(event: LayoutChangeEvent) {
    if (mapViewRef.current) {
      console.log("Map view on layout");
      mapViewRef.current.fitToCoordinates([
        mockInitalRegion,
      ], {
        edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
        animated: false
      });
    }
  }

  function OnDriverChangeLoc(lon: number, lat: number) {
    setDriverCoord({ lon, lat });
    console.log("Get driver location", lon, lat);
  }

  return (<View style={styles.containerWrapper}>
    <View style={styles.mapContainer}>
      {
        !coordinate ? null :
          <MapView
            ref={mapViewRef}
            onLayout={onMapLayout}
            initialRegion={{
              latitude: coordinate.pick[0],
              longitude: coordinate.pick[1],
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            showsUserLocation={true}
            style={StyleSheet.absoluteFillObject} >
            <Marker key={1} description="Pick up"
              coordinate={{ latitude: coordinate.pick[0], longitude: coordinate.pick[1], }} />
            <Marker key={2} description="Drop off"
              coordinate={{ latitude: coordinate.drop[0], longitude: coordinate.drop[1], }} />

            {
              !driverCoord.lat || !driverCoord.lon ? null :
                <Marker key={3} description="Driver" pinColor="blue"
                  coordinate={{ latitude: driverCoord.lat, longitude: driverCoord.lon }} />
            }

            {
              !routing.data || routing.data.routes.length <= 0 ? null : //null
                <Polyline fillColor="hotpink" strokeWidth={5} strokeColor="hotpink"
                  coordinates={DecodePolyline(routing.data.routes[0].geometry)} />
            }
          </MapView>
      }

    </View>
    <View style={styles.actionBoxWrapper}>
      {
        appState.state == "Book" ?
          <BookVehicle BookBtnPressCallBack={BookBtnClickHandler} />
          :
          <RideInfo onDriverUpdate={OnDriverChangeLoc} req={rideReqInfo.current} />
      }
    </View>
  </View>)
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "pink"
  },
  actionBoxWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 5
  },




})

export default RideScreen;