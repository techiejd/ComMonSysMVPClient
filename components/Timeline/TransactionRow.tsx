import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TransactionTimelineDatum } from "../../providers/TimelineProvider";

const TransactionRow: React.FC<{ transaction: TransactionTimelineDatum }> = ({
  transaction: { transactionType, timestamp, address, amount, ticker },
}) => {
  const isSendTransaction = transactionType === "Send";
  const addressDigits = 5;

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          source={require("../../assets/downArrow.png")}
          style={[
            { height: 30, width: 30 },
            isSendTransaction && { transform: [{ rotate: "180deg" }] },
          ]}
        />
        <View style={styles.transactionInformation}>
          <View style={styles.sendReceiveRow}>
            <Text>
              {transactionType}: {address.slice(0, addressDigits + 2)}...
              {address.slice(-addressDigits)}
            </Text>
          </View>
          <Text>{timestamp}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text>
          {isSendTransaction ? "-" : "+"}
          {amount} {ticker}
        </Text>
      </View>
    </View>
  );
};

export default TransactionRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 70,
    paddingHorizontal: 15,
  },
  leftContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
  },
  rightContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  transactionInformation: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 15,
  },
  sendReceiveRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
