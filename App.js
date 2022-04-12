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
import TimelineProvider from "./providers/TimelineProvider";
import VoteStoreProvider from "./providers/VoteStoreProvider";

const App = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <BlockchainProvider>
          <VoteStoreProvider>
            <Transactions />
            <Spacer />
            <ShopsMap />
            <Spacer />
            <TimelineProvider>
              <Timeline />
            </TimelineProvider>
          </VoteStoreProvider>
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
