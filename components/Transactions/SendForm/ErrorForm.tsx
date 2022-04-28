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
        <Button onPress={closeForm}>Ok</Button>
      </modalContext.Footer>
    </>
  );
};

export default ErrorForm;
