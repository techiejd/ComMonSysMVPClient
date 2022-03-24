import React from 'react';
import { SafeAreaView, Platform, StatusBar } from 'react-native';

import Transactions from './components/transactions/transactions';

export default function App(){
  return(<>
  <SafeAreaView style={
  {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }}>
    <Transactions/>
  </SafeAreaView>
  </>)
}