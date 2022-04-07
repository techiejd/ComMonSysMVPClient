import React, { useState, useEffect, useContext } from "react";
import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Camera } from "expo-camera";
import SendForm from "./SendForm";
import { TransactionsContext } from "../../providers/TransactionsProvider";

const Transactions = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [sendFormVisible, setSendFormVisible] = useState(false);
  const [sendFormData, setSendFormData] = useState("");

  const { load, mode, setMode, balances } = useContext(TransactionsContext);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    load();
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
    if (mode == "receiving") {
      return "❓";
    }
    if (mode == "loading" || mode == "unset") {
      return "✋⏳";
    }
    return balance;
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
          label={`₱oblado | $` + composeBalance(balances.posted.pc)}
          value="poblado"
        />
        <Picker.Item
          label={`ComMonSys | $` + composeBalance(balances.posted.coms)}
          value="commonsys"
        />
      </Picker>
      <View style={styles.qrLike}>
        {mode == "sending" ? (
          <Camera
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.full}
            autoFocus={"on"}
          >
            <Pressable
              style={styles.full}
              onPress={() => {
                setMode("receiving");
              }}
            />
          </Camera>
        ) : (
          <Pressable
            style={styles.full}
            onPress={() => {
              setMode("sending");
            }}
            a
          >
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
