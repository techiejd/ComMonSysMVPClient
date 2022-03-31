import React from "react";
import { Text, StyleSheet, Pressable, TextInput } from "react-native";

export default function ErrorForm({ visible, setVisible }) {
  return (
    <>
      <Text>Error! Seems like you did not scan a ComMonSys QR.</Text>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setVisible(!visible)}
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
