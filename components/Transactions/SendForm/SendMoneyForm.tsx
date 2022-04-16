import React, { useState, useContext, FC } from "react";
import { Text, StyleSheet, Pressable, TextInput } from "react-native";
import {
  TransactionsContext,
  ITransactionsContext,
} from "../../../providers/TransactionsProvider";

// Make an Address type.
const SendMoneyForm: FC<{ sendTo: string }> = ({ sendTo }) => {
  const [amount, setAmount] = useState("");
  const { send, setMode } = useContext(
    TransactionsContext
  ) as ITransactionsContext;
  const submit = () => {
    send({ type: "money", to: sendTo, amount: amount });
    setMode("pending");
  };
  return (
    <>
      <Text>Sending</Text>
      <Text>{sendTo}</Text>
      <TextInput
        keyboardType="number-pad"
        onChangeText={(inputAmount) =>
          setAmount(inputAmount.replace(/\D/g, ""))
        }
        onSubmitEditing={submit}
        value={amount}
        style={{
          width: 200,
          height: 40,
          borderWidth: 1,
          borderColor: "black",
        }}
      />
      <Pressable style={[styles.button, styles.buttonClose]} onPress={submit}>
        <Text>Hide Modal</Text>
      </Pressable>
    </>
  );
};

export default SendMoneyForm;

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
