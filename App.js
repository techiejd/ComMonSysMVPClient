import React, { Component } from "react";
import { SafeAreaView, Platform, StatusBar } from "react-native";

import Transactions from "./components/Transactions";
import ShopsMap from "./components/Shops";

export default class App extends Component {
  render() {
    /* <ShopsMap/>*/
    return (
      <>
        <SafeAreaView
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <Transactions />
          <ShopsMap />
          <Timeline />
        </SafeAreaView>
      </>
    );
  }
}
