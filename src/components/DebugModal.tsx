import React from "react";
import { Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectDebugState, updateDebugMenu } from "../redux/DebugMenu";
import { AppStateName, AppStateNameValues, selectAppState, updateAppState } from "../redux/AppState";
import { GlobalStyles } from "../styles/colors";
import { StackScreenProps } from "../types/Screens";

function DebugModal({ navigation, route }: StackScreenProps): JSX.Element {
  const appState = useAppSelector(selectAppState);
  const debugMenuState = useAppSelector(selectDebugState);

  const dispatch = useAppDispatch();

  const onRequestClose = () => {
    dispatch(updateDebugMenu({
      isOpen: false
    }))
  }

  const stateIsChangable = (newState: AppStateName): boolean => {
    if(newState == "Login"){
      return true;
    }

    if (appState.state != "Idle" && newState == "Idle") {
      return true;
    }

    switch (appState.state) {
      case "Idle":
        return newState == "Search";
      case "Search":
        return newState == "Book";
      case "Book":
        return newState == "Finding";
      case "Finding":
        return newState == "Waiting";
      case "Waiting":
        return newState == "Going" || newState == "Finding";
      case "Going":
        return newState == "Idle" || newState == "Finding";
      default:
        return false;
    }

  }

  const onChangeStatePress = (state: AppStateName) => {
    if(state == "Login" && route.name != "Login"){
      navigation.replace("Login");
    }

    if (state == "Idle" && route.name != "Main") {
      navigation.replace("Main");
    }
    if (state == "Search" && route.name != "Search") {
      navigation.replace("Search")
    }
    if (state != "Idle" && state != "Search" && route.name != "Ride") {
      navigation.replace("Ride");
    }
    dispatch(updateAppState({ state }));
  }



  return (
    <Modal transparent={true} visible={debugMenuState.isOpen} style={styles.modalStyle}
      onRequestClose={onRequestClose}>
      <View style={styles.containerWrapper} onTouchStart={onRequestClose}>

        <View style={[styles.wrapper, GlobalStyles.propShadow]}
          onTouchStart={(e) => { e.stopPropagation() }}>
          <Text style={styles.stateTxt}>{`App state: ${appState.state}`}</Text>

          {
            AppStateNameValues.map((state) =>
              <TouchableHighlight activeOpacity={1} underlayColor="#DDDDDD" style={styles.changeStateBtn}
                key={state}
                disabled={!stateIsChangable(state)}
                onPress={() => { onChangeStatePress(state) }}>
                <Text style={stateIsChangable(state) ? styles.btnTxt : styles.btnTxtOff}>
                  {`Set state ${state}`}
                </Text>
              </TouchableHighlight>)
          }

        </View>

      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  stateTxt: {
    fontSize: 24,
    color: GlobalStyles.black500.color,
    fontWeight: "bold"
  },
  containerWrapper: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  wrapper: {
    minWidth: 300,
    minHeight: 300,
    backgroundColor: GlobalStyles.mainWhite.color,
    alignItems: "center",
    opacity: 0.95,
    borderRadius: 10
  },

  changeStateBtn: {
    minWidth: "80%",
    padding: 10,
    alignItems: "center",
    borderStyle: "solid",
    borderColor: GlobalStyles.black200.color,
    borderWidth: 1
  },
  btnTxt: {
    fontSize: 24,
    color: GlobalStyles.searchBlue.color,
    fontWeight: "bold",
  },
  btnTxtOff: {
    fontSize: 24,
    color: GlobalStyles.black500.color,
    fontWeight: "bold"
  }
})

export default DebugModal;