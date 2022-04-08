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
//   mode: 'unset' || 'loading' || 'inputtingQR' || 'pending' || 'displayingQR' || 'inputtingSendForm',
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
  } = useContext(BlockchainContext);
  const { setVote } = useContext(VoteStoreContext);

  const [mode, setMode] = useState("unset");
  useEffect(() => {
    if (mode == "pending") setMode((mode) => "inputtingQR");
  }, [mode]);

  const [balances, setBalances] = useState({
    posted: { coms: null, pc: null },
    pending: { coms: null, pc: null },
  });

  const send = ({ type, to, amount, choice }) => {
    switch (type) {
      case "vote":
        setVote(choice);
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
          .then((result) => {
            // TODO(techiejd): do something with this result!
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

  const userQRValue = `https://www.commonsys.tech/qr?type=eoa&address=${signer.address}`;

  useEffect(() => {
    const load = () => {
      setMode("loading");
      signer
        .getBalance()
        .then((comsPostedBalance) => {
          communityCoinContract.callStatic
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
              setMode("inputtingQR");
            });
        })
        .catch((error) => alert(error));
    };
    load();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        mode,
        setMode,
        balances,
        send,
        transformQRDataToCommonsysData,
        userQRValue,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
export { TransactionsContext };
