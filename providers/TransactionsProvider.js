import React, { useContext, useReducer, useState } from "react";
import "@ethersproject/shims";
import { ethers } from "ethers";
import ERC20ABI from "../../constants/ERC20ABI";
import { CommunityCoinAddress } from "../../constants/Contracts";
import { BlockchainContext } from "../BlockchainProvider";

const TransactionsContext = React.createContext();

// {
//   balances: {
//     posted: { coms: '1,000', pc: '1,000' }, // null if it hasn't loaded
//     pending: { coms: '-1,000', pc: '-1,000' }, // null if there's never a pending balance
//   },
//   mode: 'unset' || 'loading' || 'sending' || 'pending' || 'receiving',
//   modeDispatch: (action = {type: 'switch', data: {to: mode}}),
//   load: (),
//   send: ()
// }

const prettify = (balance) => {
  return ethers.utils.commify(Math.floor(ethers.utils.formatEther(balance)));
};

const TransactionsProvider = ({ children }) => {
  const { userAddress, provider } = useContext(BlockchainContext);
  const communityCoinContract = new ethers.Contract(
    CommunityCoinAddress,
    ERC20ABI,
    provider
  );

  const [mode, setMode] = useState("unset");

  const [balances, setBalances] = useState({
    posted: { coms: null, pc: null },
    pending: { coms: null, pc: null },
  });

  const load = () => {
    setMode("loading");
    provider
      .getBalance(userAddress)
      .then((comsPostedBalance) => {
        communityCoinContract.callStatic
          .balanceOf(userAddress)
          .then((pcPostedBalance) => {
            setBalances({
              ...balances,
              posted: { coms: comsPostedBalance, pc: pcPostedBalance },
            });
            setMode("loaded");
          });
      })
      .catch((error) => alert(error));
  };
  return (
    <TransactionsContext.Provider value={{ mode, setMode, load, balances }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
export { TransactionsContext };
