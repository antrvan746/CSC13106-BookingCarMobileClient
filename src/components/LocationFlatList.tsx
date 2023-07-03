import React from "react";
import { FlatList, StyleSheet } from "react-native";
import LocationItem, { LocationItemProps } from "./LocationItem";
import { GooglePlaceSuggest, GooglePlaceSuggestList } from "../query/GooglePlace";


export interface LocationFlatListProps {
  locations: GooglePlaceSuggestList ,
  onItemClickHandle?: LocationItemProps["clickHandle"]
}

function LocationFlatList({ locations, onItemClickHandle}: LocationFlatListProps): JSX.Element {
  return (<FlatList
    style={styles.listStyle}
    data={locations.predictions}
    renderItem={({ item }) => { return (<LocationItem clickHandle={onItemClickHandle} {...item} />) }} />)
}

const styles = StyleSheet.create({
  listStyle: {
    marginTop: 10,
  }
});

export default LocationFlatList;