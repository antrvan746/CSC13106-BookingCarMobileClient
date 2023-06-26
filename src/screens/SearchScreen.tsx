import React from "react";
import { StyleSheet, TextInput, Text, FlatList } from "react-native";
import { View } from "react-native";
import { GlobalStyles } from "../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons"
import LocationItem from "../components/LocationItem";
import { StackScreenProps } from "../types/Screens";


function SearchScreen({navigation,route}:StackScreenProps): JSX.Element {
  return (<View style={styles.containerWrapper}>
    <View style={styles.headerSearchContainer}>
      <View style={[GlobalStyles.propShadow, styles.textInputWrapper]}>
        <View style={styles.iconWrapper}>
          <Icon name="my-location" size={24} color={"#237FEB"} />
        </View>
        <TextInput style={styles.textInputStyle} />
      </View>

      <View style={[GlobalStyles.propShadow, styles.textInputWrapper]}>
        <View style={styles.iconWrapper}>
          <Icon name="location-on" size={24} color={"#EB3223"} />
        </View>
        <TextInput style={styles.textInputStyle} />
      </View>
    </View>


    <View style={styles.savedListContainer}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ flex: 1 }}>Saved Place</Text>
        <Text style={{ flex: 1, textAlign: "right" }}>View All</Text>
      </View>
      <FlatList
        style={styles.listStyle}
        data={[1, 2, 3]}
        renderItem={({ item }) => { return (<LocationItem />) }} />
    </View>

    <View style={styles.savedListContainer}>
      <Text style={{ fontSize: 18 }}>Recent place</Text>

      <FlatList
        style={styles.listStyle}
        data={[1, 2, 3]}
        renderItem={({ item }) => { return (<LocationItem />) }} />
    </View>
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
    backgroundColor: GlobalStyles.mainWhite.color,
    padding: 2,
    flex: 1,
    fontSize: 16,
    minHeight: 36,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.mainWhite.color,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    aspectRatio: 1
  },


  savedListContainer: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: GlobalStyles.mainWhite.color,
    flexDirection: "column",
  },
  listStyle: {
    marginTop: 10,
  }
})

export default SearchScreen;