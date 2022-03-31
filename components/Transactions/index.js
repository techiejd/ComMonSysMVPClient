import React, { useState, useEffect } from 'react'
import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  TextInput
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Camera } from 'expo-camera'
import SendForm from './SendForm'

export default function Transactions () {
  const [hasPermission, setHasPermission] = useState(null)
  const [sendFormVisible, setSendFormVisible] = useState(false)
  const [sendingMode, setSendingMode] = useState(true)

  const toggleSending = () => {
    setSendingMode(!sendingMode)
  }

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    // TODO(jddominguez): Use type and data for something.
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`)
    setSendFormVisible(true)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <SendForm visible={sendFormVisible} setVisible={setSendFormVisible} />
      <Picker style={styles.picker} itemStyle={styles.pickerItem}>
        <Picker.Item label='Poblado | $30K' value='poblado' />
        <Picker.Item label='ComMonSys | $33K' value='commonsys' />
      </Picker>
      <View style={styles.qrLike}>
        {sendingMode ? (
          <Camera
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.full}
            autoFocus={'on'}
          >
            <Pressable style={styles.full} onPress={toggleSending} />
          </Camera>
        ) : (
          <Pressable style={styles.full} onPress={toggleSending} a>
            <Image
              source={require('../../assets/qrCode.png')}
              style={styles.full}
            />
          </Pressable>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  picker: {
    width: 250
  },
  pickerItem: {
    color: 'black'
  },
  qrLike: {
    width: 200,
    height: 200
  },
  full: {
    width: '100%',
    height: '100%'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 200,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  }
})
