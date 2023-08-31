/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { Pressable, SafeAreaView, StyleSheet, View, } from 'react-native';

import MainScreen from './src/screens/MainScreen';
import SearchScreen from './src/screens/SearchScreen';
import RideScreen from './src/screens/RideScreen';
import { Provider } from 'react-redux';

import Icon from "react-native-vector-icons/MaterialIcons"
import ReduxStore from './src/redux/store';
import { GlobalStyles } from './src/styles/colors';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, StackScreenProps } from './src/types/Screens';
import DebugModal from './src/components/DebugModal';
import { useAppDispatch, useAppSelector } from './src/redux/hooks';
import { updateDebugMenu } from './src/redux/DebugMenu';

import { enableLatestRenderer } from 'react-native-maps';
import { selectLoginState } from './src/redux/LoginState';
import LoginScreen from './src/screens/LoginSelectScreen';
import { PermissionsAndroid } from 'react-native';
interface WrapperProps extends StackScreenProps {
  screen: JSX.Element
}

const NavStack = createNativeStackNavigator<RootStackParamList>();

async function requestLocationPermission():Promise<boolean> 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title:"Request location",
        message:"We need your location",
        buttonPositive:"Agree",
        buttonNegative:"Disagree"
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
      return true;
    } else {
      console.log("location permission denied")
      return false;
    }
  } catch (err) {
    console.warn(err)
  }
  return false;
}

function MyScreenWrapper({ screen, route, navigation }: WrapperProps) {
  const loginState = useAppSelector(selectLoginState);

  const dispath = useAppDispatch();

  const onDebugMenuPress = () => {
    dispath(updateDebugMenu({ isOpen: true }));
  }

  useEffect(()=>{
    requestLocationPermission();
  },[])

  return (<SafeAreaView style={styles.sampleContainer}>
    <DebugModal route={route} navigation={navigation} />
    <Pressable style={styles.debugMenuBtnWrapper}
      onPress={onDebugMenuPress}>
      <Icon name='menu' size={32} color={"black"} />
    </Pressable>
    {/* {
      !loginState.user ? <LoginScreen {...{ navigation, route }} /> : screen
    } */}
    {screen}

    
  </SafeAreaView>)
}

function App(): JSX.Element {
  enableLatestRenderer();
  return (
    <Provider store={ReduxStore}>
      <NavigationContainer>
        <NavStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName='Login'>

          <NavStack.Screen name="Main">
            {
              (props) => <MyScreenWrapper {...props} screen={<MainScreen {...props} />} />
            }
          </NavStack.Screen>

          <NavStack.Screen name="Search">
            {
              (props) => <MyScreenWrapper {...props} screen={<SearchScreen {...props} />} />
            }
          </NavStack.Screen>

          <NavStack.Screen name="Ride">
            {
              (props) => <MyScreenWrapper {...props} screen={<RideScreen {...props} />} />
            }
          </NavStack.Screen>

          <NavStack.Screen name="Login">
            {
              (props) => <MyScreenWrapper {...props} screen={<LoginScreen {...props} />} />
            }
          </NavStack.Screen>

        </NavStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  sampleTitle: {
    fontSize: 26,
    backgroundColor: "beige",
    textAlign: "center",
    fontWeight: "bold"
  },
  sampleContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  debugMenuBtnWrapper: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: GlobalStyles.mainWhite.color
  }
});

export default App;
