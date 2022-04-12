import React from "react";
import { View } from "react-native";
import SendForm from "./SendForm";
import CoinPicker from "./CoinPicker";
import QRInterface from "./QRInterface";

const Transactions = () => {
  return (
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
  );
};

export default Transactions;
