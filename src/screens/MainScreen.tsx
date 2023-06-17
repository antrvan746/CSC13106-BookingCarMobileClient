import React from "react";
import { FlatList } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";
import LocationItem from "../components/LocationItem";
import { Text } from "react-native";
import { GlobalStyles } from "../styles/colors";

function MainScreen(): JSX.Element {

  return (<View style={styles.screenWrapper}>
    <View style={styles.headerWrapper}></View>
    <View style={styles.mainWrapper}>
      <View
        onTouchStart={(event)=>{}}
        style={styles.searchTxtInputWapper}>
        <TextInput style={styles.searchTxtInput} />
      </View>

      <FlatList
        style={styles.listStyle}
        data={["1", "2", "3"]}
        renderItem={({ item }) => { return <LocationItem /> }} />
    </View>
  </View>)
}

const styles = StyleSheet.create({
  screenWrapper: {
    flexDirection: "column",
    backgroundColor: "white",
    flex: 1
  },
  headerWrapper: {
    flex: 1,
    backgroundColor: GlobalStyles.green400.color
  },
  mainWrapper: {
    flex: 3,
    backgroundColor: "read",
    paddingTop: 25
  },
  searchTxtInputWapper: {
    height: 50,
    backgroundColor: "yellow",
    position: "absolute",
    top: -25,
    left: 25,
    right: 25,
    bottom: 0
  },
  searchTxtInput: {
    flex: 1,
  },

  listStyle: {
    marginTop: 10,
  }
})

export default MainScreen;