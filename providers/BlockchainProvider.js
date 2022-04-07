import React from "react";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { PRIVATEKEY } from "@env";
import ERC20ABI from "../constants/ERC20ABI";
import { CommunityCoinAddress, GasLimit } from "../constants/Contracts";

const BlockchainContext = React.createContext({
  signer: null,
});

const utils = ethers.utils;
const gasLimit = GasLimit;

const BlockchainProvider = ({ children }) => {
  const provider = new ethers.providers.JsonRpcProvider({
    url: "https://137.184.238.79/rpc", // ComMonSys MVP rpc
    timeout: 15000,
  });

  // TODO(techiejd): Create and save the users' address.
  const signer = new ethers.Wallet(PRIVATEKEY, provider);

  const communityCoinContract = new ethers.Contract(
    CommunityCoinAddress,
    ERC20ABI,
    signer
  );

  return (
    <BlockchainContext.Provider
      value={{ signer, communityCoinContract, utils, gasLimit }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
export { BlockchainContext };
