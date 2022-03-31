import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import SendMoneyForm from './SendMoneyForm'
import SendVoteForm from './SendVoteForm'
import ErrorForm from './ErrorForm'
import URL from 'url-parse'
import { ethers } from 'ethers'

const commonsysOrigin = 'https://www.commonsys.tech'
const commonsysQRPathName = '/qr'
const commonsysTypes = ['eoa', 'voting']

function isInvalid (data) {
  var url = new URL(data, true)
  return !(
    url.origin == commonsysOrigin &&
    url.pathname == commonsysQRPathName &&
    commonsysTypes.includes(url.query.type) &&
    ethers.utils.isAddress(url.query.address)
  )
}
function isVoting (data) {
  return false
}

export default function SendForm ({ visible, setVisible, data }) {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        setVisible(!visible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {isInvalid(data) ? (
            <ErrorForm />
          ) : isVoting(data) ? (
            <SendVoteForm />
          ) : (
            <SendMoneyForm />
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
  }
})
