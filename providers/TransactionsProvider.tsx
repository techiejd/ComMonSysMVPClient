import React, { useContext, useState, useEffect, FC } from "react";
import { BlockchainContext, IBlockchainContext } from "./BlockchainProvider";
import { VoteStoreContext, IVoteStoreContext } from "./VoteStoreProvider";
import URL from "url-parse";

type MoneyTransaction = {
  type: "money";
  to: string;
  amount: string;
};
type VoteTransaction = {
  type: "vote";
  to: string;
  choice: string;
};
type Transaction = MoneyTransaction | VoteTransaction;

type SendFormInvalidData = {
  type: "invalid";
};
type SendVoteFormData = {
  type: "send_vote";
  campaignInfo: {
    address: string;
    option: string;
  };
};
type SendMoneyFormData = {
  type: "send_money";
  sendTo: string;
};

type SendFormData = SendFormInvalidData | SendVoteFormData | SendMoneyFormData;

type Mode =
  | "loading"
  | "inputtingQR"
  | "pending"
  | "displayingQR"
  | "inputtingSendForm";

interface ITransactionsContext {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  balances: {
    posted?: { coms: string; pc: string };
    pending?: { coms: string; pc: string };
  };
  send: (transaction: Transaction) => void;
  userQRValue: string;
  sendFormData: SendFormData | undefined;
  process: (qrData: string) => void;
}

const TransactionsContext = React.createContext<
  ITransactionsContext | undefined
>(undefined);

const TransactionsProvider: FC = ({ children }) => {
  const {
    wallet,
    communityCoinContract,
    convert: convertMoney,
    gasLimit,
    isAddress,
    onboard,
  } = useContext(BlockchainContext) as IBlockchainContext;
  const { vote, setVote } = useContext(VoteStoreContext) as IVoteStoreContext;

  const [sendFormData, setSendFormData] = useState<SendFormData | undefined>(
    undefined
  );

  const [mode, setMode] = useState("loading" as Mode);
  useEffect(() => {
    if (mode == "pending") setMode((prevMode) => "inputtingQR");
  }, [mode]);

  const [userQRValue, setUserQRValue] = useState("");

  const [balances, setBalances] = useState({});

  const updateBalances = () => {
    return wallet
      ?.getBalance()
      .then((comsPostedBalance) => {
        return communityCoinContract.callStatic
          .balanceOf(wallet.address)
          .then((pcPostedBalance) => {
            setBalances({
              ...balances,
              posted: {
                coms: convertMoney({
                  to: "pretty_peso",
                  amount: comsPostedBalance,
                }),
                pc: convertMoney({
                  to: "pretty_peso",
                  amount: pcPostedBalance,
                }),
              },
            });
          });
      })
      .catch((error) => alert(error));
  };

  // { type, to, amount, choice }
  const send = (tx: Transaction) => {
    switch (tx.type) {
      case "vote":
        if (vote == null) {
          setVote(parseInt(tx.choice));
          onboard().then((txResult) => {
            txResult.wait().then((result) => {
              updateBalances();
            });
          });
        }
        return;
      case "money":
        communityCoinContract
          .transfer(tx.to, convertMoney({ to: "wei", amount: tx.amount }), {
            gasLimit: gasLimit,
          })
          .then((txResult: { wait: () => Promise<any> }) => {
            txResult.wait().then((result) => {
              updateBalances();
            });
          })
          .catch((error: any) => alert(error));
        return;
    }
  };

  function transform(qrData: string): SendFormData {
    const commonsysOrigin = "https://www.commonsys.tech";
    const commonsysQRPathName = "/qr";
    const commonsysTypes = ["eoa", "campaign"];

    var url = new URL(qrData, true);

    const isInvalid = !(
      url.origin == commonsysOrigin &&
      url.pathname == commonsysQRPathName &&
      commonsysTypes.includes(url.query.type as string) &&
      isAddress(url.query.address as string)
    );

    if (isInvalid)
      return {
        type: "invalid",
      };

    if (url.query.type == "campaign")
      return {
        type: "send_vote",
        campaignInfo: {
          address: url.query.address as string,
          option: url.query.option as string,
        },
      };

    return {
      type: "send_money",
      sendTo: url.query.address as string,
    };
  }

  const process = (qrData: string) => {
    setSendFormData(transform(qrData));
    setMode("inputtingSendForm");
  };

  useEffect(() => {
    const load = () => {
      setUserQRValue(
        `https://www.commonsys.tech/qr?type=eoa&address=${wallet?.address}`
      );
      updateBalances()?.then(() => setMode("inputtingQR"));
    };
    if (wallet != null) load();
  }, [wallet]);

  return (
    <TransactionsContext.Provider
      value={{
        mode,
        setMode,
        balances,
        send,
        userQRValue,
        sendFormData,
        process,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
export { TransactionsContext, ITransactionsContext };
