import React from "react";
import { PixelRatio, Pressable, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { GlobalStyles } from "../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons"
import PriceTag from "../components/PriceTag";
import BookVehicle from "../components/RideScreen/BookVehicle";
import RideInfo from "../components/RideScreen/RideInfo";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectAppState, updateAppState } from "../redux/AppState";


function RideScreen(): JSX.Element {

  return (<View style={styles.containerWrapper}>
    <View style={styles.mapContainer}></View>
    <View style={styles.actionBoxWrapper}>
      <BookVehicle />
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