import React from "react";
import { StyleSheet } from "react-native";
import { Button, Modal } from "native-base";

const ErrorForm: React.FC<{
  modalContext: typeof Modal;
  closeForm: () => void;
}> = ({ modalContext, closeForm }) => {
  return (
    <>
      <modalContext.Header>Contact Us</modalContext.Header>
      <modalContext.Body>
        Error! Seems like you did not scan a ComMonSys QR.
      </modalContext.Body>
      <modalContext.Footer>
        <Button.Group space={1}>
          <Button onPress={closeForm}>Ok</Button>
        </Button.Group>
      </modalContext.Footer>
    </>
  );
};

export default ErrorForm;

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
