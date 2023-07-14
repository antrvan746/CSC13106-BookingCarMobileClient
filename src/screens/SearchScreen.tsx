import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, Text, FlatList, TextInputTextInputEventData, NativeSyntheticEvent, TextInputFocusEventData, ScrollView } from "react-native";
import { View } from "react-native";
import { GlobalStyles } from "../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons"
import LocationItem from "../components/LocationItem";
import { StackScreenProps } from "../types/Screens";
import { GooglePlaceSuggest, GooglePlaceSuggestList, useGetSuggestPlaceQuery, useLazyGetSuggestPlaceQuery } from "../query/GooglePlace";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import LocationFlatList from "../components/LocationFlatList";
import ExpandableLocationFlatList from "../components/ExpandableLocationFlatList";
import SearchTxtInput from "../components/SearchInput";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectRideLocationState, setDropOffState, setPickUpState, setRideLocationState } from "../redux/RideLocation";

interface SearchScreenProps extends StackScreenProps {
  skip: boolean
}

function SearchScreen({ navigation, route }: StackScreenProps): JSX.Element {
  const [isSearching, setSearching] = useState<GooglePlaceSuggestList | null>(null);

  const rideLocState = useAppSelector(selectRideLocationState);
  const dispatch = useAppDispatch();

  const setRideState = useRef<"Pick" | "Drop" | null>(null);

  function onSuggestionFound(suggest: GooglePlaceSuggestList) {
    console.log("Suggest",suggest);
    setSearching(suggest);
  }

  function onSearchPickUpFocus() {
    console.log("Foucus pickup")
    setRideState.current = "Pick";
  }

  function onSearchDropOffFocus() {
    console.log("Foucus dropoff")
    setRideState.current = "Drop";
  }

  function searchItemSelect(place: GooglePlaceSuggest) {
    if (setRideState.current) {
      if(setRideState.current == "Pick"){
        dispatch(setPickUpState({
          place_id: place.place_id,
          description: place.description
        }));
      }else{
        dispatch(setDropOffState({
          place_id: place.place_id,
          description: place.description
        }));
      }
    }
    //setPickUp(place);
    setSearching(null);
  }

  return (<View style={styles.containerWrapper}>
    <View style={styles.headerSearchContainer}>
      <SearchTxtInput
        {...(rideLocState.pickUp ? { textValue: rideLocState.pickUp.description } : {})}
        iconName={"my-location"} color={"#237FEB"}
        onTextInputFocus={onSearchPickUpFocus}
        onSuggestionFound={onSuggestionFound} />
      <SearchTxtInput
        {...(rideLocState.dropOff ? { textValue: rideLocState.dropOff.description } : {})}
        iconName={"location-on"} color={"#EB3223"}
        onTextInputFocus={onSearchDropOffFocus}
        onSuggestionFound={onSuggestionFound} />

    </View>

    {isSearching ? null :
      <View style={{ flex: 1, backgroundColor: "blue" }} >
        <ExpandableLocationFlatList listProps={{ locations: { predictions: [] } }}
          mainText={"Saved place"} viewAllText={"View All"} />

        <ExpandableLocationFlatList listProps={{ locations: { predictions: [] } }}
          mainText={"Recent place"} viewAllText={"View All"} />
      </View>
    }

    {(!isSearching || isSearching.predictions.length <= 0) ? null :
      <View style={{ flex: 1, backgroundColor: "pink" }}>
        <LocationFlatList onItemClickHandle={searchItemSelect} locations={isSearching}
        />
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