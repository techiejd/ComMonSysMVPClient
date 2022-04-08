import React, { useState, useEffect } from "react";
// TODO(techiejd): Hack. Figure out what to do about these random values. Calling .random with this takes too long.
// import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { PRIVATEKEY } from "@env";
import ERC20ABI from "../constants/ERC20ABI";
import FaucetABI from "../constants/FaucetABI";
import {
  CommunityCoinAddress,
  FaucetAdress,
  GasLimit,
} from "../constants/Contracts";

const BlockchainContext = React.createContext();
const gasLimit = GasLimit;

const BlockchainProvider = ({ children }) => {
  const [signer, setSigner] = useState(null);
  const provider = new ethers.providers.JsonRpcProvider({
    url: "https://137.184.238.79/rpc", // ComMonSys MVP rpc
    timeout: 15000,
  });

  useEffect(() => {
    // TODO(techiejd): Create and save the users' address.
    setSigner(ethers.Wallet.createRandom().connect(provider));
  }, []);

  const communityCoinContract = new ethers.Contract(
    CommunityCoinAddress,
    ERC20ABI,
    signer
  );

  const convert = ({ to, from, amount }) => {
    // This function exists for code cleanliness
    switch (to) {
      case "wei":
        return ethers.utils.parseEther(amount);
      case "peso":
        return ethers.utils.commify(
          Math.floor(ethers.utils.formatEther(amount))
        );
    }
  };

  const onboard = () => {
    // Literally just need it cause Ethereum network doesn't accept transactions if the person can't pay for fees.
    signerWithMoney = new ethers.Wallet(PRIVATEKEY, provider);
    const faucetContract = new ethers.Contract(
      FaucetAdress,
      FaucetABI,
      signerWithMoney
    );
    communityCoinAmount = convert({
      to: "wei",
      frrom: "peso",
      amount: "25000",
    });
    ethAmount = convert({ to: "wei", from: "peso", amount: "120000" });
    return faucetContract
      .requestEthFor(signer.address, ethAmount)
      .then((txResult) => {
        return txResult.wait().then(() => {
          return faucetContract.requestTokensFor(
            signer.address,
            communityCoinAmount
          );
        });
      });
  };

  return (
    <BlockchainContext.Provider
      value={{
        signer,
        communityCoinContract,
        convert,
        gasLimit,
        isAddress: ethers.utils.isAddress,
        onboard,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
export { BlockchainContext };
