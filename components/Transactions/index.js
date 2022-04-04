import React, { useState, useEffect } from "react";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Camera } from "expo-camera";
import ERC20ABI from "../../constants/ERC20ABI";
import SendForm from "./SendForm";

const Transactions = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [sendFormVisible, setSendFormVisible] = useState(false);
  const [sendFormData, setSendFormData] = useState("");
  const [sendingMode, setSendingMode] = useState(true);
  const [comsBalance, setComsBalance] = useState(null);
  const [pcBalance, setPCBalance] = useState(null);

  // TODO(techiejd): Create and save the users' address.
  const userAddress = "0xCca2bd5957073026b56Cdaaeb282AD4a61619a3a"; // JD's public ComMonSys MVP Ethereum address
  // TODO(techijd): Maybe move this out of here and to the constants/ file.
  const communityCoinAddress = "0x9a1a38d91A0844E76A0e8262b0965c83536b7892";

  const provider = new ethers.providers.JsonRpcProvider({
    url: "https://137.184.238.79/rpc",
    timeout: 15000,
  });

  useEffect(() => {
    (async () => {
      provider
        .getBalance(userAddress)
        .then((balance) => setComsBalance(balance))
        .catch((error) => alert(error));

      communityCoinContract = new ethers.Contract(
        communityCoinAddress,
        ERC20ABI,
        provider
      );

      communityCoinContract.callStatic
        .balanceOf(userAddress)
        .then((balance) => setPCBalance(balance))
        .catch((error) => alert(error));
    })();
  }, []);

  const toggleSending = () => {
    setSendingMode(!sendingMode);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setSendFormData(data);
    setSendFormVisible(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const composeBalance = (balance) => {
    if (!sendingMode) {
      return "❓";
    }
    return balance == null
      ? "✋⏳"
      : ethers.utils.commify(Math.floor(ethers.utils.formatEther(balance)));
  };

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SendForm
        visible={sendFormVisible}
        setVisible={setSendFormVisible}
        data={sendFormData}
      />
      <Picker style={styles.picker} itemStyle={styles.pickerItem}>
        <Picker.Item
          label={`₱oblado | ` + composeBalance(pcBalance)}
          value="poblado"
        />
        <Picker.Item
          label={`ComMonSys | $` + composeBalance(comsBalance)}
          value="commonsys"
        />
      </Picker>
      <View style={styles.qrLike}>
        {sendingMode ? (
          <Camera
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.full}
            autoFocus={"on"}
          >
            <Pressable style={styles.full} onPress={toggleSending} />
          </Camera>
        ) : (
          <Pressable style={styles.full} onPress={toggleSending} a>
            <Image
              source={require("../../assets/qrCode.png")}
              style={styles.full}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  picker: {
    width: 250,
  },
  pickerItem: {
    color: "black",
  },
  qrLike: {
    width: 200,
    height: 200,
  },
  full: {
    width: "100%",
    height: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 200,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
