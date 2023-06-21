import React from "react";
import PriceTag from "../PriceTag";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { GlobalStyles } from "../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAppState, updateAppState } from "../../redux/AppState";

function BookVehicle(): JSX.Element {

  const appState = useAppSelector(selectAppState);
  const dispatch = useAppDispatch();

  const BookClickHandler = () => {
    dispatch(updateAppState({
      state: appState.state == "Finding" ? "Idle" : "Finding"
    }));


  }

  console.log(`App state ${appState.state}`);

  return (<View>
    <PriceTag />
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
  }
});

export default BookVehicle