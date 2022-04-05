import React from "react";
import "@ethersproject/shims";
import { ethers } from "ethers";

const BlockchainContext = React.createContext({
  userAddress: "",
  provider: null,
});

const BlockchainProvider = ({ children }) => {
  // TODO(techiejd): Create and save the users' address.
  const userAddress = "0xCca2bd5957073026b56Cdaaeb282AD4a61619a3a"; // JD's public ComMonSys MVP Ethereum address

  const provider = new ethers.providers.JsonRpcProvider({
    url: "https://137.184.238.79/rpc", // ComMonSys MVP rpc
    timeout: 15000,
  });

  return (
    <BlockchainContext.Provider value={{ userAddress, provider }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
export { BlockchainContext };
