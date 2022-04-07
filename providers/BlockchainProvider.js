import React from "react";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { PRIVATEKEY } from "@env";

const BlockchainContext = React.createContext({
  signer: null,
});

const BlockchainProvider = ({ children }) => {
  const provider = new ethers.providers.JsonRpcProvider({
    url: "https://137.184.238.79/rpc", // ComMonSys MVP rpc
    timeout: 15000,
  });

  // TODO(techiejd): Create and save the users' address.
  const signer = new ethers.Wallet(PRIVATEKEY, provider);

  return (
    <BlockchainContext.Provider value={{ signer }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
export { BlockchainContext };
