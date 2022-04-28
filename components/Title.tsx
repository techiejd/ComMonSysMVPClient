import React from "react";
import { StyleSheet } from "react-native";
import { Box, Text } from "native-base";
import Spacer from "./Spacer";

const Title = () => {
  return (
    <>
      <Spacer />
      <Box alignItems="center" style={styles.size}>
        <Text style={styles.startText}>
          Poblado<Text style={styles.endText}>Coin</Text>
        </Text>
      </Box>
    </>
  );
};

export default Title;

const styles = StyleSheet.create({
  size: {
    width: 215,
    height: 54,
  },
  startText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 36,
    color: "#F9FAFB",
    lineHeight: 60,
  },
  endText: {
    fontWeight: "400",
    color: "#34D399",
  },
});
