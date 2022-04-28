import React, { useState } from "react";
import { Transaction } from "../../../providers/TransactionsProvider";
import { Button, Modal, Input } from "native-base";

// Make an Address type.
const SendMoneyForm: React.FC<{
  sendTo: string;
  send: (transaction: Transaction) => void;
  modalContext: typeof Modal;
  closeForm: () => void;
}> = ({ sendTo, send, modalContext, closeForm }) => {
  const [amount, setAmount] = useState("");
  const submit = () => {
    send({ type: "money", to: sendTo, amount: amount });
  };
  return (
    <>
      <modalContext.Header>Sending money</modalContext.Header>
      <Modal.Body>
        To: {sendTo}
        <Input
          keyboardType="number-pad"
          onChangeText={(inputAmount) =>
            setAmount(inputAmount.replace(/\D/g, ""))
          }
          onSubmitEditing={submit}
          autoFocus={true}
          value={amount}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" onPress={closeForm}>
            Cancel
          </Button>
          <Button onPress={submit}>Send</Button>
        </Button.Group>
      </Modal.Footer>
    </>
  );
};

export default SendMoneyForm;
