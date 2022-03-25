import React, { useState, useEffect } from "react";
import { Image, Text, View, StyleSheet, Picker, Pressable } from "react-native";
import { Camera } from "expo-camera";

export default function Transactions() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [sending, setSending] = useState(true);

  const toggleSending = () => {
    setSending(!sending);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      <Picker style={styles.picker} itemStyle={styles.pickerItem}>
        <Picker.Item label="Poblado | $30K" value="poblado" />
        <Picker.Item label="ComMonSys | $33K" value="commonsys" />
      </Picker>
      <View style={styles.qrLike}>
        {sending ? (
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
              source={require("../assets/qrCode.png")}
              style={styles.full}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

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
});
