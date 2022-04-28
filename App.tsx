import React from "react";
import { Box, ScrollView } from "native-base";

import Transactions from "./components/Transactions";
import ShopsMap from "./components/Shops";
import Timeline from "./components/Timeline";
import Spacer from "./components/Spacer";
import Title from "./components/Title";
import BlockchainProvider from "./providers/BlockchainProvider";
import TimelineProvider from "./providers/TimelineProvider";
import VoteStoreProvider from "./providers/VoteStoreProvider";
import ThemeProvider, { useThemeLoaded } from "./providers/ThemeProvider";
import AppLoading from "expo-app-loading";

const App = () => {
  let themeLoaded = useThemeLoaded();

  if (!themeLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider>
      <Box safeArea>
        <ScrollView>
          <BlockchainProvider>
            <VoteStoreProvider>
              <Title />
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
    </ThemeProvider>
  );
};

export default App;
