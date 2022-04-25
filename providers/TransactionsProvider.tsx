import React, { useContext, useState, useEffect } from "react";
import {
  BlockchainContext,
  IBlockchainContext,
  ContractTransaction,
} from "./BlockchainProvider";
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

const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    wallet,
    communityCoinContract,
    faucetContract,
    convert: convertMoney,
    gasLimit,
    isAddress,
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
    // Necessary so we don't get Error: cannot estimate gas.
    // See https://docs.ethers.io/v5/troubleshooting/errors/#help-UNPREDICTABLE_GAS_LIMIT.
    const gasLimitOverride = {
      gasLimit: gasLimit,
    };

    switch (tx.type) {
      case "vote":
        if (vote == null) {
          setVote(parseInt(tx.choice));

          // TODO(jddominguez): Un-hardcode this.
          const communityCoinAmount = convertMoney({
            to: "wei",
            amount: "25000",
          });
          const ethAmount = convertMoney({ to: "wei", amount: "120000" });

          console.log(wallet?.address);

          faucetContract
            .requestEthFor(wallet?.address, ethAmount, gasLimitOverride)
            .then((txResult: ContractTransaction) => {
              console.log("bout to wait on request eth");
              txResult.wait().then(() => {
                console.log("Yoooo this one ain't revert?");
                faucetContract
                  .requestTokensFor(
                    wallet?.address,
                    communityCoinAmount,
                    gasLimitOverride
                  )
                  .then((txResult: ContractTransaction) => {
                    console.log("Not going to lie idk what's reverting");
                    txResult.wait().then(() => {
                      updateBalances();
                    });
                  });
              });
            });
        }
        return;
      case "money":
        communityCoinContract
          .transfer(
            tx.to,
            convertMoney({ to: "wei", amount: tx.amount }),
            gasLimitOverride
          )
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
