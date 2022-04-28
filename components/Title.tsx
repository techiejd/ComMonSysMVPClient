import React from "react";
import { StyleSheet } from "react-native";
import { Box, Text } from "native-base";
import Spacer from "./Spacer";

const Title = () => {
  return (
    <>
      <Spacer />
      <Box flexDirection="row" justifyContent="center" style={styles.size}>
        <Text fontWeight={700} color={"coolGray.50"} style={styles.title}>
          Poblado
        </Text>
        <Text fontWeight={400} color={"emerald.400"} style={styles.title}>
          Coin
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
  title: {
    fontSize: 36,
    lineHeight: 60,
    fontStyle: "normal",
  },
});
