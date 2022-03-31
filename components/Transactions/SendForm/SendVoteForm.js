import React from "react";
import { Text, StyleSheet, Pressable, TextInput } from "react-native";

export default function SendVoteForm({ visible, setVisible, data }) {
  return (
    <>
      <Text>Confirm vote for</Text>
      <Text>Project title</Text>
      <Text>Project address:</Text>
      <Text>0x1561651561561</Text>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setVisible(!visible)}
      >
        <Text>Yes</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setVisible(!visible)}
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
