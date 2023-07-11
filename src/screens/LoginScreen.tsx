import React, { useState, useEffect } from 'react';
import { Button, TextInput } from 'react-native';
import auth, { FirebaseAuthTypes as FBAuth } from '@react-native-firebase/auth';


function LoginScreen() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<FBAuth.ConfirmationResult | null>(null);

  // verification code (OTP - One-Time-Passcode)
  // Handle login
  const onAuthStateChanged:FBAuth.AuthListenerCallback =  function (user) {
    console.log(user ? `Login successfully ${user.displayName}` : "Log out success fully");
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber:string) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode(text:string) {
    if(confirm == null){
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

export default LoginScreen;