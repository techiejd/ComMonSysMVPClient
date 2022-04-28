import React, { FC } from "react";
import { Transaction } from "../../../providers/TransactionsProvider";
import { Button, Modal } from "native-base";

const SendVoteForm: FC<{
  campaignInfo: {
    address: string;
    option: string;
  };
  modalContext: typeof Modal;
  closeForm: () => void;
  send: (transaction: Transaction) => void;
}> = ({ campaignInfo, modalContext, closeForm, send }) => {
  return (
    <>
      <modalContext.Header>Send your vote!</modalContext.Header>
      <Modal.Body>
        Your vote is important. Please confirm your vote for:
        {campaignInfo.address}
        Option: {campaignInfo.option}
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" onPress={closeForm}>
            Cancel
          </Button>
          <Button
            onPress={() => {
              send({
                type: "vote",
                to: campaignInfo.address,
                choice: campaignInfo.option,
              });
            }}
          >
            Send
          </Button>
        </Button.Group>
      </Modal.Footer>
    </>
  );
};

export default SendVoteForm;
