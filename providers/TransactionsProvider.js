import React, { useContext, useState } from "react";
import "@ethersproject/shims";
import { ethers } from "ethers";
import ERC20ABI from "../constants/ERC20ABI";
import { CommunityCoinAddress, GasLimit } from "../constants/Contracts";
import { BlockchainContext } from "./BlockchainProvider";

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

const unprettify = (amount) => {
  return ethers.utils.parseEther(amount);
};

const TransactionsProvider = ({ children }) => {
  const { signer } = useContext(BlockchainContext);
  const communityCoinContract = new ethers.Contract(
    CommunityCoinAddress,
    ERC20ABI,
    signer
  );

  const [mode, setMode] = useState("unset");

  const [balances, setBalances] = useState({
    posted: { coms: null, pc: null },
    pending: { coms: null, pc: null },
  });

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
                coms: prettify(comsPostedBalance),
                pc: prettify(pcPostedBalance),
              },
            });
            setMode("loaded");
          });
      })
      .catch((error) => alert(error));
  };

  const send = ({ to, amount }) => {
    communityCoinContract
      .transfer(to, unprettify(amount), { gasLimit: GasLimit })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => alert(error));
  };

  return (
    <TransactionsContext.Provider
      value={{ mode, setMode, load, balances, send }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
export { TransactionsContext };
