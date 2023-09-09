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
import { selectLoginState } from "../redux/LoginState";
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
  const [rideReqInfo, setRideReq] = useState<RindeRequestInfo>({
    sadr: "", eadr: "",
    slat: 0, slon: 0, elat: 0, elon: 0,
    user_id: "abc", price: 0
  });
  const loginState = useAppSelector(selectLoginState);
  const mapViewRef = useRef<MapView | null>(null);

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
      const { data } = await routeTrigger({
        coord: [
          { lat: pick[0], lon: pick[1] },
          { lat: drop[0], lon: drop[1] }
        ],
        apiKey: "pk.6290201b4314f0a31f29a0867aa0bf85"
      })
      let ride_price = 0;
      if (data && data.routes.length > 0) {
        const distance = data.routes[0].distance / 1000;
        const time = data.routes[0].duration;
        console.log("Pricing factor",distance,time);
        const url = `http://10.0.2.2:3000/api/pricing?distance=${distance}&estimated_time=${time}`;
        try {
          const req = await fetch(encodeURI(url));
          const price = (await req.json()).price;
          console.log("Trip price",price);
          if (price) {
            ride_price = price;
          }
        } catch (e) {
          console.log("Get price error: ", e)
        }
      }

      setRideReq({
        slat: pick[0], slon: pick[1],
        sadr: rideLocState.pickUp?.name || rideLocState.pickUp?.address || rideLocState.pickUp?.id || "",
        elat: drop[0], elon: drop[1],
        eadr: rideLocState.dropOff?.name || rideLocState.dropOff?.address || rideLocState.dropOff?.id || "",
        user_id: loginState.user?.detail?.id || "test_user",
        price: ride_price,
      });

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


  const BookBtnClickHandler = () => {
    dispatch(updateAppState({
      state: "Finding",
    }));
    if (coordinate) {
      GlobalServices.RideWs.Connect(rideReqInfo);
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
    console.log("Map ref",mapViewRef.current);
    mapViewRef.current?.animateToRegion({
      latitude:lat,
      longitude:lon,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008,
    });
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
          <BookVehicle BookBtnPressCallBack={BookBtnClickHandler} price={rideReqInfo.price} />
          :
          <RideInfo onDriverUpdate={OnDriverChangeLoc} req={rideReqInfo} onTripDone={()=>{
            navigation.replace("Main")
          }} />
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