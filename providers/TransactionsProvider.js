import React, { useContext, useState, useEffect } from "react";
import { BlockchainContext } from "./BlockchainProvider";
import { VoteStoreContext } from "./VoteStoreProvider";

const TransactionsContext = React.createContext();

// {
//   balances: {
//     posted: { coms: '1,000', pc: '1,000' }, // null if it hasn't loaded
//     pending: { coms: '-1,000', pc: '-1,000' }, // null if there's never a pending balance
//   },
//   mode: 'unset' || 'loading' || 'sending' || 'pending' || 'receiving',
//   modeDispatch: (action = {type: 'switch', data: {to: mode}}),
//   send: ()
// }

const TransactionsProvider = ({ children }) => {
  const { signer, communityCoinContract, convert, gasLimit } =
    useContext(BlockchainContext);
  const { setVote } = useContext(VoteStoreContext);

  const [mode, setMode] = useState("unset");

  const [balances, setBalances] = useState({
    posted: { coms: null, pc: null },
    pending: { coms: null, pc: null },
  });

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
                  coms: convert({
                    to: "peso",
                    from: "wei",
                    amount: comsPostedBalance,
                  }),
                  pc: convert({
                    to: "peso",
                    from: "wei",
                    amount: pcPostedBalance,
                  }),
                },
              });
              setMode("sending");
            });
        })
        .catch((error) => alert(error));
    };
    load();
  }, []);

  const send = ({ type, to, amount, choice }) => {
    switch (type) {
      case "vote":
        setVote(choice);
        return;
      case "money":
        communityCoinContract
          .transfer(to, convert({ to: "wei", from: "peso", amount: amount }), {
            gasLimit: gasLimit,
          })
          .then((result) => {
            console.log("send_money result: ", result);
          })
          .catch((error) => alert(error));
        return;
    }
  };

  return (
    <TransactionsContext.Provider value={{ mode, setMode, balances, send }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
export { TransactionsContext };
