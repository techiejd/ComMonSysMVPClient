import React, { useContext, useState, useEffect } from "react";
import { BlockchainContext } from "./BlockchainProvider";
import { VoteStoreContext } from "./VoteStoreProvider";
import URL from "url-parse";

const TransactionsContext = React.createContext();

// {
//   balances: {
//     posted: { coms: '1,000', pc: '1,000' }, // null if it hasn't loaded
//     pending: { coms: '-1,000', pc: '-1,000' }, // null if there's never a pending balance
//   },
//   mode: 'loading' || 'inputtingQR' || 'pending' || 'displayingQR' || 'inputtingSendForm',
//   setMode: (newMode),
//   send: ()
// }

const TransactionsProvider = ({ children }) => {
  const {
    signer,
    communityCoinContract,
    convert: convertMoney,
    gasLimit,
    isAddress,
    onboard,
  } = useContext(BlockchainContext);
  const { vote, setVote } = useContext(VoteStoreContext);

  const [sendFormData, setSendFormData] = useState("");

  const [mode, setMode] = useState("loading");
  useEffect(() => {
    if (mode == "pending") setMode((mode) => "inputtingQR");
  }, [mode]);

  const [userQRValue, setUserQRValue] = useState("");

  const [balances, setBalances] = useState({
    posted: { coms: null, pc: null },
    pending: { coms: null, pc: null },
  });

  const updateBalances = () => {
    return signer
      .getBalance()
      .then((comsPostedBalance) => {
        return communityCoinContract.callStatic
          .balanceOf(signer.address)
          .then((pcPostedBalance) => {
            setBalances({
              ...balances,
              posted: {
                coms: convertMoney({
                  to: "peso",
                  from: "wei",
                  amount: comsPostedBalance,
                }),
                pc: convertMoney({
                  to: "peso",
                  from: "wei",
                  amount: pcPostedBalance,
                }),
              },
            });
          });
      })
      .catch((error) => alert(error));
  };

  const send = ({ type, to, amount, choice }) => {
    switch (type) {
      case "vote":
        if (vote == null) {
          setVote(choice);
          onboard().then((txResult) => {
            txResult.wait().then((result) => {
              updateBalances();
            });
          });
        }
        return;
      case "money":
        communityCoinContract
          .transfer(
            to,
            convertMoney({ to: "wei", from: "peso", amount: amount }),
            {
              gasLimit: gasLimit,
            }
          )
          .then((txResult) => {
            txResult.wait().then((result) => {
              updateBalances();
            });
          })
          .catch((error) => alert(error));
        return;
    }
  };

  const transformQRDataToCommonsysData = (qrData) => {
    const commonsysOrigin = "https://www.commonsys.tech";
    const commonsysQRPathName = "/qr";
    const commonsysTypes = ["eoa", "campaign"];

    function transform(data) {
      var url = new URL(data, true);

      const isInvalid = !(
        url.origin == commonsysOrigin &&
        url.pathname == commonsysQRPathName &&
        commonsysTypes.includes(url.query.type) &&
        isAddress(url.query.address)
      );

      const commonsysData = {};
      commonsysData.type = isInvalid
        ? "invalid"
        : url.query.type == "campaign"
        ? "send_vote"
        : "send_money";
      switch (commonsysData.type) {
        case "send_vote":
          commonsysData.campaignInfo = {
            address: url.query.address,
            option: url.query.option,
          };
          break;
        case "send_money":
          commonsysData.sendTo = url.query.address;
      }
      return commonsysData;
    }
    return transform(qrData);
  };

  useEffect(() => {
    const load = () => {
      setUserQRValue(
        `https://www.commonsys.tech/qr?type=eoa&address=${signer.address}`
      );
      updateBalances().then(() => setMode("inputtingQR"));
    };
    if (signer != null) load();
  }, [signer]);

  return (
    <TransactionsContext.Provider
      value={{
        mode,
        setMode,
        balances,
        send,
        transformQRDataToCommonsysData,
        userQRValue,
        sendFormData,
        setSendFormData,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
export { TransactionsContext };
