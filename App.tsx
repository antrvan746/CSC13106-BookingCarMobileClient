/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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
import { useAppDispatch } from './src/redux/hooks';
import { updateDebugMenu } from './src/redux/DebugMenu';

interface WrapperProps extends StackScreenProps {
  screen: JSX.Element
}

const NavStack = createNativeStackNavigator<RootStackParamList>();


function MyScreenWrapper({ screen,route,navigation }: WrapperProps) {
  const dispath = useAppDispatch();

  const onDebugMenuPress = () => {
    dispath(updateDebugMenu({
      isOpen: true
    }))
  }

  return (<SafeAreaView style={styles.sampleContainer}>
    <DebugModal route={route} navigation={navigation} />
    <Pressable style={styles.debugMenuBtnWrapper}
      onPress={onDebugMenuPress}>
      <Icon name='menu' size={32} color={"black"} />
    </Pressable>
    {screen}
  </SafeAreaView>)
}

function App(): JSX.Element {

  return (
    <Provider store={ReduxStore}>
      <NavigationContainer>
        <NavStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName='Main'>

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
