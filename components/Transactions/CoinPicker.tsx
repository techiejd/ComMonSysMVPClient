import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
   Box,
   Text, 
   Pressable, 
   } from "native-base";
import Spacer from "./../Spacer";
import {
  TransactionsContext,
  ITransactionsContext,
} from "../../providers/TransactionsProvider";


const CoinPicker = () => {
  const { mode, balances } = useContext(
    TransactionsContext
  ) as ITransactionsContext;

  const composeBalance = (balance: string | undefined) => {
    if (mode == "displayingQR") {
      return "❓";
    }
    if (mode == "loading") {
      return "✋⏳";
    }
    return balance;
  };

  return (
    <>
      <Spacer />
      <Box alignItems="center" style={styles.Box}>
        <Text style={styles.Text}>
          Poblado<Text style={styles.endText}>Coin</Text>
        </Text>
      </Box>
      <Pressable onPress={() => console.log("yoooo")}>
        <Text style={styles.amount}>
          ${composeBalance(balances.posted?.pc)}
        </Text>
      </Pressable>
      <Picker style={styles.picker} itemStyle={styles.pickerItem}>
        <Picker.Item
          label={`₱oblado | $` + composeBalance(balances.posted?.pc)}
          value="poblado"
        />
        <Picker.Item
          label={`ComMonSys | $` + composeBalance(balances.posted?.coms)}
          value="commonsys"
        />
      </Picker>
    </>
  );
};

export default CoinPicker;

const styles = StyleSheet.create({
  picker: {
    width: 250,
  },
  pickerItem: {
    color: "black",
  },
  Box: {
    width: 215,
    height: 54,
  },
  Text: {
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
  amount: {
    fontSize: 36,
    lineHeight: 60,
    fontWeight: "700",
    color: "#34D399",
    alignItems: "center",
    right: 0,
  },
});
