import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";

import Transactions from "./components/Transactions";
import ShopsMap from "./components/Shops";
import Timeline from "./components/Timeline";
import Spacer from "./components/Spacer";
import BlockchainProvider from "./providers/BlockchainProvider";
import TransactionsProvider from "./providers/TransactionsProvider";
import TimelineProvider from "./providers/TimelineProvider";

const App = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <BlockchainProvider>
          <TransactionsProvider>
            <Transactions />
          </TransactionsProvider>
          <Spacer />
          <ShopsMap />
          <Spacer />
          <TimelineProvider>
            <Timeline />
          </TimelineProvider>
        </BlockchainProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
