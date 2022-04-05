import React, { useState, useEffect } from "react";
import "@ethersproject/shims";
import { ethers } from "ethers";
import ERC20ABI from "../../constants/ERC20ABI";

// TODO(techiejd): Create and save the users' address.
const userAddress = "0xCca2bd5957073026b56Cdaaeb282AD4a61619a3a"; // JD's public ComMonSys MVP Ethereum address
// TODO(techijd): Maybe move this out of here and to the constants/ file.
const communityCoinAddress = "0x9a1a38d91A0844E76A0e8262b0965c83536b7892";

// Returns balance as string as 'x,xxx'
const useBalance = (coin /** coms || pc */) => {
  const [balance, setBalance] = useState(null);
  const provider = new ethers.providers.JsonRpcProvider({
    url: "https://137.184.238.79/rpc",
    timeout: 15000,
  });
  const prettify = (balance) => {
    return ethers.utils.commify(Math.floor(ethers.utils.formatEther(balance)));
  };
  useEffect(() => {
    (async () => {
      switch (coin) {
        case "coms":
          provider
            .getBalance(userAddress)
            .then((balance) => setBalance(prettify(balance)))
            .catch((error) => alert(error));
        case "pc":
          communityCoinContract = new ethers.Contract(
            communityCoinAddress,
            ERC20ABI,
            provider
          );
          communityCoinContract.callStatic
            .balanceOf(userAddress)
            .then((balance) => setBalance(prettify(balance)))
            .catch((error) => alert(error));
      }
    })();
  }, []);

  return balance;
};

export { useBalance };
