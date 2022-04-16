import React, { useContext, FC } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import {
  TransactionsContext,
  ITransactionsContext,
} from "../../../providers/TransactionsProvider";

const SendVoteForm: FC<{
  campaignInfo: {
    address: string;
    option: string;
  };
}> = ({ campaignInfo }) => {
  const { send, setMode } = useContext(
    TransactionsContext
  ) as ITransactionsContext;

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
};

export default SendVoteForm;

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
