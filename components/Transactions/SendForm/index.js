import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal } from "react-native";
import SendMoneyForm from "./SendMoneyForm";
import SendVoteForm from "./SendVoteForm";
import ErrorForm from "./ErrorForm";
import URL from "url-parse";
import { ethers } from "ethers";

const commonsysOrigin = "https://www.commonsys.tech";
const commonsysQRPathName = "/qr";
const commonsysTypes = ["eoa", "voting"];

function transform(data) {
  function isVoting(data) {
    return false;
  }

  var url = new URL(data, true);
  const isInvalid = !(
    url.origin == commonsysOrigin &&
    url.pathname == commonsysQRPathName &&
    commonsysTypes.includes(url.query.type) &&
    ethers.utils.isAddress(url.query.address)
  );
  const commonsysData = {};
  commonsysData.type = isInvalid
    ? "invalid"
    : isVoting(data)
    ? "send_vote"
    : "send_money";
  switch (commonsysData.type) {
    case "send_vote":
      // TODO: Add voting logic here.
      break;
    case "send_money":
      commonsysData.sendTo = url.query.address;
  }
  return commonsysData;
}

export default function SendForm({ visible, setVisible, data }) {
  const commonsysData = transform(data);
  const showSendOn = (commonsysData) => {
    switch (commonsysData.type) {
      case "invalid":
        return <ErrorForm />;
      case "send_vote":
        return <SendVoteForm />;
      case "send_money":
        return (
          <SendMoneyForm
            visible={visible}
            setVisible={setVisible}
            sendTo={commonsysData.sendTo}
          />
        );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setVisible(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{showSendOn(commonsysData)}</View>
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
