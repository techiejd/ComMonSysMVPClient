import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Modal } from "react-native";
import SendMoneyForm from "./SendMoneyForm";
import SendVoteForm from "./SendVoteForm";
import ErrorForm from "./ErrorForm";
import { TransactionsContext } from "../../../providers/TransactionsProvider";

export default function SendForm({ data }) {
  const { mode, setMode } = useContext(TransactionsContext);
  const showSendOn = (data) => {
    switch (data.type) {
      case "invalid":
        return <ErrorForm />;
      case "send_vote":
        return <SendVoteForm campaignInfo={data.campaignInfo} />;
      case "send_money":
        return <SendMoneyForm sendTo={data.sendTo} />;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={mode == "inputtingSendForm"}
      onRequestClose={() => {
        setMode("inputtingQR");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{showSendOn(data)}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 200,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
