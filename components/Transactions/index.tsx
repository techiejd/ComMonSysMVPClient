import React from "react";
import { View } from "react-native";
import SendForm from "./SendForm";
import CoinPicker from "./CoinPicker";
import QRInterface from "./QRInterface";
import TransactionsProvider from "../../providers/TransactionsProvider";

const Transactions = () => {
  return (
    <TransactionsProvider>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SendForm />
        <CoinPicker />
        <QRInterface />
      </View>
    </TransactionsProvider>
  );
};

export default Transactions;
