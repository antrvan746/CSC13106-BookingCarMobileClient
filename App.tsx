/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MainScreen from './src/screens/MainScreen';
import SearchScreen from './src/screens/SearchScreen';
import RideScreen from './src/screens/RideScreen';
import LocationItem from './src/components/LocationItem';
import { Provider } from 'react-redux';
import ReduxStore from './src/redux/store';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): JSX.Element {


  return (
    <Provider store={ReduxStore}>
      <SafeAreaView style={styles.sampleContainer}>
        <RideScreen />
      </SafeAreaView>
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
  }
});

export default App;
