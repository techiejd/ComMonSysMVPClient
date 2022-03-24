import React, { useState, useEffect } from "react";
import { Image, Text, View, StyleSheet, Picker, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {Camera} from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
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
    <View style={styles.container}>
      {/* <Picker style={styles.picker} itemStyle={styles.pickerItem}>
              <Picker.Item label="Poblado | $30K" value="poblado" />
              <Picker.Item label="ComMonSys | $33K" value="commonsys" />
      </Picker> */}
      <Pressable
        style={{
          width: 200,
          height: 200,
          flex: 1,
          alignItems: "center",
        }}
        onPress={() => {
          setSending(!sending);
        }}
      >
        {sending ? (
            <View style={{width:260,height:250}}>
            <Camera onBarCodeScanned={handleBarCodeScanned} style={{flex:1}}/>
            </View>
      ) : (
        <Image
          source={require("./assets/qrCode.png")}
          style={{
            width: 200,
            height: 200,
          }}
        />
      )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  picker: {
    width: 250,
  },
  pickerItem: {
    color: "black",
  },
});