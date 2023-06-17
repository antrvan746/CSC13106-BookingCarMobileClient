import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { PixelRatio } from "react-native";
import { GlobalStyles } from "../styles/colors";


function LocationItem(): JSX.Element {

  return (<View style={[styles.containerWrapper, GlobalStyles.propShadow]}>
    <View style={styles.iconWrapper}>
      <Icon name="map-pin" color={GlobalStyles.mainWhite.color}
        style={styles.icon}
        size={24} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.mainText}>Local Pool</Text>
      <Text style={styles.subText}>123 Hai Ba Trung, P. Vo Thi Sau</Text>
    </View>
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Icon name="arrow-right" color={GlobalStyles.black500.color}
        size={Math.min(PixelRatio.getPixelSizeForLayoutSize(16), 32)} />
    </View>
  </View>);
}

const styles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: GlobalStyles.mainWhite.color,
    minHeight: 10,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    borderRadius: 16,
    backgroundColor: GlobalStyles.green500.color,
    padding: 4
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "column"
  },
  mainText: {
    color: GlobalStyles.black500.color,
    fontWeight: "bold",
    fontSize: 18
  },
  subText: {
    color: GlobalStyles.black500.color,
    fontSize: 16
  },
})

export default LocationItem;