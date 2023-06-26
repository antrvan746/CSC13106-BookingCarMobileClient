import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { GlobalStyles } from "../../styles/colors"
import { useAppSelector } from "../../redux/hooks"
import { selectAppState } from "../../redux/AppState"

function WaitingDriver() {
  return (
    <View style={styles.statusTxtWrapper}>
      <Text style={styles.mainTxt}>Tài xế bạn đang tới</Text>
      <Text style={[styles.mainTxt, { textAlign: "right" }]}>15 phút</Text>
      <Text style={styles.descTxt}>
        123 Hai Bà Trưng, P.Vo Thi Sau, Q.3,Tp HCM
      </Text>
    </View>);
}

function FindingDriver() {
  return (<View style={[styles.statusTxtWrapper, { paddingVertical: 15 }]}>
    <Text style={[styles.mainTxt, { maxWidth: "100%", fontSize: 24,textAlign:"center" }]} >
      Finding a driver...
    </Text>
  </View>)
}

function GoingWithDriver() {
  return (<View style={styles.statusTxtWrapper}>
    <Text style={[styles.mainTxt, { maxWidth: "100%" }]} >Currently traveling</Text>
  </View>)
}

function DriverInfo() {
  return (<View style={styles.infoWrapper}>
    <View style={styles.driverInfoWrapper}>
      <View style={styles.iconWrapper}>
        <Icon name="person" size={36} style={styles.icon}
          color={GlobalStyles.mainWhite.color} />
      </View>
      <Text style={{ marginLeft: 10 }}>
        Nguyen Xuan Hoang Lam
      </Text>
    </View>

    <View style={styles.vehicleInfoWrapper}>
      <Text style={{ textAlign: "center" }}>ACB-7746-789</Text>
      <Text>Honda wave</Text>
    </View>
  </View>)
}

function RideInfo(): JSX.Element {
  const appState = useAppSelector(selectAppState);

  return (<View>

    {appState.state == "Finding" ? <FindingDriver /> : null}
    {appState.state == "Waiting" ? <WaitingDriver /> : null}
    {appState.state == "Going" ? <GoingWithDriver /> : null}

    {appState.state != "Finding" ? <DriverInfo /> : null}

  </View>)
}

const styles = StyleSheet.create({
  statusTxtWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: GlobalStyles.mainWhite.color,
    borderRadius: 15
  },
  mainTxt: {
    fontWeight: "bold",
    minWidth: "40%",
    flex: 1,
  },
  descTxt: {
    minWidth: "85%"
  },

  infoWrapper: {
    backgroundColor: GlobalStyles.mainWhite.color,
    marginTop: 16,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 10
  },
  driverInfoWrapper: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrapper: {
    justifyContent: "center",
    alignContent: "center",
  },
  icon: {
    backgroundColor: GlobalStyles.green500.color,
    padding: 4,
    borderRadius: 22
  },
  vehicleInfoWrapper: {
    alignItems: "center",
    flex: 1
  }
})

export default RideInfo;