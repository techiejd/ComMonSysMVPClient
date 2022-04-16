import React, { useContext } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import {
  TransactionsContext,
  ITransactionsContext,
} from "../../../providers/TransactionsProvider";

export default function ErrorForm() {
  const { setMode } = useContext(TransactionsContext) as ITransactionsContext;
  return (
    <>
      <Text>Error! Seems like you did not scan a ComMonSys QR.</Text>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setMode("inputtingQR")}
      >
        <Text>OK</Text>
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
