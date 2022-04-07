import React, { useContext } from "react";
import QRCode from "react-native-qrcode-svg";
import { BlockchainContext } from "../providers/BlockchainProvider";

const QR = () => {
  const { signer } = useContext(BlockchainContext);
  const url = `https://www.commonsys.tech/qr?type=eoa&address=${signer.address}`;

  return <QRCode value={url} size={200} />;
};

export default QR;
