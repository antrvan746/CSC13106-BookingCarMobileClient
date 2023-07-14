import React from 'react';
import {  StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { StackScreenProps } from '../types/Screens';
//import { GlobalStyles } from '../styles/colors';
import Icon from "react-native-vector-icons/MaterialIcons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackParam, LoginStackSreenProps } from '../types/LoginScreens';
import PhoneLogin from './PhoneLoginScreen';
import PhoneLoginOTP from './PhoneOTPScreen';

const NavStack = createNativeStackNavigator<LoginStackParam>();

function LoginSelectScreen({ navigation, route }: LoginStackSreenProps) {
  function selectLoginWithPhone() {
    navigation.navigate("Phone");
  }


  return (<View style={styles.screenContainer}>
    <View style={[styles.loginComponentContainer]}>
      <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ borderRadius: 12 }}
        onPress={() => console.log("Pressed")} >
        <View style={styles.selectLoginWrapper}>
          <Icon name='mail' size={16} />
          <Text style={styles.selectLoginText}>Login with Google</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ borderRadius: 12, marginTop: 12 }}
        onPress={selectLoginWithPhone} >
        <View style={styles.selectLoginWrapper}>
          <Icon name='call' size={16} />
          <Text style={styles.selectLoginText}>Login with Phone</Text>
        </View>
      </TouchableHighlight>

    </View>
  </View>)
}

function LoginScreen({ navigation, route }: StackScreenProps) {
  function onSuccessLogin(){
    console.log("Navigate to desire screen");
    //navigation.replace("Main");
  }

  return (
    <NavStack.Navigator initialRouteName='Select'>
      <NavStack.Screen options={{ headerShown: false }} name="Select">
        {
          (props) => <LoginSelectScreen {...props} />
        }
      </NavStack.Screen>

      <NavStack.Screen name='Phone'>
        {
          (props) => <PhoneLogin {...props} />
        }
      </NavStack.Screen>
      <NavStack.Screen name="PhoneVerify">
        {
          (props) => <PhoneLoginOTP {...props} onSuccess={onSuccessLogin} />
        }
      </NavStack.Screen>
    </NavStack.Navigator>)
}


const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor:"#5AB38B",// GlobalStyles.green300.color
  },
  loginComponentContainer: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },
  selectLoginWrapper: {
    backgroundColor: "#F9F9F9",// GlobalStyles.mainWhite.color,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  selectLoginText: {
    textAlign: "center",
    color: "#2F2F2C",// GlobalStyles.black500.color,
    fontSize: 16,
    marginLeft: 12
  },

});

export default LoginScreen;