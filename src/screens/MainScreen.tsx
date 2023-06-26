import React from "react";
import { FlatList } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";
import LocationItem from "../components/LocationItem";
import { Text } from "react-native";
import { GlobalStyles } from "../styles/colors";
import { StackScreenProps } from "../types/Screens";
import Icon from "react-native-vector-icons/MaterialIcons"
import { TouchableHighlight } from "react-native";
import { useAppDispatch } from "../redux/hooks";
import { updateAppState } from "../redux/AppState";

function MainScreen({ navigation, route }: StackScreenProps): JSX.Element {
  
  const dispatch = useAppDispatch();

  const searchLoactionPress = () =>{
    dispatch(updateAppState({
      state: "Search",
    }));
    navigation.replace("Search");
  }

  return (<View style={styles.screenWrapper}>
    <View style={styles.headerWrapper}></View>


    <View style={styles.mainWrapper}>
      <TouchableHighlight activeOpacity={1} underlayColor="#DDDDDD" style={styles.searchTxtInputWapper}
        onPress={searchLoactionPress}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="location-on" color={"#EB3223"} size={24} />
          <Text style={{ fontSize: 18, fontWeight: "bold", color: GlobalStyles.black500.color }}>
            Where to go ?
          </Text>
        </View>
      </TouchableHighlight>

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
    paddingTop: 25
  },


  searchTxtInputWapper: {
    flexDirection: "row",
    height: 50,
    backgroundColor: GlobalStyles.mainWhite.color,
    position: "absolute",
    top: -25,
    left: 25,
    right: 25,
    bottom: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",

  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center"
  },

  listStyle: {
    marginTop: 10,
  }
})

export default MainScreen;