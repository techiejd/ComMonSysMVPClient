import React, { useContext } from "react";
import { Text, StyleSheet, Pressable, TextInput } from "react-native";
import { TransactionsContext } from "../../../providers/TransactionsProvider";

export default function SendVoteForm({ campaignInfo }) {
  const { send, setMode } = useContext(TransactionsContext);

  return (
    <>
      <Text>Confirm vote for</Text>
      <Text>Campaign address:</Text>
      <Text>{campaignInfo.address}</Text>
      <Text>Option: {campaignInfo.option}</Text>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          send({
            type: "vote",
            to: campaignInfo.address,
            choice: campaignInfo.option,
          });
          setMode("pending");
        }}
      >
        <Text>Yes</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setMode("inputtingQR")}
      >
        <Text>Cancel?</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
