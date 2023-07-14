import React, { createRef, useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import BookVehicle from "../components/RideScreen/BookVehicle";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectAppState, updateAppState } from "../redux/AppState";
import { StackScreenProps } from "../types/Screens";
import RideInfo from "../components/RideScreen/RideInfo";
import MapView, { Marker } from "react-native-maps";
import { selectRideLocationState, setRideLocationState } from "../redux/RideLocation";
import { useLazyGetGeocodeFromIdQuery } from "../query/GoogleGeocode";
import MapViewDirections from "react-native-maps-directions";

//google map place auto complete -> google map geocode

//Le Van Tam Park
const mockInitalRegion = {
  latitude: 10.788350595150893,
  longitude: 106.69378372372894,
  latitudeDelta: 0.0001,
  longitudeDelta: 0.0001,
}

function RideScreen({ navigation, route }: StackScreenProps): JSX.Element {
  const appState = useAppSelector(selectAppState);
  const dispatch = useAppDispatch();
  const [queryTrigger] = useLazyGetGeocodeFromIdQuery();
  const rideLocState = useAppSelector(selectRideLocationState);

  const [coordinate, setCoordinate] = useState<{
    pick: number[],
    drop: number[]
  }>()

  async function DropOff() {
    if (!rideLocState.dropOff) {
      return null;
    }

    if (rideLocState.dropOff.detail?.lon && rideLocState.dropOff.detail?.lat) {
      return [rideLocState.dropOff.detail.lat, rideLocState.dropOff.detail.lon];
    }

    const data = await QueryLocation(rideLocState.dropOff.place_id);
    if (!data) {
      return data;
    }
    return [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
  }

  async function PickUp() {
    if (!rideLocState.pickUp) {
      return null;
    }

    if (rideLocState.pickUp.detail?.lon && rideLocState.pickUp.detail?.lat) {
      return [rideLocState.pickUp.detail.lat, rideLocState.pickUp.detail.lon];
    }

    const data = await QueryLocation(rideLocState.pickUp.place_id);
    if (!data) {
      return data;
    }
    return [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
  }

  async function GetCoordinate() {
    const pick = await PickUp();
    const drop = await DropOff();

    console.log(rideLocState.dropOff?.place_id, rideLocState.pickUp?.place_id);

    console.log("Drop", drop);
    console.log("Pick", pick);
    if (pick && drop) {
      setCoordinate({ pick, drop });
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
          description: "Le Van Tam Park",
          place_id: "123",
          detail: { name: "Le Van Tam Park", address: "123", lat: LeVanTamPark[0], lon: LeVanTamPark[1] }
        },
        dropOff: {
          description: "Tan Dinh Church",
          place_id: "123",
          detail: { name: "Tan Dinh Church", address: "123", lat: TanDinhChurch[0], lon: TanDinhChurch[1] }
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
            style={StyleSheet.absoluteFillObject} >
            <Marker key={1} description="Pick up"
              coordinate={{ latitude: coordinate.pick[0], longitude: coordinate.pick[1], }} />
            <Marker key={2} description="Drop off"
              coordinate={{ latitude: coordinate.drop[0], longitude: coordinate.drop[1], }} />
            <MapViewDirections strokeWidth={3} strokeColor={"hotpink"}
              apikey="AIzaSyDekTKGUSYNDS2O17iZV8Lw9l0ysEWtT_A"
              origin={{ latitude: coordinate.pick[0], longitude: coordinate.pick[1], }}
              destination={{ latitude: coordinate.drop[0], longitude: coordinate.drop[1], }} />
          </MapView>
      }

    </View>
    <View style={styles.actionBoxWrapper}>
      {
        appState.state == "Book" ? <BookVehicle BookBtnPressCallBack={BookBtnClickHandler} /> : <RideInfo />
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