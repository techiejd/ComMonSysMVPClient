import React, { useContext } from "react";
import { Modal } from "native-base";
import SendMoneyForm from "./SendMoneyForm";
import SendVoteForm from "./SendVoteForm";
import ErrorForm from "./ErrorForm";
import {
  TransactionsContext,
  ITransactionsContext,
} from "../../../providers/TransactionsProvider";

export default function SendForm() {
  // TODO(techiejd): Look into useDisclose.
  const closeForm = () => setMode("inputtingQR");
  const { mode, setMode, sendFormData, send } = useContext(
    TransactionsContext
  ) as ITransactionsContext;
  const showSendOn = (data?: typeof sendFormData) => {
    if (mode == "inputtingSendForm") {
      switch (data?.type) {
        case "invalid":
          return <ErrorForm modalContext={Modal} closeForm={closeForm} />;
        case "send_vote":
          return (
            <SendVoteForm
              campaignInfo={data.campaignInfo}
              modalContext={Modal}
              closeForm={closeForm}
              send={send}
            />
          );
        case "send_money":
          return (
            <SendMoneyForm
              sendTo={data.sendTo}
              modalContext={Modal}
              closeForm={closeForm}
              send={send}
            />
          );
      }
    }
  };

  // TODO(jddominguez): Get it to look like from figma.

  return (
    <Modal
      isOpen={mode === "inputtingSendForm"}
      onClose={() => {
        setMode("inputtingQR");
      }}
    >
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        {showSendOn(sendFormData)}
      </Modal.Content>
    </Modal>
  );
}
