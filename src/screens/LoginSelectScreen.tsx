import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { StackScreenProps } from '../types/Screens';
import { GlobalStyles } from '../styles/colors';
import Icon from "react-native-vector-icons/MaterialIcons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackParam, LoginStackSreenProps } from '../types/LoginScreens';
import PhoneLogin from './PhoneLoginScreen';
import PhoneLoginOTP from './PhoneOTPScreen';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectLoginState, setLoginState } from '../redux/LoginState';
import auth, { FirebaseAuthTypes as FBAuth } from '@react-native-firebase/auth';
import database from "@react-native-firebase/database"
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const NavStack = createNativeStackNavigator<LoginStackParam>();

function GoogleLoginButton() {
  GoogleSignin.configure({
    webClientId: '352689544618-2pci7cq3oava74cttlb8vrdfp2gdn1ql.apps.googleusercontent.com',
  });

  const loginState = useAppSelector(selectLoginState);
  const dispatch = useAppDispatch();
  const onAuthStateChange: FBAuth.AuthListenerCallback = async function (userData) {
    //console.log(userData);
    if (!userData) {
      dispatch(setLoginState({ user: null }));
      return;
    }
    const { email, phoneNumber, photoURL, providerId, uid, displayName } = userData;
    const locationIQKey = (await database().ref("/LocationIQ_KEY").once("value")).val();
    if (locationIQKey) {
      console.log("Login with locationIQ key", locationIQKey);
      /*
      dispatch(setLoginState({
        user: { email, phoneNumber, photoURL, providerId, uid, displayName, locationIQKey }
      }));
      */
    } else {
      console.log("Cant get location IQ key", locationIQKey);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function GoogleLoginPress() {
    const result = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    return auth().signInWithCredential(googleCredential);
  }

  return (<TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ borderRadius: 12 }}
    onPress={GoogleLoginPress} >
    <View style={styles.selectLoginWrapper}>
      <Icon name='mail' size={16} />
      <Text style={styles.selectLoginText}>Login with Google</Text>
    </View>
  </TouchableHighlight>)
}

function LoginSelectScreen({ navigation, route }: LoginStackSreenProps) {
  function selectLoginWithPhone() {
    navigation.navigate("Phone");
  }



  return (<View style={styles.screenContainer}>
    <View style={[styles.loginComponentContainer]}>

      <GoogleLoginButton />

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
  function onSuccessLogin() {
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
    backgroundColor: GlobalStyles.green300.color
  },
  loginComponentContainer: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },
  selectLoginWrapper: {
    backgroundColor: GlobalStyles.mainWhite.color,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  selectLoginText: {
    textAlign: "center",
    color: GlobalStyles.black500.color,
    fontSize: 16,
    marginLeft: 12
  },

});

export default LoginScreen;