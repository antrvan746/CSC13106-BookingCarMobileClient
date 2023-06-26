import React from "react";
import {  StyleSheet, View } from "react-native";
import BookVehicle from "../components/RideScreen/BookVehicle";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectAppState, updateAppState } from "../redux/AppState";
import { StackScreenProps } from "../types/Screens";
import RideInfo from "../components/RideScreen/RideInfo";


function RideScreen({ navigation, route }: StackScreenProps): JSX.Element {
  const appState = useAppSelector(selectAppState);
  const dispatch = useAppDispatch();

  const BookBtnClickHandler = () => {
    dispatch(updateAppState({
      state: "Finding",
    }));
  }

  return (<View style={styles.containerWrapper}>
    <View style={styles.mapContainer}></View>
    <View style={styles.actionBoxWrapper}>
      {
        appState.state == "Book" ? <BookVehicle BookBtnPressCallBack={BookBtnClickHandler}  /> : <RideInfo />
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