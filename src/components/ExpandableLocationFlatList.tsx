import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LocationFlatList, { LocationFlatListProps } from "./LocationFlatList";
import { GlobalStyles } from "../styles/colors";


interface ExpandableLocationFlatListProps{
  listProps:LocationFlatListProps,
  mainText: string,
  viewAllText: string  
}

function ExpandableLocationFlatList({listProps,mainText,viewAllText}:ExpandableLocationFlatListProps) {
  return (<View style={styles.listContainer}>
    <View style={{ flexDirection: "row" }}>
      <Text style={{ flex: 1 }}>{mainText}</Text>
      <Text style={{ flex: 1, textAlign: "right" }}>{viewAllText}</Text>
    </View>
    <LocationFlatList {...listProps} />
  </View>);
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: GlobalStyles.mainWhite.color,
    flexDirection: "column",
  },
});


export default ExpandableLocationFlatList;