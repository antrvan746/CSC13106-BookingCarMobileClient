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

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): JSX.Element {
  return (<SafeAreaView style={styles.sampleContainer}>
    <Text style={styles.sampleTitle}>Ride Hailing Mobile Client</Text>
  </SafeAreaView>)
}

const styles = StyleSheet.create({
  sampleTitle: {
    fontSize: 26,
    backgroundColor: "beige",
    textAlign:"center",
    fontWeight: "bold"
  },
  sampleContainer: {
    flex:1,
    alignContent: "center",
    justifyContent: "center"
  }
});

export default App;
