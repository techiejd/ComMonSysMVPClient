import React, { useState, useContext } from "react";
import { Text, StyleSheet, Pressable, TextInput } from "react-native";
import { TransactionsContext } from "../../../providers/TransactionsProvider";

export default function SendMoneyForm({ visible, setVisible, sendTo }) {
  const [amount, setAmount] = useState("");
  const { send } = useContext(TransactionsContext);
  const submit = () => {
    send({ type: "money", to: sendTo, amount: amount });
    setVisible(!visible);
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
        <Text style={styles.textStyle}>Hide Modal</Text>
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
