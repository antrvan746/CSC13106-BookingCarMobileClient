import React, { useState, useEffect } from 'react';
import { Button, TextInput } from 'react-native';
import auth, { FirebaseAuthTypes as FBAuth } from '@react-native-firebase/auth';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectLoginState, setLoginState } from '../redux/LoginState';
import { StackScreenProps } from '../types/Screens';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


function LoginScreen({ navigation, route }: StackScreenProps) {
  const loginState = useAppSelector(selectLoginState);
  const dispatch = useAppDispatch();

  if (!loginState.user) {
    navigation.replace("Main");
    return (null);
  }

  // If null, no SMS has been sent

  const [confirm, setConfirm] = useState<FBAuth.ConfirmationResult | null>(null);
  // verification code (OTP - One-Time-Passcode)
  // Handle login

  const onAuthStateChanged: FBAuth.AuthListenerCallback = function (user) {
    console.log(user ? `Login successfully ${user.displayName}` : "Log out success fully");
    dispatch(setLoginState({ user }));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode(text: string) {
    if (confirm == null) {
      return;
    }

    try {
      await confirm.confirm(text);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+1 123-456-7890')}
      />
    );
  }

  return (
    <>
      <Button title="Confirm Code" onPress={() => confirmCode("300373")} />
    </>
  );
}


function EmailLogin({ navigation, route }: StackScreenProps) {
  GoogleSignin.configure({
    webClientId: '352689544618-2pci7cq3oava74cttlb8vrdfp2gdn1ql.apps.googleusercontent.com',
  });

  const loginState = useAppSelector(selectLoginState);
  const dispatch = useAppDispatch();

  const onAuthStateChange: FBAuth.AuthListenerCallback = function (userData) {
    console.log(userData);
    dispatch(setLoginState({
      user: !userData ? null : {
        email: userData.email,
        emailVerified: userData.emailVerified,
        isAnonymous: userData.isAnonymous,
        phoneNumber: userData.phoneNumber,
        photoURL: userData.photoURL,
        providerId: userData.providerId,
        uid: userData.uid,
        displayName: userData.displayName
      }
    }));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber; // unsubscribe on unmount
  }, []);




  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    //await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token

    if(!!loginState.user ){
      console.log("Login out")
      const result = await GoogleSignin.signOut();
      dispatch(setLoginState({user:null}));
      return;
    }

    try{
      const result = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
      return auth().signInWithCredential(googleCredential)
    }catch(e){
      console.log(JSON.stringify(e));
    }

    // console.log(result.user);

    // // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    // // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
  }

  return (
    <Button
      title={ !!loginState.user ? "Google Sign-Out" : "Google Sign-In"}
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />
  )
}


export default EmailLogin;