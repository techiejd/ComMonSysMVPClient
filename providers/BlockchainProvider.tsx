import React, { useState, useEffect } from "react";
// TODO(techiejd): Hack. Figure out what to do about these random values. Calling .random with this takes too long.
// import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers, ContractTransaction } from "ethers";
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
  faucetContract: ethers.Contract;
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
}

const BlockchainContext = React.createContext<IBlockchainContext | undefined>(
  undefined
);

const BlockchainProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wallet, setWallet] = useState<ethers.Wallet | undefined>(undefined);
  const provider = new ethers.providers.JsonRpcProvider({
    url: "https://137.184.238.79/rpc", // ComMonSys MVP rpc
    timeout: 15000,
  });
  // Literally just need it cause Ethereum network doesn't accept transactions if the person can't pay for fees.
  const signerWithMoney = new ethers.Wallet(PRIVATEKEY, provider);
  const faucetContract = new ethers.Contract(
    FaucetAdress,
    FaucetABI,
    signerWithMoney
  );

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

  return (
    <BlockchainContext.Provider
      value={{
        wallet,
        communityCoinContract,
        faucetContract,
        convert,
        gasLimit: GasLimit,
        isAddress: ethers.utils.isAddress,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
export { BlockchainContext, IBlockchainContext, ContractTransaction };
