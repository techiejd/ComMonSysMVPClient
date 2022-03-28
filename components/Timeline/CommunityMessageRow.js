import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const CommunityMessageRow = ({ timestamp, community, message }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/downArrow.png")}
        style={{ height: 30, width: 30 }}
      />
      <View style={{ flexDirection: "column" }}>
        <View>
          <Text>
            <Text style={{ fontWeight: "700" }}>{community}: </Text>
            {message.slice(0, 140)}
            {message.length > 140 ? "..." : null}
          </Text>
        </View>
        <View>
          <Text>{timestamp}</Text>
        </View>
      </View>
    </View>
  );
};

export default CommunityMessageRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 70,
    paddingHorizontal: 15,
  },
});
