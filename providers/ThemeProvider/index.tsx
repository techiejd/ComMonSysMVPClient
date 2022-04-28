import React from "react";
import { SSRProvider } from "@react-aria/ssr";
import { NativeBaseProvider } from "native-base";
import Theme from "./Theme";

import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_300Light_Italic,
  Ubuntu_400Regular,
  Ubuntu_400Regular_Italic,
  Ubuntu_500Medium,
  Ubuntu_500Medium_Italic,
  Ubuntu_700Bold,
  Ubuntu_700Bold_Italic,
} from "@expo-google-fonts/ubuntu";

function useThemeLoaded() {
  let [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
  });
  return fontsLoaded;
}

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    // SSRProvider is used by NativeBaseProvider.
    <SSRProvider>
      <NativeBaseProvider theme={Theme}>{children}</NativeBaseProvider>
    </SSRProvider>
  );
};

export default ThemeProvider;
export { useThemeLoaded };
