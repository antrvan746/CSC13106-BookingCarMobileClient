import React from "react";
import { PixelRatio, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GlobalStyles } from "../styles/colors";

function PriceTag(): JSX.Element {
  return (<View style={styles.priceTagWrapper}>
    <Icon name="two-wheeler" color={GlobalStyles.green400.color}
      size={PixelRatio.getPixelSizeForLayoutSize(24)} />
    <Text style={{ flex: 1 }}>Motor bike</Text>
    <Text>26.000 vnd</Text>
  </View>)
}

const styles = StyleSheet.create({
  priceTagWrapper: {
    borderRadius: 10,
    padding:5,
    backgroundColor: GlobalStyles.mainWhite.color,
    flexDirection: "row",
    alignItems: "center"
  }
})

export default PriceTag;