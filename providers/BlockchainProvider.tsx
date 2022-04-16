import React, { useState, useEffect, FC } from "react";
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

interface IBlockchainContext {
  wallet: ethers.Wallet | undefined;
  communityCoinContract: ethers.Contract;
  convert: ({
    to,
    amount,
  }:
    | { to: "wei"; amount: string }
    | { to: "pretty_peso"; amount: ethers.BigNumberish }) =>
    | string
    | ethers.BigNumber;
  gasLimit: number;
  isAddress: (address: string) => boolean;
  onboard: () => Promise<{ wait: () => Promise<any> }>;
}

const BlockchainContext = React.createContext<IBlockchainContext | undefined>(
  undefined
);
const gasLimit = GasLimit;

const BlockchainProvider: FC = ({ children }) => {
  const [wallet, setWallet] = useState<ethers.Wallet | undefined>(undefined);
  const provider = new ethers.providers.JsonRpcProvider({
    url: "https://137.184.238.79/rpc", // ComMonSys MVP rpc
    timeout: 15000,
  });

  useEffect(() => {
    // TODO(techiejd): Create and save the users' address.
    setWallet(ethers.Wallet.createRandom().connect(provider));
  }, []);

  const communityCoinContract = new ethers.Contract(
    CommunityCoinAddress,
    ERC20ABI,
    wallet
  );

  const convert = ({
    to,
    amount,
  }:
    | { to: "wei"; amount: string }
    | { to: "pretty_peso"; amount: ethers.BigNumberish }) => {
    // This function exists for code cleanliness
    switch (to) {
      case "wei":
        return ethers.utils.parseEther(amount);
      case "pretty_peso":
        return ethers.utils.commify(
          Math.floor(parseInt(ethers.utils.formatEther(amount)))
        );
    }
  };

  // TODO(techijd): Get types from ethers. Avoid bugs.
  const onboard = (): Promise<{ wait: () => Promise<any> }> => {
    // Literally just need it cause Ethereum network doesn't accept transactions if the person can't pay for fees.
    const signerWithMoney = new ethers.Wallet(PRIVATEKEY, provider);
    const faucetContract = new ethers.Contract(
      FaucetAdress,
      FaucetABI,
      signerWithMoney
    );
    const communityCoinAmount = convert({
      to: "wei",
      amount: "25000",
    });
    const ethAmount = convert({ to: "wei", amount: "120000" });
    return faucetContract
      .requestEthFor(wallet?.address, ethAmount)
      .then((txResult: { wait: () => Promise<any> }) => {
        return txResult.wait().then(() => {
          return faucetContract.requestTokensFor(
            wallet?.address,
            communityCoinAmount
          );
        });
      });
  };

  return (
    <BlockchainContext.Provider
      value={{
        wallet,
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
export { BlockchainContext, IBlockchainContext };
