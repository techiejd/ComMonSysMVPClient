import React from "react";
import { Text, StyleSheet, Pressable, TextInput } from "react-native";

export default function SendMoneyForm({ visible, setVisible, data }) {
  return (
    <>
      <Text>Sending</Text>
      <Text>0x8098098098</Text>
      <TextInput
        keyboardType="number-pad"
        style={{
          width: 200,
          height: 40,
          borderWidth: 1,
          borderColor: "black",
        }}
      />
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setVisible(!visible)}
      >
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
