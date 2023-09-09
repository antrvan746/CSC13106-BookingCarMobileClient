import React from "react";
import { PixelRatio, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { GlobalStyles } from "../../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

interface BookVehicleProps {
  BookBtnPressCallBack: () => void,
  price:number
}

function PriceTag({price}:{price:string}): JSX.Element {
  return (<View style={styles.priceTagWrapper}>
    <Icon name="two-wheeler" color={GlobalStyles.green400.color}
      size={PixelRatio.getPixelSizeForLayoutSize(24)} />
    <Text style={{ flex: 1 }}>Motor bike</Text>
    <Text>{price}</Text>
  </View>)
}

function BookVehicle({ BookBtnPressCallBack,price }: BookVehicleProps): JSX.Element {
  const numberFormat = new Intl.NumberFormat("en-US",{style: "currency",currency: "VND"});

  const BookClickHandler = () => {
    BookBtnPressCallBack();
  }
  return (<View>
    <PriceTag price={numberFormat.format(price*1000)} />
    <TouchableHighlight style={[styles.bookBtnWrapper, GlobalStyles.propShadow]}
      activeOpacity={0.6} underlayColor="#0d0d0d"
      onPress={BookClickHandler} >
      <View style={styles.bookBtn}>
        <Text style={styles.bookTxt}>Book</Text>
      </View>
    </TouchableHighlight>
  </View>)
}

const styles = StyleSheet.create({
  bookBtnWrapper: {
    borderRadius: 40,
    marginTop: 5
  },
  bookBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.green500.color,
    paddingVertical: 10,
    borderRadius: 40,
  },
  bookTxt: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.mainWhite.color
  },
  priceTagWrapper: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: GlobalStyles.mainWhite.color,
    flexDirection: "row",
    alignItems: "center"
  }
});

export default BookVehicle