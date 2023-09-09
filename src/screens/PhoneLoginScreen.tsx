import React, { useState, useRef, createRef } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { LoginStackSreenProps } from '../types/LoginScreens';



function PhoneLogin({ navigation, route }: LoginStackSreenProps) {

  const [validNumber, setValidNumber] = useState<boolean>(false);

  const phoneRef = createRef<PhoneInput>();
  const formatedPhone = useRef<string>("");

  function onPhoneChangeText(phone: string) {
    if(validNumber != phoneRef.current?.isValidNumber(phone)){
      setValidNumber(!validNumber)
    }
  }
  
  function onFormatedPhoneChange(phone:string){
    formatedPhone.current = phone;

    //Exception testing number
    if(phone.length === "+11234567890".length){
      setValidNumber(true);
    }
  }

  function onConfirmPhoneNumber(){
    navigation.navigate("PhoneVerify",{phone:formatedPhone.current});
  }

  return (<View style={styles.screenContainer}>
    <View style={styles.phoneStyle}>
      <Text style={{ alignSelf: "flex-start" }}>Phone number</Text>
      <PhoneInput
        ref={phoneRef}
        onChangeText={onPhoneChangeText}
        onChangeFormattedText={onFormatedPhoneChange}
        flagButtonStyle={{ backgroundColor: "transparent", ...styles.bottomBlackBorder }}
        textInputStyle={{ backgroundColor: "transparent", padding: 0 }}
        textContainerStyle={{ backgroundColor: "transparent", padding: 0, ...styles.bottomBlackBorder }}
        containerStyle={styles.phoneInputContainer} defaultCode='VN' />
    </View>


    <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD"
      disabled={!validNumber}
      style={[styles.nextButtonWrapper, { opacity: validNumber ? 1 : 0.5 }]}
      onPress={onConfirmPhoneNumber} >
      <View style={styles.nextButton}>
        <Text style={styles.buttonText}> NEXT </Text>
      </View>
    </TouchableHighlight>
  </View>)
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: "relative",
  },
  nextButtonWrapper: {
    backgroundColor: "#13B45D", //GlobalStyles.green500.color,
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    borderRadius: 24
  },
  nextButton: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center"
  },

  phoneStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 42,
    paddingHorizontal: 12,
  },
  phoneInputContainer: {
    width: "100%",
    backgroundColor: "transparent",
    padding: 0
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  bottomBlackBorder: {
    borderColor: "transparent",
    borderBottomColor: "black",
    borderWidth: 1
  }
})

export default PhoneLogin;