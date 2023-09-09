import React, { useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { GlobalStyles } from "../styles/colors";
import { StackScreenProps } from "../types/Screens";
import LocationFlatList from "../components/LocationFlatList";
import ExpandableLocationFlatList from "../components/ExpandableLocationFlatList";
import SearchTxtInput from "../components/SearchInput";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectRideLocationState, setDropOffState, setPickUpState, setRideLocationState } from "../redux/RideLocation";
import { LocationCoordinate } from "../types/LocationItem";

interface SearchScreenProps extends StackScreenProps {
  skip: boolean
}

function SearchScreen({ navigation, route }: StackScreenProps): JSX.Element {
  const [isSearching, setSearching] = useState<LocationCoordinate[] | null>(null);

  const rideLocState = useAppSelector(selectRideLocationState);
  const dispatch = useAppDispatch();
  const setRideState = useRef<"Pick" | "Drop" | null>(null);


  function onPickSuggestionFound(suggest: LocationCoordinate[]) {
    console.log("Suggest", suggest);
    setRideState.current = "Pick";
    setSearching(suggest);
    //setSearching(suggest);
  }
  function onPickDropSuggestionFound(suggest: LocationCoordinate[]) {
    console.log("Suggest", suggest);
    setRideState.current = "Drop";
    setSearching(suggest);
    //setSearching(suggest);
  }
  function onSearchPickUpFocus() {
    console.log("Foucus pickup")
    setRideState.current = "Pick";
  }

  function onSearchDropOffFocus() {
    console.log("Foucus dropoff")
    setRideState.current = "Drop";
  }

  function searchItemSelect(place: LocationCoordinate) {
    if (setRideState.current) {
      if (setRideState.current == "Pick") {
        dispatch(setPickUpState(place));
        console.log("Pickup", place.lon, place.lat)

      } else {
        dispatch(setDropOffState(place));
        console.log("Drop off", place.lon, place.lat)
      }
    }
    //setPickUp(place);
    setSearching(null);
  }

  return (<View style={styles.containerWrapper}>
    <View style={styles.headerSearchContainer}>
      <SearchTxtInput
        service="LocationIQ"
        textValue={rideLocState?.pickUp?.name || rideLocState?.pickUp?.address || ""}
        iconName={"my-location"} color={"#237FEB"}
        onSuggestionFound={onPickSuggestionFound} />
      <SearchTxtInput
        service="LocationIQ"
        textValue={rideLocState?.dropOff?.name || rideLocState?.dropOff?.address || ""}
        iconName={"location-on"} color={"#EB3223"}
        onSuggestionFound={onPickDropSuggestionFound} />

    </View>

    {isSearching ? null :
      <View style={{ flex: 1, backgroundColor: "blue" }} >
        <ExpandableLocationFlatList listProps={{ locations: [] }}
          mainText={"Saved place"} viewAllText={"View All"} />

        <ExpandableLocationFlatList listProps={{ locations: [] }}
          mainText={"Recent place"} viewAllText={"View All"} />
      </View>
    }

    {(!isSearching) ? null :
      <View style={{ flex: 1, backgroundColor: "pink" }}>
        {
          isSearching.length <= 0 ? <Text>{"Can't find any location"}</Text> : null
        }
        <LocationFlatList onItemClickHandle={searchItemSelect} locations={isSearching} />
      </View>
    }

  </View>)
}

const styles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: "#D9D9D9",
    flex: 1
  },


  headerSearchContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: GlobalStyles.mainWhite.color,
    justifyContent: "center",
    alignItems: "center",

  },
  textInputWrapper: {
    width: "74%",
    paddingHorizontal: 5,
    margin: 4,
    borderRadius: 10,
    flexDirection: "row",
    elevation: 20
  },
  textInputStyle: {
    backgroundColor: "blue", //GlobalStyles.mainWhite.color,
    padding: 2,
    flex: 1,
    fontSize: 16,
    minHeight: 36,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,

  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.mainWhite.color,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    aspectRatio: 1
  },




})

export default SearchScreen;