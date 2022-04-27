import React from "react";
import { SSRProvider } from "@react-aria/ssr";
import { NativeBaseProvider, Box, ScrollView } from "native-base";

import Transactions from "./components/Transactions";
import ShopsMap from "./components/Shops";
import Timeline from "./components/Timeline";
import Spacer from "./components/Spacer";
import BlockchainProvider from "./providers/BlockchainProvider";
import TimelineProvider from "./providers/TimelineProvider";
import VoteStoreProvider from "./providers/VoteStoreProvider";

const App = () => {
  return (
    <SSRProvider>
      <NativeBaseProvider>
        <Box safeArea>
          <ScrollView
            backgroundColor="#D8D8D8"
            contentContainerStyle={{
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
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
        </Box>
      </NativeBaseProvider>
    </SSRProvider>
  );
};

export default App;
