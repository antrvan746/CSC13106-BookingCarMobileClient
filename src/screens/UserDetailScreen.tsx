import React, { useRef } from "react";
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { LoginStackParam } from '../types/LoginScreens';
import { GlobalStyles } from "../styles/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserDetailInfo, useAddUserDetailMutation } from "../query/UserData";
import { useAppSelector } from "../redux/hooks";
import { selectLoginState, setLoginState } from "../redux/LoginState";

interface Props extends NativeStackScreenProps<LoginStackParam, "Detail">{
  onSuccess:(info:UserDetailInfo)=>void
}

function UserDetailScreen({ navigation, route,onSuccess }: Props) {
  const userData = useRef({
    email: "",
    name: ""
  });
  const [userDetailAddTrigger] = useAddUserDetailMutation();


  const handleUpdateInfo = async function () {
    if (userData.current.name.length <= 0) {
      return;
    }

    try {
      const res = await userDetailAddTrigger({
        ...userData.current,
        email: undefined,
        phone: route.params.user.phone
      }).unwrap();

      onSuccess(res);

    } catch (e) {
      console.log(e);
    }

    return null;
  }

  return (<View style={styles.container}>
    <Text style={styles.inputLabel}>User name: *</Text>
    <TextInput style={styles.inputTxt}
      onChangeText={(v) => userData.current.name = v}
      placeholder="Required" />

    <Text style={styles.inputLabel}>Email: </Text>
    <TextInput style={styles.inputTxt}
      onChangeText={(v) => userData.current.email = v}
      placeholder="Optional" />

    <Text style={styles.inputLabel}>Phone: </Text>
    <TextInput
      editable={false}
      style={styles.inputTxt}
      placeholder={route.params.user?.phone} />

    <TouchableHighlight
      onPress={handleUpdateInfo}
      style={styles.bookBtnWrapper}
      activeOpacity={0.6} underlayColor="#0d0d0d">
      <View style={styles.bookBtn}>
        <Text style={styles.bookTxt}>Update infomation</Text>
      </View>
    </TouchableHighlight>
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  inputLabel: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyles.black500.color
  },
  inputTxt: {
    fontSize: 16,
    padding: 0,
    borderBottomWidth: 1,
    borderColor: GlobalStyles.black400.color
  },

  bookBtnWrapper: {
    position: "absolute",
    borderRadius: 40,
    marginTop: 5,
    bottom: 12,
    left: 12,
    right: 12,
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


export default UserDetailScreen;

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
