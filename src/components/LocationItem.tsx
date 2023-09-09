import React from "react";
import { StyleSheet, View, Text, TouchableHighlight, GestureResponderEvent } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { PixelRatio } from "react-native";
import { GlobalStyles } from "../styles/colors";
import { GooglePlaceSuggest } from "../query/GooglePlace";
import { LocationCoordinate } from "../types/LocationItem";

export interface LocationItemProps extends LocationCoordinate {
  clickHandle?: (suggest:LocationCoordinate) => void
}


function LocationItem(props: LocationItemProps): JSX.Element {
  const clickHandle = props.clickHandle;
  const name = props?.name || "Unknown Name" ;
  const address = props?.address || "Unknow Address";
  
  function onClickHandle(e: GestureResponderEvent) {
    if (clickHandle) {
      const {name,id,lat,lon,address} = props;
      clickHandle({name,id,lat,lon,address});
    }
  }

  return (<TouchableHighlight
    onPress={onClickHandle}
    activeOpacity={0.6}
    underlayColor="#DDDDDD" style={[styles.hightLight,GlobalStyles.propShadow]}>
    <View style={styles.containerWrapper}>
      <View style={styles.iconWrapper}>
        <Icon name="map-pin" color={GlobalStyles.mainWhite.color}
          style={styles.icon}
          size={24} />
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.mainText}>{name}</Text>
        <Text numberOfLines={1} style={styles.subText}>{address}</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Icon name="arrow-right" color={GlobalStyles.black500.color}
          size={Math.min(PixelRatio.getPixelSizeForLayoutSize(16), 32)} />
      </View>
    </View>
  </TouchableHighlight>);
}

const styles = StyleSheet.create({
  hightLight:{
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    minHeight: 10,
    backgroundColor: GlobalStyles.mainWhite.color,

  },

  containerWrapper: {
    flexDirection: "row",    
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